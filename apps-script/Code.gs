/**
 * Gym Log ↔ Google Sheets.
 *
 * Вставте цей файл у свою таблицю: Розширення → Apps Script.
 * Замініть TOKEN на власний довгий ключ і опублікуйте як веб-застосунок
 * (Deploy → New deployment → Web app, Execute as: Me, Who has access: Anyone).
 * Той самий ключ вставте в апку (⚙ → «Ключ із скрипта»).
 *
 * @OnlyCurrentDoc  скрипт отримує доступ лише до цієї таблиці, а не до всіх ваших файлів
 */
const TOKEN = 'ЗАМІНІТЬ-НА-СВІЙ-КЛЮЧ';
const SHEET_NAME = 'Sheet1';     // журнал: вправи в рядках, тренування в стовпцях
const PROGRAM_NAME = 'Програма'; // вправи: назва в журналі, назва в апці, тип, дні, підходи, повтори, вага, примітка, ID, медіа
const DAYS_NAME = 'Дні';         // дні (порядок рядків = порядок в апці): №, назва, опис, колір, іконка

/** Відкрийте адресу веб-застосунку в браузері: має з’явитися {"ok":true,...}. */
function doGet() {
  return json({ ok: true, app: 'gym-log' });
}

function doPost(e) {
  let req;
  try {
    req = JSON.parse(e.postData.contents);
  } catch (err) {
    return json({ ok: false, error: 'bad_json' });
  }
  if (!TOKEN || TOKEN.indexOf('ЗАМІНІТЬ') === 0 || req.token !== TOKEN) {
    return json({ ok: false, error: 'bad_token' });
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAME);
    if (!sh) return json({ ok: false, error: 'no_sheet', message: 'Немає аркуша «' + SHEET_NAME + '»' });

    switch (req.action) {
      case 'ping':
        return json({ ok: true, title: ss.getName() });
      case 'read': {
        // Значення так, як їх видно в таблиці, і колір заливки кожної клітинки
        const r = sh.getDataRange();
        return json({ ok: true, values: r.getDisplayValues(), colors: r.getBackgrounds() });
      }
      case 'write':
        return json(write(sh, req));
      case 'program':
        return json(readProgram(ss));
      case 'initProgram':
        return json(initProgram(ss, req));
      case 'addExercise':
        return json(addExercise(ss, req));
      default:
        return json({ ok: false, error: 'bad_action' });
    }
  } catch (err) {
    return json({ ok: false, error: 'script', message: String((err && err.message) || err) });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Записує одне тренування в один стовпець.
 * req: { date: '01.11.2026', iso: '2026-11-01', col: number|null, fixedCol: bool,
 *        taken: number[], color: '#ff9900', items: [{ row, name, text, done }] }
 * Стовпець: той, у який це тренування вже писало; або останній, якщо в ньому та сама дата;
 * інакше новий стовпець праворуч.
 */
function write(sh, req) {
  const lastCol = Math.max(sh.getLastColumn(), 1);
  const header = sh.getRange(1, 1, 1, lastCol).getDisplayValues()[0];
  const taken = req.taken || [];
  let col = null;
  let reused = false;

  if (req.col) {
    const h = header[req.col - 1];
    const empty = h === undefined || h === '';
    if (req.fixedCol || empty || sameDate(h, req.iso)) {
      col = req.col;
      reused = !empty;
    }
  }
  if (!col && lastCol > 1 && sameDate(header[lastCol - 1], req.iso) && taken.indexOf(lastCol) < 0) {
    col = lastCol;
    reused = true;
  }
  if (!col) col = lastCol + 1;
  if (!reused) sh.getRange(1, col).setNumberFormat('@').setValue(req.date);

  // Назви вправ у колонці A: для нових вправ шукаємо рядок за назвою або додаємо внизу
  const lastRow = Math.max(sh.getLastRow(), 1);
  const names = sh.getRange(1, 1, lastRow, 1).getDisplayValues().map(r => norm(r[0]));
  let lastNamed = 0;
  names.forEach((n, i) => { if (n) lastNamed = i + 1; });

  const rows = [];
  (req.items || []).forEach(it => {
    let row = it.row;
    if (!row) {
      const i = names.indexOf(norm(it.name));
      if (i >= 0) {
        row = i + 1;
      } else {
        row = ++lastNamed;
        sh.getRange(row, 1).setValue(it.name);
        names[row - 1] = norm(it.name);
      }
      rows.push({ name: it.name, row: row });
    }
    const cell = sh.getRange(row, col);
    cell.setValue(it.text);
    cell.setBackground(it.done ? (req.color || '#cccccc') : '#ffffff');
  });

  return { ok: true, col: col, reused: reused, rows: rows };
}

/** Читає вкладки «Програма» і «Дні». Рядкам без ID дає ID, щоб записи в апці не губилися. */
function readProgram(ss) {
  const p = ss.getSheetByName(PROGRAM_NAME);
  const d = ss.getSheetByName(DAYS_NAME);
  if (!p || !d) return { ok: true, missing: true };

  const pv = p.getDataRange().getDisplayValues();
  const ex = [];
  const head = pv[0] || [];
  let idCol = head.map(norm).indexOf('id');
  if (idCol < 0) idCol = 8;
  for (let i = 1; i < pv.length; i++) {
    const r = pv[i].slice();
    while (r.length < Math.max(head.length, idCol + 1)) r.push('');
    if (!String(r[0]).trim() && !String(r[1]).trim()) continue;
    if (!String(r[idCol]).trim()) {
      r[idCol] = 'x' + Utilities.getUuid().replace(/-/g, '').slice(0, 10);
      p.getRange(i + 1, idCol + 1).setValue(r[idCol]);
    }
    ex.push(r);
  }

  const dr = d.getDataRange();
  const dv = dr.getDisplayValues();
  const bg = dr.getBackgrounds();
  const dHead = dv[0] || [];
  const colorCol = dHead.map(norm).indexOf('колір');
  const days = [];
  for (let i = 1; i < dv.length; i++) {
    const r = dv[i].slice();
    if (!String(r[0]).trim()) continue;
    // колір: hex у клітинці або заливка цієї клітинки
    if (colorCol >= 0 && !/^#?[0-9a-f]{6}$/i.test(String(r[colorCol] || '').trim())) r[colorCol] = (bg[i] && bg[i][colorCol]) || '';
    days.push(r);
  }
  return { ok: true, daysHead: dHead, days: days, progHead: pv[0] || [], ex: ex };
}

/** Створює вкладки «Програма» і «Дні» зі стартової програми апки (лише якщо їх ще немає). */
function initProgram(ss, req) {
  if (!ss.getSheetByName(DAYS_NAME)) {
    const d = ss.insertSheet(DAYS_NAME);
    const rows = [req.daysHead].concat(req.days || []);
    const w = rows[0].length;
    d.getRange(1, 1, rows.length, w).setNumberFormat('@').setValues(rows);
    d.getRange(1, 1, 1, w).setFontWeight('bold');
    d.setFrozenRows(1);
    (req.days || []).forEach((r, i) => { if (/^#?[0-9a-f]{6}$/i.test(r[3])) d.getRange(i + 2, 4).setBackground(r[3]); });
    d.autoResizeColumns(1, w);
  }
  if (!ss.getSheetByName(PROGRAM_NAME)) {
    const p = ss.insertSheet(PROGRAM_NAME);
    const rows = [req.progHead].concat(req.ex || []);
    p.getRange(1, 1, rows.length, 9).setNumberFormat('@').setValues(rows);
    p.getRange(1, 1, 1, 9).setFontWeight('bold');
    p.setFrozenRows(1);
    p.autoResizeColumns(1, 9);
  }
  return { ok: true };
}

/** Нова вправа з апки: рядок у «Програму». Рядок у журналі з’явиться під час першого запису тренування. */
function addExercise(ss, req) {
  const p = ss.getSheetByName(PROGRAM_NAME);
  if (!p) return { ok: false, error: 'no_program', message: 'Немає вкладки «' + PROGRAM_NAME + '»' };
  const row = (req.row || []).slice(0, 9);
  if (!row[0] && !row[1]) return { ok: false, error: 'bad_row' };
  const ids = p.getRange(1, 9, Math.max(p.getLastRow(), 1), 1).getDisplayValues().map(r => r[0]);
  if (row[8] && ids.indexOf(row[8]) >= 0) return { ok: true, existed: true };
  const at = p.getLastRow() + 1;
  p.getRange(at, 1, 1, 9).setNumberFormat('@').setValues([row.concat(Array(9 - row.length).fill(''))]);
  return { ok: true, row: at };
}

function sameDate(h, iso) {
  const m = String(h || '').trim().match(/^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})$/);
  if (!m || !iso) return false;
  const p = iso.split('-');
  return +m[1] === +p[2] && +m[2] === +p[1] && +m[3] === +p[0];
}

function norm(t) {
  return String(t == null ? '' : t).trim().toLowerCase().replace(/\s+/g, ' ');
}

function json(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
