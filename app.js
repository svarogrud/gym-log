(function(){
  'use strict';
  var APP_VERSION='17';
  // Мова інтерфейсу: українська або англійська (⚙ → Мова). За замовчуванням — мова телефона.
  var LANG='uk';
  try{LANG=localStorage.getItem('gym.lang.v1')||((navigator.language||'').toLowerCase().indexOf('uk')===0?'uk':'en')}catch(e){LANG=(navigator.language||'').toLowerCase().indexOf('uk')===0?'uk':'en'}
  var LOC=LANG==='en'?'en-GB':LOC;
  var EN={
"Дні тренувань": "Workout days",
"Додати в це тренування": "Add to this workout",
"Збережено. Записую в таблицю…": "Saved. Writing to the sheet…",
"Записано у вкладку «Програма».": "Written to the “Програма” tab.",
"Збережено на телефоні. У таблицю запишеться, коли оновите скрипт або з’явиться мережа.": "Saved on this phone. It will be written to the sheet once you update the script or get back online.",
"Назад": "Back",
"Вправи": "Exercises",
"Пошук вправи": "Search exercises",
"Без дня": "No day",
"Натисніть на вправу, щоб побачити схему руху, медіа й останні результати. Програму можна змінити у вкладці «Програма» таблиці.": "Tap an exercise to see the movement diagram, media and recent results. You can change the program in the sheet’s “Програма” tab.",
"</div></div><button class=\"gear\" data-act=\"exlist\" aria-label=\"Список вправ\">☰</button><button class=\"gear\" data-act=\"cfg\" aria-label=\"Налаштування таблиці\">⚙</button></div>": "</div></div><button class=\"gear\" data-act=\"exlist\" aria-label=\"Exercise list\">☰</button><button class=\"gear\" data-act=\"cfg\" aria-label=\"Sheet settings\">⚙</button></div>",
"<button class=\"retry\" type=\"button\" data-act=\"upd\" id=\"updb\">Оновити апку</button></div>": "<button class=\"retry\" type=\"button\" data-act=\"upd\" id=\"updb\">Update app</button></div>",
"швидкість": "speed",
"опір": "resistance",
    "хв": "min",
    "нахил": "incline",
    "рівень": "level",
    "День ": "Day ",
    "Тренування": "Workout",
    "без чіткого дня": "no specific day",
    "сьогодні": "today",
    "вчора": "yesterday",
    " дн. тому": " days ago",
    "Таблицю не підключено. Натисніть ⚙ угорі й вставте адресу скрипта.": "The sheet isn’t connected. Tap ⚙ at the top and paste the script address.",
    "Немає інтернету. Запишу в таблицю, щойно з’явиться мережа.": "No internet. I’ll write to the sheet as soon as you’re back online.",
    "Ключ не збігається з ключем у скрипті. Перевірте налаштування (⚙).": "The key doesn’t match the key in the script. Check the settings (⚙).",
    "Скрипт відповів не так, як очікувалось. Перевірте, що його опубліковано як веб-застосунок з доступом «Anyone».": "The script answered unexpectedly. Make sure it is deployed as a web app with access set to “Anyone”.",
    "Таблиця не відповіла вчасно. Спробуйте ще раз.": "The sheet didn’t respond in time. Try again.",
    "Не вдалося з’єднатися з таблицею. Перевірте адресу скрипта та інтернет.": "Couldn’t reach the sheet. Check the script address and your internet connection.",
    "Помилка таблиці: ": "Sheet error: ",
    "Ще не записано в таблицю.": "Not written to the sheet yet.",
    "З таблиці, стовпець ": "From the sheet, column ",
    "Записано в таблицю, стовпець ": "Written to the sheet, column ",
    " Дата в таблиці: ": " Date in the sheet: ",
    "Спробувати ще раз": "Try again",
    "Записати в таблицю": "Write to the sheet",
    "Записую в таблицю…": "Writing to the sheet…",
    "Оновлено стовпець ": "Updated column ",
    " у таблиці.": " in the sheet.",
    "Оновити історію з таблиці": "Update history from the sheet",
    "Імпортувати історію з таблиці": "Import history from the sheet",
    "Читаю таблицю…": "Reading the sheet…",
    "Таблиця порожня або недоступна.": "The sheet is empty or unavailable.",
    "Імпортовано тренувань: ": "Workouts imported: ",
    ". Незафарбовані клітинки (": ". Unfilled cells (",
    ") пораховано як пропущені.": ") counted as skipped.",
    " Виправлено дат: ": " Dates fixed: ",
    " (позначені ≈, якщо дата приблизна).": " (marked ≈ when the date is approximate).",
    " Пропущено ": " Skipped ",
    ", бо вони вже є в апці.": " because they’re already in the app.",
    " Не вдалося розібрати клітинок: ": " Couldn’t read cells: ",
    "<div class=\"calh\"><button class=\"calb\" data-act=\"calp\" aria-label=\"Попередній місяць\">‹</button>": "<div class=\"calh\"><button class=\"calb\" data-act=\"calp\" aria-label=\"Previous month\">‹</button>",
    "тренування": "workout",
    "тренувань": "workouts",
    "без тренувань": "no workouts",
    "<button class=\"calb\" data-act=\"caln\" aria-label=\"Наступний місяць\">›</button></div><div class=\"calg\">": "<button class=\"calb\" data-act=\"caln\" aria-label=\"Next month\">›</button></div><div class=\"calg\">",
    "Пн": "Mon",
    "Вт": "Tue",
    "Ср": "Wed",
    "Чт": "Thu",
    "Пт": "Fri",
    "Сб": "Sat",
    "Нд": "Sun",
    "</div></div><button class=\"gear\" data-act=\"cfg\" aria-label=\"Налаштування таблиці\">⚙</button></div>": "</div></div><button class=\"gear\" data-act=\"cfg\" aria-label=\"Sheet settings\">⚙</button></div>",
    "<button class=\"resume\" data-act=\"cfg\"><div><b>Підключіть таблицю</b><div class=\"tag\">Щоб підтягнути історію й зберігати резервну копію</div></div><span>Налаштувати</span></button>": "<button class=\"resume\" data-act=\"cfg\"><div><b>Connect your sheet</b><div class=\"tag\">To pull in your history and keep a backup</div></div><span>Set up</span></button>",
    "\"><div><b>Тренування триває</b><div class=\"tag\">": "\"><div><b>Workout in progress</b><div class=\"tag\">",
    " з ": " of ",
    " підходів</div></div><span>Продовжити</span></button>": " sets</div></div><span>Continue</span></button>",
    "\" aria-label=\"Видалити незавершене тренування\">✕</button></div>": "\" aria-label=\"Delete unfinished workout\">✕</button></div>",
    "</div><div class=\"kick\">Наступне за чергою</div><h2>": "</div><div class=\"kick\">Up next</div><h2>",
    " вправ · останнє ": " exercises · last ",
    "\">Почати тренування</button></div>": "\">Start workout</button></div>",
    "<div><div class=\"sec\">Усі дні</div><div class=\"rows\">": "<div><div class=\"sec\">All days</div><div class=\"rows\">",
    "<div><div class=\"sec\">Календар</div><div class=\"cal\" id=\"cal\">": "<div><div class=\"sec\">Calendar</div><div class=\"cal\" id=\"cal\">",
    "<div><div class=\"sec\">Журнал": "<div><div class=\"sec\">Log",
    "<div class=\"empty\">Тут з’являться завершені тренування. Щоб підтягнути всі попередні, імпортуйте їх з таблиці.</div>": "<div class=\"empty\">Finished workouts will appear here. To bring in all earlier ones, import them from the sheet.</div>",
    " підходів · ": " sets · ",
    " кг": " kg",
    " · в таблиці": " · in sheet",
    "<button class=\"more\" data-act=\"more\">Показати всі (": "<button class=\"more\" data-act=\"more\">Show all (",
    "<p class=\"sync\">Записи зберігаються на цьому телефоні. Після завершення тренування апка додає його в таблицю": "<p class=\"sync\">Records are stored on this phone. After you finish a workout, the app adds it to the sheet",
    ". Чекають на запис: ": ". Waiting to be written: ",
    "\">Пізніше</button>": "\">Later</button>",
    "Готово ✓": "Done ✓",
    "Позначити": "Mark done",
    "\" aria-label=\"Підхід ": "\" aria-label=\"Set ",
    " повторень\"><b>": " reps\"><b>",
    "\">Прибрати з тренування</button>": "\">Remove from workout</button>",
    "\" aria-label=\"Менше\">−</button><label><input id=\"w-": "\" aria-label=\"Less\">−</button><label><input id=\"w-",
    "\" aria-label=\"Вага, кг\"><span>кг</span></label><button data-act=\"wp\" data-ex=\"": "\" aria-label=\"Weight, kg\"><span>kg</span></label><button data-act=\"wp\" data-ex=\"",
    "\" aria-label=\"Більше\">+</button></div></div>": "\" aria-label=\"More\">+</button></div></div>",
    " кг сумарно": " kg total",
    "<div class=\"wh\"><div class=\"l1\"><button class=\"back\" data-act=\"home\" aria-label=\"Назад\">‹</button><h2>": "<div class=\"wh\"><div class=\"l1\"><button class=\"back\" data-act=\"home\" aria-label=\"Back\">‹</button><h2>",
    "</h2><div class=\"cnt num\" id=\"pc\"></div><button class=\"back\" data-act=\"ord\" aria-label=\"Змінити порядок вправ\">⇅</button></div><div class=\"bar\"><i id=\"pb\"></i></div></div>": "</h2><div class=\"cnt num\" id=\"pc\"></div><button class=\"back\" data-act=\"ord\" aria-label=\"Change exercise order\">⇅</button></div><div class=\"bar\"><i id=\"pb\"></i></div></div>",
    "<div class=\"draft\" id=\"draftb\"><p>Перегляд. Тренування почнеться, коли натиснете кнопку або відмітите перший підхід.</p><button class=\"cta\" data-act=\"begin\">Почати тренування</button></div>": "<div class=\"draft\" id=\"draftb\"><p>Preview. The workout starts when you tap the button or tick your first set.</p><button class=\"cta\" data-act=\"begin\">Start workout</button></div>",
    "</div><button class=\"addx\" data-act=\"padd\">+ Додати вправу</button><button class=\"finish\" id=\"finb\" data-act=\"finish\"": "</div><button class=\"addx\" data-act=\"padd\">+ Add exercise</button><button class=\"finish\" id=\"finb\" data-act=\"finish\"",
    "Зберегти зміни": "Save changes",
    "Завершити тренування": "Finish workout",
    " · після завершення стане частиною дня «": " · after you finish, joins the day “",
    " · з’явиться в списку після завершення": " · appears in the list after you finish",
    "без дня в програмі": "not in any day",
    "<div class=\"pkp\" role=\"dialog\" aria-label=\"Додати вправу\"><div class=\"pkh\"><h2>Додати вправу</h2><button class=\"back\" data-act=\"pclose\" aria-label=\"Закрити\">×</button></div>": "<div class=\"pkp\" role=\"dialog\" aria-label=\"Add exercise\"><div class=\"pkh\"><h2>Add exercise</h2><button class=\"back\" data-act=\"pclose\" aria-label=\"Close\">×</button></div>",
    "<div class=\"pkt\"><button data-act=\"ptab\" data-tab=\"l\" class=\"on\">З наявних</button><button data-act=\"ptab\" data-tab=\"n\">Нова</button></div>": "<div class=\"pkt\"><button data-act=\"ptab\" data-tab=\"l\" class=\"on\">Existing</button><button data-act=\"ptab\" data-tab=\"n\">New</button></div>",
    "<div id=\"pk-l\"><input class=\"in\" id=\"pkq\" type=\"search\" placeholder=\"Пошук\" autocomplete=\"off\" aria-label=\"Пошук вправи\">": "<div id=\"pk-l\"><input class=\"in\" id=\"pkq\" type=\"search\" placeholder=\"Search\" autocomplete=\"off\" aria-label=\"Search exercises\">",
    "<div class=\"sec pks\">Мої вправи</div>": "<div class=\"sec pks\">My exercises</div>",
    "<div class=\"sec pks\">Інші дні</div>": "<div class=\"sec pks\">Other days</div>",
    "<p class=\"empty\">Усі наявні вправи вже в цьому тренуванні.</p>": "<p class=\"empty\">All existing exercises are already in this workout.</p>",
    "<div id=\"pk-n\" class=\"pkf\" hidden><label for=\"nn\">Назва<input class=\"in\" id=\"nn\" type=\"text\" maxlength=\"60\" autocomplete=\"off\" placeholder=\"Наприклад, молоткові згинання\"></label>": "<div id=\"pk-n\" class=\"pkf\" hidden><label for=\"nn\">Name<input class=\"in\" id=\"nn\" type=\"text\" maxlength=\"60\" autocomplete=\"off\" placeholder=\"For example, hammer curls\"></label>",
    "<div class=\"pkg\"><label for=\"ns\">Підходи<input class=\"in\" id=\"ns\" type=\"number\" inputmode=\"numeric\" min=\"1\" max=\"10\" value=\"3\"></label>": "<div class=\"pkg\"><label for=\"ns\">Sets<input class=\"in\" id=\"ns\" type=\"number\" inputmode=\"numeric\" min=\"1\" max=\"10\" value=\"3\"></label>",
    "<label for=\"nr\">Повтори<input class=\"in\" id=\"nr\" type=\"number\" inputmode=\"numeric\" min=\"1\" max=\"100\" value=\"10\"></label>": "<label for=\"nr\">Reps<input class=\"in\" id=\"nr\" type=\"number\" inputmode=\"numeric\" min=\"1\" max=\"100\" value=\"10\"></label>",
    "<label for=\"nw\">Вага, кг<input class=\"in\" id=\"nw\" type=\"text\" inputmode=\"decimal\" value=\"0\"></label></div>": "<label for=\"nw\">Weight, kg<input class=\"in\" id=\"nw\" type=\"text\" inputmode=\"decimal\" value=\"0\"></label></div>",
    "<button class=\"cta\" type=\"button\" data-act=\"pnew\">Створити й додати</button>": "<button class=\"cta\" type=\"button\" data-act=\"pnew\">Create and add</button>",
    "Коли ви завершите тренування, вправа стане частиною дня «": "When you finish the workout, the exercise joins the day “",
    "» і з’явиться у вкладці «Програма».": "” and appears in the “Програма” tab.",
    "Коли ви завершите тренування, вправа з’явиться у вкладці «Програма» (без дня).": "When you finish the workout, the exercise appears in the “Програма” tab (without a day).",
    " У журналі для неї додасться окремий рядок.</p></div></div>": " It also gets its own row in the log.</p></div></div>",
    "Введіть назву вправи.": "Enter the exercise name.",
    "Вправа з такою назвою вже є. Знайдіть її у вкладці «З наявних».": "An exercise with this name already exists. Find it under “Existing”.",
    "<div class=\"pkp\" role=\"dialog\" aria-label=\"Налаштування таблиці\"><div class=\"pkh\"><h2>Таблиця</h2><button class=\"back\" data-act=\"pclose\" aria-label=\"Закрити\">×</button></div>": "<div class=\"pkp\" role=\"dialog\" aria-label=\"Sheet settings\"><div class=\"pkh\"><h2>Sheet</h2><button class=\"back\" data-act=\"pclose\" aria-label=\"Close\">×</button></div>",
    "<div class=\"pkf\"><label for=\"cu\">Адреса скрипта (Web app URL)<input class=\"in\" id=\"cu\" type=\"url\" inputmode=\"url\" autocomplete=\"off\" spellcheck=\"false\" placeholder=\"https://script.google.com/macros/s/…/exec\" value=\"": "<div class=\"pkf\"><label for=\"cu\">Script address (Web app URL)<input class=\"in\" id=\"cu\" type=\"url\" inputmode=\"url\" autocomplete=\"off\" spellcheck=\"false\" placeholder=\"https://script.google.com/macros/s/…/exec\" value=\"",
    "<label for=\"ct\">Ключ із скрипта<input class=\"in\" id=\"ct\" type=\"text\" autocomplete=\"off\" spellcheck=\"false\" value=\"": "<label for=\"ct\">Key from the script<input class=\"in\" id=\"ct\" type=\"text\" autocomplete=\"off\" spellcheck=\"false\" value=\"",
    "<button class=\"cta\" type=\"button\" data-act=\"csave\">Зберегти й перевірити</button>": "<button class=\"cta\" type=\"button\" data-act=\"csave\">Save and check</button>",
    "<p class=\"sync\">Адреса й ключ зберігаються тільки на цьому пристрої. Як їх отримати, описано в README репозиторію.</p></div>": "<p class=\"sync\">The address and key are stored only on this device. The repository README explains how to get them.</p></div>",
    "<div class=\"pkf upd\"><div class=\"sec\">Апка</div><p class=\"sync\">Версія ": "<div class=\"pkf upd\"><div class=\"sec\">App</div><p class=\"sync\">Version ",
    ". Якщо після змін нова версія не з’явилась, оновіть вручну. Тренування й налаштування залишаться.</p>": ". If a new version didn’t show up after changes, update manually. Your workouts and settings stay.</p>",
    "<button class=\"retry\" type=\"button\" data-act=\"upd\" id=\"updb\">Оновити апку</button></div></div>": "<button class=\"retry\" type=\"button\" data-act=\"upd\" id=\"updb\">Update app</button></div></div>",
    "Адреса має виглядати так: https://script.google.com/macros/s/…/exec": "The address should look like this: https://script.google.com/macros/s/…/exec",
    "Вставте ключ, який ви вписали в скрипт.": "Paste the key you wrote into the script.",
    "Перевіряю…": "Checking…",
    "З’єднано з таблицею «": "Connected to the sheet “",
    "». Завантажую програму…": "”. Loading the program…",
    " Програму завантажено з вкладки «Програма».": " Program loaded from the “Програма” tab.",
    "Оновлюю…": "Updating…",
    "<div class=\"pkp\" role=\"dialog\" aria-label=\"Порядок вправ\"><div class=\"pkh\"><h2>Порядок вправ</h2><button class=\"back\" data-act=\"odone\" aria-label=\"Готово\">×</button></div><div class=\"olist\">": "<div class=\"pkp\" role=\"dialog\" aria-label=\"Exercise order\"><div class=\"pkh\"><h2>Exercise order</h2><button class=\"back\" data-act=\"odone\" aria-label=\"Done\">×</button></div><div class=\"olist\">",
    "\" data-d=\"-1\" aria-label=\"Вище\"": "\" data-d=\"-1\" aria-label=\"Up\"",
    "\" data-d=\"1\" aria-label=\"Нижче\"": "\" data-d=\"1\" aria-label=\"Down\"",
    "</div><button class=\"retry\" data-act=\"ofreq\">Як найчастіше виконую</button>": "</div><button class=\"retry\" data-act=\"ofreq\">As I usually do them</button>",
    "<button class=\"cta\" data-act=\"osave\">Зберегти для наступних тренувань «": "<button class=\"cta\" data-act=\"osave\">Save for future “",
    "<p class=\"sync\">Перетягуйте вправи за ≡ або стрілками. Без збереження зміни діють лише в цьому тренуванні. «Як найчастіше виконую» ставить нагору вправи, які ви робите найчастіше, а пропущені — вниз.</p></div>": "<p class=\"sync\">Drag exercises by ≡ or use the arrows. Without saving, changes apply to this workout only. “As I usually do them” puts the exercises you do most often on top and skipped ones at the bottom.</p></div>",
    "\" target=\"_blank\" rel=\"noopener\">▶ Відкрити відео</a>": "\" target=\"_blank\" rel=\"noopener\">▶ Open video</a>",
    "</h2><button class=\"back\" data-act=\"pclose\" aria-label=\"Закрити\">×</button></div>": "</h2><button class=\"back\" data-act=\"pclose\" aria-label=\"Close\">×</button></div>",
    "Схема руху. ": "Movement diagram. ",
    "Фото свого тренажера, GIF чи відео можна додати у вкладці «Програма», колонка «Медіа».</p>": "You can add a photo of your machine, a GIF or a video in the “Програма” tab, “Медіа” column.</p>",
    "\" target=\"_blank\" rel=\"noopener\">Знайти відео на YouTube</a>": "\" target=\"_blank\" rel=\"noopener\">Find a video on YouTube</a>",
    "<div class=\"sec pks\">Останні результати</div><div class=\"hist\">": "<div class=\"sec pks\">Recent results</div><div class=\"hist\">",
    "Не вдалося показати медіа за посиланням. Перевірте, що воно відкривається без входу.": "Couldn’t show the media from this link. Check that it opens without signing in.",
    "відпочинок": "rest",
    "час наступного підходу": "time for the next set",
    "Зберігаю…": "Saving…",
    "Збережено. Наступні тренування цього дня йтимуть у такому порядку.": "Saved. Future workouts of this day will follow this order.",
    "Збережено на телефоні. У таблицю запишеться, коли оновите скрипт.": "Saved on this phone. It will be written to the sheet once you update the script.",
    "<div class=\"rq\"><b>Видалити незавершене тренування?</b><div class=\"tag\">": "<div class=\"rq\"><b>Delete the unfinished workout?</b><div class=\"tag\">",
    " · відмічено підходів: ": " · sets ticked: ",
    ". У таблиці нічого не зміниться.</div></div>": ". Nothing changes in the sheet.</div></div>",
    "<div class=\"rqb\"><button class=\"retry\" data-act=\"rdelno\">Ні</button><button class=\"retry danger\" data-act=\"rdelyes\" data-key=\"": "<div class=\"rqb\"><button class=\"retry\" data-act=\"rdelno\">No</button><button class=\"retry danger\" data-act=\"rdelyes\" data-key=\"",
    "\">Видалити</button></div>": "\">Delete</button></div>",
    "Є нова версія апки. Натисніть, щоб оновити": "A new version is available. Tap to update"
    };
  function T(s){return LANG==='en'&&EN[s]!=null?EN[s]:s}
  /* ---------- програма тренувань ----------
     Джерело правди — вкладки «Програма» і «Дні» в таблиці. Нижче — стартова програма,
     з якої ці вкладки створюються, і яку апка використовує, доки таблицю не підключено. */
  var PROG_HEAD=['Назва в журналі','Назва в апці','Тип','Дні','Підходи','Повтори','Вага','Примітка','ID','Медіа','Name EN'];
  var DAYS_HEAD=['№','Назва','Опис','Колір','Іконка','Порядок','Name EN'];
  var BUILTIN={
    days:[
      ['1','Ноги','ноги, підтягування, бруси','#ff9900','ноги','','Legs'],
      ['2','Плечі та спина','плечі, спина, підтягування','#4a86e8','плечі, спина','','Shoulders & back'],
      ['3','Груди та руки','груди, біцепс, трицепс','#9900ff','груди, руки','','Chest & arms']
    ],
    ex:[
      ['elipse','Еліпс','кардіо','1, 2, 3','','хв; нахил; рівень','','15*10*7','ell','','Elliptical'],
      ['bike','Велосипед','кардіо','1, 2, 3','','хв','','20 min','bike','','Bike'],
      ['low back','Низ спини','сила','1, 2, 3','3','15','77','low back','lowb','','Lower back'],
      ['back extension','Гіперекстензія','сила','1, 2, 3','3','15','77','back extension','bext','','Back extension'],
      ['abdominal/прес лежачи','Прес лежачи','сила','1, 3','3','15','0','вага 0 = своя вага','abs','','Floor crunches'],
      ['P14 abdominal crunch/пресс на станку, згинання','Скручування на тренажері','сила','1, 2, 3','3','15','59','P14','crunch','','Ab crunch machine'],
      ['chin/підтягування','Підтягування','сила','1, 2','3','8','20','chin','chin','','Pull-ups'],
      ['dip/бруси','Бруси','сила','1, 2','3','10','20','dip','dip','','Dips'],
      ['converting shoulder press/ жим вгору станок','Жим вгору на тренажері','сила','2','3','10','23','shoulder press','shp','','Shoulder press machine'],
      ['seated row','Тяга сидячи','сила','2','2','10','36','seated row','srow','','Seated cable row'],
      ['P22 rotary torso/боки, повороти','Повороти корпусу','сила','2','3','10','50','P22 rotary torso','rot','','Rotary torso'],
      ['rear delt','Задня дельта','сила','2','3','10','39','rear delt','rear','','Rear delt fly'],
      ['P20 lateral raise/плечі','Махи в сторони','сила','2','3','10','45','P20 lateral raise','lat','','Lateral raise'],
      ['P6 diverging seated row','Розвідна тяга сидячи','сила','2','3','10','45','P6 diverging seated row','drow','','Diverging seated row'],
      ['lat pulldown','Тяга верхнього блоку','сила','2','3','10','45','lat pulldown','pull','','Lat pulldown'],
      ['жим лежачи','Жим лежачи','сила','3','3','10','30','','bench','','Bench press'],
      ['біцепс гнута штанга','Біцепс зі штангою','сила','3','3','10','20','гнута штанга','bbic','','EZ-bar curl'],
      ['жим лежачи під кутом','Жим лежачи під кутом','сила','3','3','10','20','','incl','','Incline bench press'],
      ['біцепс гантелі','Біцепс з гантелями','сила','3','3','10','15','','dbic','','Dumbbell curl'],
      ['triceps pressdown','Трицепс на блоці','сила','3','3','10','18','triceps pressdown','tri','','Triceps pressdown'],
      ['тріцепс за голову','Трицепс за головою','сила','3','3','10','7.5; 10; 10','','tri2','','Overhead triceps extension'],
      ['low row','Нижня тяга','сила','3','3','10','45','low row','lrow','','Low row'],
      ['leg extension  (5,1,3)','Розгинання ніг','сила','1','3','10','36','налаштування 5, 1, 3','lext','','Leg extension'],
      ['leg curl','Згинання ніг','сила','1','3','10','36','leg curl','lcurl','','Seated leg curl'],
      ['hip adductor / в середину ><','Зведення ніг','сила','1','3','10','43','hip adductor, до середини','add','','Hip adductor'],
      ['hip abductor / назовні  <>','Розведення ніг','сила','1','3','15','50','hip abductor, назовні','abd','','Hip abductor'],
      ['glute','Сідничні','сила','1','3','10','32','glute','glute','','Glute kickback'],
      ['hack squat/присідання під кутом','Присідання під кутом','сила','1','3','10','30','hack squat','hack','','Hack squat'],
      ['ікри стоячи','Ікри стоячи','сила','1','3','10','50','','calfs','','Standing calf raise'],
      ['ікри сидячи','Ікри сидячи','сила','1','3','15','30','','calft','','Seated calf raise'],
      ['prone leg curl / лежачи','Згинання ніг лежачи','сила','1','3','10','32','prone leg curl','plc','','Lying leg curl'],
      ['leg press (4)','Жим ногами','сила','1','3','15','59','налаштування 4','lpress','','Leg press']
    ]
  };
  // Дати останніх тренувань до появи апки (поки історію не імпортовано)
  var SEED={A:'2026-10-25',B:'2026-10-27',C:'2026-10-16'};

  var S=function(n,r,w){var a=[];for(var i=0;i<n;i++)a.push([r,w]);return a};
  var EX={}, DAYS={}, DAYKEYS=[], GROUPS={}, DAYCOL={}, DAYHEX={}, NAME2ID={};
  function normName(t){return String(t==null?'':t).trim().toLowerCase().replace(/\s+/g,' ')}
  function dayKey(num){var n=parseInt(num,10);return n>=1&&n<=26?String.fromCharCode(64+n):null}
  // Список значень: «7.5; 10; 10» або «7.5, 10, 10» (кома з пробілом). «7,5» без пробілу — це 7.5
  function parseList(v){
    return String(v==null?'':v).split(/\s*;\s*|,\s+/).map(function(x){return parseFloat(String(x).trim().replace(',','.'))}).filter(function(x){return !isNaN(x)});
  }
  function hexOk(h){return /^#?[0-9a-f]{6}$/i.test(String(h||'').trim())}
  function hexNorm(h){h=String(h).trim();return (h[0]==='#'?h:'#'+h).toLowerCase()}
  function hexRgb(h){h=hexNorm(h);return {red:parseInt(h.slice(1,3),16)/255,green:parseInt(h.slice(3,5),16)/255,blue:parseInt(h.slice(5,7),16)/255}}
  function cfNums(t){
    return String(t==null?'':t).split('*').map(function(x){return parseFloat(String(x).replace(',','.').replace(/[^\d.]/g,''))}).filter(function(x){return !isNaN(x)});
  }
  function exFromRow(r){
    var j=String(r[0]||'').trim(),n=String(r[1]||'').trim()||j;
    if(LANG==='en'){var en=String(r[10]||'').trim();if(en)n=en;else if(/[a-z]/i.test(j.split('/')[0])){n=j.split('/')[0].replace(/\(.*?\)/g,'').trim();n=n.charAt(0).toUpperCase()+n.slice(1)}}
    var type=normName(r[2]),note=String(r[7]||'').trim(),id=String(r[8]||'').trim();
    if(!j&&!n)return null;
    if(!id)id='n:'+normName(j||n);
    var days=String(r[3]||'').split(/[^\d]+/).map(dayKey).filter(Boolean);
    var d={n:n,j:j||n,days:days,media:String(r[9]||'').trim()};
    if(type.indexOf('кард')===0||type==='cardio'){
      // кардіо: у «Примітці» план як у журналі (15*10*7 або 20 min), у «Повторах» — назви полів через «;»
      d.t='cardio';d.sh=note||'';d.d=note||'';
      var nums=cfNums(note);d.cf=nums.length?nums:[20];
      d.min=nums.length===1&&/min|хв/i.test(note);
      var lab=String(r[5]||'').split(/\s*[;,]\s*/).map(function(x){return x.trim()}).filter(Boolean);
      d.lab=lab.length>=d.cf.length?lab.slice(0,d.cf.length).map(T):({1:[T('хв')],2:[T('хв'),T('нахил')],3:[T('хв'),T('нахил'),T('рівень')]}[d.cf.length]||d.cf.map(function(_,i){return '#'+(i+1)}));
    }
    else{
      var reps=parseList(r[5]),ws=parseList(r[6]);
      var sets=parseInt(r[4],10)||Math.max(reps.length,ws.length)||3;
      sets=Math.max(1,Math.min(10,sets));
      d.s=[];
      for(var i=0;i<sets;i++)d.s.push([reps.length?(reps[i]!=null?reps[i]:reps[reps.length-1]):10,ws.length?(ws[i]!=null?ws[i]:ws[ws.length-1]):0]);
      if(note)d.tag=note;
    }
    return {id:id,d:d};
  }
  function applyProgram(p){
    var dayRows=(p&&p.days&&p.days.length)?p.days:BUILTIN.days;
    var exRows=(p&&p.ex&&p.ex.length)?p.ex:BUILTIN.ex;
    Object.keys(EX).forEach(function(k){delete EX[k]});
    Object.keys(DAYS).forEach(function(k){delete DAYS[k]});
    Object.keys(NAME2ID).forEach(function(k){delete NAME2ID[k]});
    DAYKEYS.length=0;
    dayRows.forEach(function(r){
      var k=dayKey(r[0]);if(!k||DAYS[k])return;
      var col=hexOk(r[3])?hexNorm(r[3]):'#cccccc';
      var dn=String(r[1]||T('День ')+r[0]).trim();
      if(LANG==='en')dn=String(r[6]||'').trim()||({'ноги':'Legs','плечі та спина':'Shoulders & back','груди та руки':'Chest & arms'}[normName(dn)])||dn;
      DAYS[k]={n:dn,num:parseInt(r[0],10),sub:String(r[2]||'').trim(),ids:[],color:col,icon:String(r[4]||'').trim(),
        order:String(r[5]||'').split(/[,;\s]+/).filter(Boolean)};
      DAYKEYS.push(k);
    });
    if(!DAYKEYS.length&&dayRows!==BUILTIN.days)return applyProgram({days:BUILTIN.days,ex:exRows});
    exRows.forEach(function(r){
      var e=exFromRow(r);if(!e||EX[e.id])return;
      EX[e.id]=e.d;NAME2ID[normName(e.d.j)]=e.id;
      e.d.days.forEach(function(k){if(DAYS[k])DAYS[k].ids.push(e.id)});
    });
    DAYS.X={n:T('Тренування'),num:'·',sub:T('без чіткого дня'),ids:[],color:'#cccccc'};
    // вправи, які є лише в одному дні, допомагають вгадати день старого стовпця
    Object.keys(GROUPS).forEach(function(k){delete GROUPS[k]});
    DAYKEYS.forEach(function(k){GROUPS[k]=DAYS[k].ids.filter(function(id){return EX[id].days.length===1})});
    Object.keys(DAYS).forEach(function(k){DAYHEX[k]=DAYS[k].color;DAYCOL[k]=hexRgb(DAYS[k].color)});
  }
  applyProgram(null);
  // Значок дня — силует тіла (вид спереду), зони дня підсвічені його кольором.
  // У вкладці «Дні», колонка «Іконка»: зони через кому (ноги, плечі, спина, груди, руки, прес),
  // або назва предмета (штанга, гантель, гиря, кардіо), або емодзі.
  var BODY={
    head:'<circle cx="12" cy="3.4" r="2.5"/>',
    sh:'<circle cx="6.6" cy="8.2" r="1.9"/><circle cx="17.4" cy="8.2" r="1.9"/>',
    chest:'<path d="M7.6 7.2h8.8l.6 6.3H7z"/>',
    abs:'<rect x="8.1" y="14.2" width="7.8" height="4.4" rx="1"/>',
    arms:'<rect x="4.2" y="10" width="2.5" height="5.2" rx="1.25"/><rect x="17.3" y="10" width="2.5" height="5.2" rx="1.25"/><rect x="3.6" y="15.8" width="2.3" height="5" rx="1.15"/><rect x="18.1" y="15.8" width="2.3" height="5" rx="1.15"/>',
    legs:'<rect x="8.2" y="19.3" width="3.4" height="6.6" rx="1.5"/><rect x="12.4" y="19.3" width="3.4" height="6.6" rx="1.5"/><rect x="8.5" y="26.6" width="2.9" height="5" rx="1.3"/><rect x="12.6" y="26.6" width="2.9" height="5" rx="1.3"/>'
  };
  var ZONES={'ноги':'legs','ніг':'legs','legs':'legs','плечі':'sh','плечей':'sh','shoulders':'sh','спина':'chest','back':'chest',
    'груди':'chest','chest':'chest','руки':'arms','рука':'arms','біцепс':'arms','трицепс':'arms','arms':'arms','прес':'abs','abs':'abs','core':'abs'};
  var GEAR={
    'штанга':'<path d="M2 12h20"/><rect x="4.5" y="6.5" width="3" height="11" rx="1"/><rect x="16.5" y="6.5" width="3" height="11" rx="1"/>',
    'гантель':'<path d="M8 12h8"/><rect x="3" y="8" width="5" height="8" rx="1.5"/><rect x="16" y="8" width="5" height="8" rx="1.5"/>',
    'гиря':'<path d="M8.5 9.3V7.5a3.5 3.5 0 0 1 7 0v1.8"/><path d="M6.5 15a5.5 5.5 0 1 1 11 0c0 1.9-.9 3.6-2.3 4.6H8.8A5.6 5.6 0 0 1 6.5 15z"/>',
    'кардіо':'<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20z"/><path d="M3.5 12.5h4l1.5-2.5 2 5 1.5-2.5h8"/>'
  };
  function iconSvg(name){
    var words=String(name||'').split(/[,;\s]+/).map(normName).filter(Boolean);
    if(!words.length)return '';
    var zones=words.map(function(w){return ZONES[w]});
    if(zones.every(Boolean)){
      return '<svg class="body" viewBox="0 0 24 32" aria-hidden="true">'+Object.keys(BODY).map(function(k){
        // незадіяні зони — нейтральні сірі, щоб силует читався на будь-якому фоні
        return zones.indexOf(k)>=0?'<g fill="currentColor">'+BODY[k]+'</g>':'<g fill="var(--muted)" opacity=".4">'+BODY[k]+'</g>'}).join('')+'</svg>';
    }
    if(words.length===1&&GEAR[words[0]])return '<svg class="gear" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+GEAR[words[0]]+'</svg>';
    return '';
  }
  // Значок дня: лінійна іконка кольору дня, емодзі або номер
  function badge(d){
    if(!d)return '';
    if(d.icon){
      var sv=iconSvg(d.icon);
      if(sv)return '<span class="ico svg" style="color:'+d.color+'">'+sv+'</span>';
      return '<span class="ico">'+esc(d.icon)+'</span>';
    }
    return d.num;
  }
  // Рядки вкладок → у фіксованому порядку колонок, за назвами заголовків (порядок колонок у таблиці може бути будь-який)
  function canon(head,rows,want){
    if(!head||!head.length)return rows;
    var idx=want.map(function(w,i){var j=head.map(normName).indexOf(normName(w));return j});
    return rows.map(function(r){return idx.map(function(j){return j>=0&&r[j]!=null?String(r[j]):''})});
  }

  function isoOf(y,m,d){return y+'-'+('0'+m).slice(-2)+'-'+('0'+d).slice(-2)}
  function parseDate(raw){
    var m=String(raw==null?'':raw).trim().match(/^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})$/);
    if(!m)return null;
    var d=+m[1],mo=+m[2],y=+m[3];
    if(mo<1||mo>12||d<1||d>31)return null;
    return isoOf(y,mo,d);
  }
  function dayNum(iso){return Math.round(Date.UTC(+iso.slice(0,4),+iso.slice(5,7)-1,+iso.slice(8,10))/86400000)}
  function fromDayNum(n){var t=new Date(n*86400000);return isoOf(t.getUTCFullYear(),t.getUTCMonth()+1,t.getUTCDate())}
  // Дата, не більша за попередню, вважається скопійованою: спершу пробуємо виправити рік, інакше ставимо між сусідніми датами
  function fixDates(list){
    var res=[],prev=null;
    list.forEach(function(d,i){
      if(d&&(!prev||d>prev)){res[i]={iso:d};prev=d;return}
      if(d&&prev){
        var y=+prev.slice(0,4),c=null;
        [y,y+1].some(function(Y){var t=Y+d.slice(4);if(t>prev&&dayNum(t)-dayNum(prev)<=60){c=t;return true}return false});
        if(c){res[i]={iso:c,fix:'year',raw:d};prev=c;return}
      }
      res[i]={iso:null,raw:d};
    });
    var i=0;
    while(i<res.length){
      if(res[i].iso){i++;continue}
      var j=i;while(j<res.length&&!res[j].iso)j++;
      var n=j-i,a=i>0?res[i-1].iso:null,b=j<res.length?res[j].iso:null;
      for(var k=1;k<=n;k++){
        var dn;
        if(a&&b)dn=dayNum(a)+Math.round((dayNum(b)-dayNum(a))*k/(n+1));
        else if(a)dn=dayNum(a)+2*k;
        else if(b)dn=dayNum(b)-2*(n-k+1);
        else dn=dayNum(new Date().toISOString().slice(0,10));
        res[i+k-1].iso=fromDayNum(dn);res[i+k-1].fix='est';
      }
      i=j;
    }
    return res;
  }
  function parseCell(id,raw){
    var t=String(raw==null?'':raw).trim();
    if(!t)return null;
    var d=EX[id];
    if(d.t==='cardio'){var cv=cfNums(t);return [cv.length?{done:true,txt:t,v:cv}:{done:true,txt:t}]}
    var noW=d.s[0][1]===0,out=[],ok=true;
    t.split(/[,;]/).forEach(function(p){
      p=p.trim();if(!p)return;
      var n=p.split(/\s*[*xх×]\s*/).map(function(v){return parseFloat(v.replace(/[^\d.]/g,''))});
      if(n.some(isNaN)||!n.length||n.length>3){ok=false;return}
      var sets,r,w;
      if(n.length===3){sets=n[0];r=n[1];w=n[2]}
      else if(n.length===2){if(noW){sets=n[0];r=n[1];w=0}else{sets=1;r=n[0];w=n[1]}}
      else{sets=1;r=n[0];w=0}
      sets=Math.max(1,Math.min(10,Math.round(sets)));
      for(var q=0;q<sets;q++)out.push({w:w,r:r,done:true});
    });
    return ok&&out.length?out:null;
  }
  function classify(ex){
    var best='X',bs=0;
    DAYKEYS.forEach(function(k){
      var sc=(GROUPS[k]||[]).filter(function(id){return ex[id]}).length;
      if(sc>bs){bs=sc;best=k}
    });
    return best;
  }
  // Колір клітинки = виконано; біла чи без заливки = пропущено. Відтінок кольору підказує день
  function rgb(c){return c?{r:c.red||0,g:c.green||0,b:c.blue||0}:null}
  function isDone(c){var q=rgb(c);return !!q&&!(q.r>0.97&&q.g>0.97&&q.b>0.97)}
  function hueOf(c){
    var q=rgb(c),mx=Math.max(q.r,q.g,q.b),mn=Math.min(q.r,q.g,q.b),d=mx-mn,h;
    if(d<0.08)return null;
    if(mx===q.r)h=((q.g-q.b)/d)%6;else if(mx===q.g)h=(q.b-q.r)/d+2;else h=(q.r-q.g)/d+4;
    h*=60;if(h<0)h+=360;return h;
  }
  function dayOfColor(c){
    var h=hueOf(c);if(h==null)return null;
    // найближчий за відтінком колір дня з вкладки «Дні»
    var best=null,bd=36;
    DAYKEYS.forEach(function(k){var a=hueOf(DAYCOL[k]);if(a==null)return;var dd=Math.abs(h-a);dd=Math.min(dd,360-dd);if(dd<bd){bd=dd;best=k}});
    return best;
  }
  // Відповідь скрипта: значення (як їх видно в таблиці) і кольори заливки у hex
  function hexToRgb(h){var m=String(h||'').match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);return m?{red:parseInt(m[1],16)/255,green:parseInt(m[2],16)/255,blue:parseInt(m[3],16)/255}:null}
  function gridFromApi(j){
    var vals=((j&&j.values)||[]).map(function(r){return (r||[]).map(function(v){return v==null?'':String(v)})});
    var cols=((j&&j.colors)||[]).map(function(r){return (r||[]).map(hexToRgb)});
    return {values:vals,colors:cols};
  }
  // values: масив рядків таблиці; colors: кольори тих самих клітинок. Повертає тренування і кількість нерозпізнаних клітинок
  function buildImported(values,nameToId,colors){
    var head=values[0]||[],cols=head.length,out=[],bad=0;
    var rowIds=[];
    for(var r=1;r<values.length;r++){
      var nm=values[r]&&values[r][0],id=nm?NAME2ID[normName(nm)]:null;
      if(!id&&nameToId&&nm)id=nameToId(nm);
      rowIds[r]=id||null;
    }
    var raw=[],fixed;
    for(var c=1;c<cols;c++)raw.push(parseDate(head[c]));
    fixed=fixDates(raw);
    var now=Date.now(),used={},skippedCells=0;
    for(var c2=1;c2<cols;c2++){
      var ex={},votes={};
      for(var r2=1;r2<values.length;r2++){
        var id2=rowIds[r2];if(!id2||!EX[id2])continue;
        var cell=values[r2]&&values[r2][c2];
        if(cell==null||String(cell).trim()==='')continue;
        var col=colors&&colors[r2]&&colors[r2][c2];
        if(colors&&!isDone(col)){skippedCells++;continue}
        var dc=dayOfColor(col);if(dc)votes[dc]=(votes[dc]||0)+1;
        var p=parseCell(id2,cell);
        if(p)ex[id2]=p;else bad++;
      }
      if(!Object.keys(ex).length)continue;
      var f=fixed[c2-1],day=null,vb=0;
      DAYKEYS.forEach(function(k){if((votes[k]||0)>vb){vb=votes[k];day=k}});
      if(!day)day=classify(ex);
      var dids=DAYS[day].ids,extra=Object.keys(ex).filter(function(id){return dids.indexOf(id)<0});
      var key=f.iso+'_'+day,n2=2;
      while(used[key])key=f.iso+'_'+day+'_'+(n2++);
      used[key]=1;
      var ts=dayNum(f.iso)*86400000+12*3600000;
      out.push({key:key,day:day,date:f.iso,started:ts,finished:ts,updated:now,ex:ex,extra:extra,
        imported:true,sheetCol:c2,sheetAt:now,dateFix:f.fix||null,rawDate:head[c2]==null?'':String(head[c2])});
    }
    return {sessions:out,bad:bad,skipped:skippedCells};
  }
  /*IMPORT-END*/
  var LS='gym.sessions.v1', LSR='gym.rest.v1', LSL='gym.lib.v1';
  var sessions={}, custom={}, cur=null, view='home', restSec=90;
  var app=document.getElementById('app'), pk=document.getElementById('picker');

  function lsGet(k){try{return localStorage.getItem(k)}catch(e){return null}}
  function lsSet(k,v){try{localStorage.setItem(k,v)}catch(e){}}
  try{sessions=JSON.parse(lsGet(LS)||'{}')||{}}catch(e){sessions={}}
  // Власні вправи: живуть в EX поряд зі стандартними
  try{custom=JSON.parse(lsGet(LSL)||'{}')||{}}catch(e){custom={}}
  // Дні вправи, змінені в апці: діють одразу, у таблицю записуються, щойно є зв’язок
  var LSD='gym.exdays.v1',exDays={};
  try{exDays=JSON.parse(lsGet(LSD)||'{}')||{}}catch(e){exDays={}}
  function saveExDays(){lsSet(LSD,JSON.stringify(exDays))}
  function setDays(id,keys){
    var d=EX[id];if(!d)return;
    d.days=keys.slice();
    DAYKEYS.forEach(function(k){
      var ids=DAYS[k].ids,i=ids.indexOf(id),want=keys.indexOf(k)>=0;
      if(want&&i<0)ids.push(id);else if(!want&&i>=0)ids.splice(i,1);
    });
  }
  // зміна діє, поки її не записано, або поки програма з таблиці не новіша за неї
  var progAt=0;
  function applyExDays(){Object.keys(exDays).forEach(function(id){var o=exDays[id];if(EX[id]&&(o.pending||(o.at||0)>progAt))setDays(id,o.days)})}
  function pushExDays(id){
    var o=exDays[id];if(!o||!o.pending||!cfg.url)return Promise.resolve(false);
    var nums=o.days.map(function(k){return DAYS[k]?String(DAYS[k].num):''}).filter(Boolean).join(', ');
    return api('setExerciseDays',{id:id,days:nums}).then(function(){o.pending=false;saveExDays();return true},function(){return false});
  }
  function mergeCustom(){
    Object.keys(custom).forEach(function(id){
      var d=custom[id];
      if(!d||!d.n||!d.s){delete custom[id];return}
      if(!d.j)d.j=d.n;
      if(!d.days)d.days=[];
      // вже є у вкладці «Програма» → далі береться звідти
      if(d.synced&&(EX[id]||NAME2ID[normName(d.j)])){delete custom[id];return}
      if(!EX[id]){EX[id]=d;NAME2ID[normName(d.j)]=id}
      // після завершення тренування вправа входить у план свого дня
      if(d.ready)d.days.forEach(function(k){if(DAYS[k]&&DAYS[k].ids.indexOf(id)<0)DAYS[k].ids.push(id)});
    });
    saveLib();
  }
  // Програма з таблиці, збережена на телефоні для офлайну
  var LSP='gym.prog.v1';
  try{var p0=JSON.parse(lsGet(LSP)||'null');if(p0&&p0.ex&&p0.ex.length){applyProgram(p0);progAt=p0.at||0}}catch(e){}
  function saveLib(){lsSet(LSL,JSON.stringify(custom))}
  mergeCustom();applyExDays();
  function dayOf(k){return DAYS[k]||DAYS.X}
  function sIds(s){
    // порядок цього тренування (якщо його змінювали), інакше порядок дня
    var ids=(s.order&&s.order.length?s.order.slice():orderFor(s.day)).filter(function(id){return s.ex&&s.ex[id]});
    if(!s.order)(s.extra||[]).forEach(function(id){if(ids.indexOf(id)<0)ids.push(id)});
    // вправи, які вже записані в тренуванні, показуємо, навіть якщо їх прибрали з програми
    Object.keys(s.ex||{}).forEach(function(id){if(ids.indexOf(id)<0)ids.push(id)});
    return ids;
  }
  /* ---------- порядок вправ у дні ----------
     Збережений порядок (вкладка «Дні», колонка «Порядок», або на телефоні, поки не записався в таблицю),
     а якщо його немає — за тим, як часто вправу справді виконували в цей день. */
  var LSO='gym.order.v1',dayOrd={};
  try{dayOrd=JSON.parse(lsGet(LSO)||'{}')||{}}catch(e){dayOrd={}}
  function saveOrd(){lsSet(LSO,JSON.stringify(dayOrd))}
  function freqOrder(k){
    var base=dayOf(k).ids,cnt={};
    base.forEach(function(id){cnt[id]=0});
    Object.keys(sessions).forEach(function(q){
      var s=sessions[q];if(!s.finished||s.day!==k||!s.ex)return;
      base.forEach(function(id){if(s.ex[id]&&anyDone(s.ex[id]))cnt[id]++});
    });
    return base.slice().sort(function(a,b){return (cnt[b]-cnt[a])||(base.indexOf(a)-base.indexOf(b))});
  }
  function orderFor(k){
    var d=dayOf(k),base=d.ids,loc=dayOrd[k],saved=null;
    if(loc&&loc.pending)saved=loc.ids;
    else if(d.order&&d.order.length)saved=d.order;
    else if(loc)saved=loc.ids;
    if(!saved)return freqOrder(k);
    var res=saved.filter(function(id){return base.indexOf(id)>=0});
    base.forEach(function(id){if(res.indexOf(id)<0)res.push(id)});
    return res;
  }
  function saveDayOrder(k,ids){
    if(!DAYS[k]||k==='X')return Promise.resolve(false);
    var keep=ids.filter(function(id){return DAYS[k].ids.indexOf(id)>=0});
    dayOrd[k]={ids:keep,pending:true,at:Date.now()};saveOrd();
    return pushOrder(k);
  }
  function pushOrder(k){
    var o=dayOrd[k];
    if(!o||!o.pending||!cfg.url||!DAYS[k])return Promise.resolve(false);
    return api('saveDayOrder',{num:DAYS[k].num,order:o.ids}).then(function(){
      o.pending=false;DAYS[k].order=o.ids.slice();saveOrd();return true;
    },function(){return false});
  }
  restSec=parseInt(lsGet(LSR)||'90',10)||90;

  function todayISO(){var d=new Date();return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2)}
  function fmtDate(iso){return new Date(iso+'T12:00:00').toLocaleDateString(LOC,{day:'numeric',month:'short'})}
  function ago(iso){
    var a=new Date(iso+'T12:00:00'),b=new Date(todayISO()+'T12:00:00');
    var n=Math.round((b-a)/86400000);
    return n<=0?T('сьогодні'):n===1?T('вчора'):n+T(' дн. тому');
  }
  function fw(w){return String(w).replace('.',',')}
  function saveLocal(){lsSet(LS,JSON.stringify(sessions))}

  function lastDate(day){
    var d=SEED[day]||'2000-01-01';
    Object.keys(sessions).forEach(function(k){var s=sessions[k];if(s.day===day&&s.finished&&s.date>d)d=s.date});
    return d;
  }
  function nextDay(){
    return DAYKEYS.slice().sort(function(a,b){var x=lastDate(a),y=lastDate(b);return x<y?-1:x>y?1:0})[0];
  }
  function lastFinished(day){
    var best=null;
    Object.keys(sessions).forEach(function(k){var s=sessions[k];if(s.day===day&&s.finished&&(!best||s.date>best.date))best=s});
    return best;
  }
  function newSession(day){
    var prev=lastFinished(day), ex={}, ord=orderFor(day);
    ord.forEach(function(id){
      var d=EX[id];
      var p=prev&&prev.ex[id];
      if(d.t==='cardio'){ex[id]=[{done:false,v:p&&p[0]?cfVals(id,p[0]):d.cf.slice()}];return}
      ex[id]=d.s.map(function(x,i){var q=p&&(p[i]||p[p.length-1]);return {w:(q&&typeof q.w==='number')?q.w:x[1],done:false}});
    });
    var date=todayISO();
    return {key:date+'_'+day,day:day,date:date,started:Date.now(),finished:0,updated:Date.now(),ex:ex,extra:[],order:ord.slice()};
  }

  /* ---------- local storage ---------- */
  function touch(s){s.updated=Date.now();if(s.draft)return;saveLocal()}
  function touchLib(id){var d=custom[id];if(!d)return;d.updated=Date.now();saveLib()}

  /* ---------- backup to Google Sheets ---------- */
  var bk={}, bkFocus=null;
  function esc(t){return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
  function colLetter(i){var s='';i++;while(i>0){var m=(i-1)%26;s=String.fromCharCode(65+m)+s;i=Math.floor((i-1)/26)}return s}
  // Крапки замість скісних рисок, щоб Google (локаль en_US) не перетворив дату на іншу
  function sheetDate(iso){var p=iso.split('-');return p[2]+'.'+p[1]+'.'+p[0]}
  function repsOf(id,i,x){
    if(x&&x.r!=null)return x.r;
    var s=EX[id].s;return (s[i]||s[s.length-1])[0];
  }
  function anyDone(arr){return arr.some(function(x){return x.done})}
  // У таблицю пишемо виконані підходи; якщо вправу пропущено, лишаємо план (клітинка буде біла)
  function cellText(id,arr){
    var d=EX[id];
    if(d.t==='cardio')return arr[0].v?cfText(id,arr[0].v):(arr[0].txt||d.sh);
    var all=!anyDone(arr),g=[];
    arr.forEach(function(x,i){
      if(!x.done&&!all)return;
      var r=repsOf(id,i,x),l=g[g.length-1];
      if(l&&l.r===r&&l.w===x.w)l.n++;else g.push({n:1,r:r,w:x.w});
    });
    return g.map(function(x){return x.n+'*'+x.r+'*'+x.w}).join(', ');
  }
  /* ---------- Apps Script API ---------- */
  var LSC='gym.cfg.v1', cfg={url:'',token:''};
  try{var c0=JSON.parse(lsGet(LSC)||'{}');if(c0&&c0.url)cfg=c0}catch(e){}
  function saveCfg(){lsSet(LSC,JSON.stringify(cfg))}
  function apiErr(code,msg){var e=new Error(msg||code);e.code=code;return e}
  // POST з text/plain, щоб браузер не робив CORS-preflight, якого Apps Script не підтримує
  function api(action,data){
    if(!cfg.url)return Promise.reject(apiErr('no_config'));
    if(navigator.onLine===false)return Promise.reject(apiErr('offline'));
    var body={action:action,token:cfg.token};
    Object.keys(data||{}).forEach(function(k){body[k]=data[k]});
    var ctl=window.AbortController?new AbortController():null;
    var tm=ctl?setTimeout(function(){ctl.abort()},45000):null;
    return fetch(cfg.url,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(body),redirect:'follow',signal:ctl?ctl.signal:undefined})
      .then(function(r){if(!r.ok)throw apiErr('http','HTTP '+r.status);return r.text()})
      .then(function(t){
        clearTimeout(tm);
        var j;try{j=JSON.parse(t)}catch(e){throw apiErr('not_json')}
        if(!j||!j.ok)throw apiErr((j&&j.error)||'script',j&&j.message);
        return j;
      },function(e){
        clearTimeout(tm);
        if(e&&e.code)throw e;
        throw apiErr(e&&e.name==='AbortError'?'timeout':'network');
      });
  }
  function errText(e){
    var c=e&&e.code;
    if(c==='no_config')return T('Таблицю не підключено. Натисніть ⚙ угорі й вставте адресу скрипта.');
    if(c==='offline')return T('Немає інтернету. Запишу в таблицю, щойно з’явиться мережа.');
    if(c==='bad_token')return T('Ключ не збігається з ключем у скрипті. Перевірте налаштування (⚙).');
    if(c==='not_json')return T('Скрипт відповів не так, як очікувалось. Перевірте, що його опубліковано як веб-застосунок з доступом «Anyone».');
    if(c==='timeout')return T('Таблиця не відповіла вчасно. Спробуйте ще раз.');
    if(c==='network'||c==='http')return T('Не вдалося з’єднатися з таблицею. Перевірте адресу скрипта та інтернет.');
    return T('Помилка таблиці: ')+((e&&e.message)||c);
  }
  // Виконані вправи фарбуємо кольором дня, пропущені лишаємо білими з планом
  function payloadFor(s){
    var items=[];
    Object.keys(s.ex).forEach(function(id){
      var d=EX[id];if(!d)return;
      items.push({row:null,name:d.j||d.n,text:cellText(id,s.ex[id]),done:anyDone(s.ex[id])});
    });
    var taken=[];
    Object.keys(sessions).forEach(function(q){var o=sessions[q];if(o.key!==s.key&&o.sheetCol!=null)taken.push(o.sheetCol+1)});
    return {date:sheetDate(s.date),iso:s.date,col:s.sheetCol==null?null:s.sheetCol+1,fixedCol:!!s.imported,taken:taken,
      color:DAYHEX[s.day]||DAYHEX.X,items:items};
  }
  function bkInner(s){
    var b=bk[s.key];
    if(!b&&s.needSheet)b={state:'wait',msg:T('Ще не записано в таблицю.')};
    else if(!b&&s.sheetAt)b={state:'ok',msg:(s.imported?T('З таблиці, стовпець '):T('Записано в таблицю, стовпець '))+colLetter(s.sheetCol)+'.'+(s.dateFix?T(' Дата в таблиці: ')+s.rawDate+'.':'')};
    var h=b?'<p class="bkm '+b.state+'">'+esc(b.msg)+'</p>':'';
    if(!b||b.state==='err'||b.state==='wait')h+='<button class="retry" data-act="bk" data-key="'+s.key+'">'+(b&&b.state==='err'?T('Спробувати ще раз'):T('Записати в таблицю'))+'</button>';
    return h;
  }
  function setBk(k,state,msg){
    bk[k]={state:state,msg:msg};
    var el=document.getElementById('bkbox');
    if(el&&el.getAttribute('data-key')===k&&sessions[k])el.innerHTML=bkInner(sessions[k]);
  }
  function norm(t){return String(t==null?'':t).trim().toLowerCase().replace(/\s+/g,' ')}
  function backup(s){
    var k=s.key;
    if(bk[k]&&bk[k].state==='busy')return Promise.resolve(false);
    setBk(k,'busy',T('Записую в таблицю…'));
    return api('write',payloadFor(s)).then(function(j){
      s.sheetCol=j.col-1;
      (j.rows||[]).forEach(function(r){var id=nameToId(r.name);if(id&&EX[id].custom&&EX[id].row!==r.row){EX[id].row=r.row;touchLib(id)}});
      s.sheetAt=Date.now();s.needSheet=false;touch(s);
      var L=colLetter(s.sheetCol);
      delete bk[k];
      setBk(k,'ok',j.reused?T('Оновлено стовпець ')+L+T(' у таблиці.'):T('Записано в таблицю, стовпець ')+L+'.');
      return true;
    },function(e){
      setBk(k,(e.code==='offline'||e.code==='no_config')?'wait':'err',errText(e));
      return false;
    });
  }
  // Нові вправи (після завершення тренування) і завершені тренування надсилаємо в таблицю по черзі
  var syncing=false,syncAgain=false;
  function syncPending(){
    if(syncing){syncAgain=true;return Promise.resolve()}
    if(!cfg.url||navigator.onLine===false)return Promise.resolve();
    var exs=Object.keys(custom).filter(function(id){var d=custom[id];return d.ready&&!d.synced});
    var list=Object.keys(sessions).map(function(k){return sessions[k]}).filter(function(s){return s.finished&&s.needSheet});
    var ords=Object.keys(dayOrd).filter(function(k){return dayOrd[k]&&dayOrd[k].pending});
    var exd=Object.keys(exDays).filter(function(id){return exDays[id].pending&&!(custom[id]&&!custom[id].synced)});
    if(!exs.length&&!list.length&&!ords.length&&!exd.length)return Promise.resolve();
    syncing=true;
    var chain=Promise.resolve();
    exs.forEach(function(id){chain=chain.then(function(){
      var d=custom[id];if(!d)return;
      var reps=d.s.map(function(x){return x[0]}),ws=d.s.map(function(x){return x[1]});
      var same=function(a){return a.every(function(v){return v===a[0]})};
      var dnums=(d.days||[]).map(function(k){return DAYS[k]?String(DAYS[k].num):''}).filter(Boolean).join(', ');
      return api('addExercise',{row:[d.j,d.n,'сила',dnums,String(d.s.length),same(reps)?String(reps[0]):reps.join('; '),same(ws)?String(ws[0]):ws.join('; '),'',id]})
        .then(function(){d.synced=true;saveLib()},function(){});
    })});
    list.forEach(function(s){chain=chain.then(function(){return backup(s)})});
    ords.forEach(function(k){chain=chain.then(function(){return pushOrder(k)})});
    exd.forEach(function(id){chain=chain.then(function(){return pushExDays(id)})});
    var done=function(){syncing=false;if(syncAgain){syncAgain=false;syncPending()}else if(view==='home')renderHome()};
    return chain.then(done,done);
  }
  // Нові вправи йдуть у «Програму» разом із тренуванням
  function sendToSheet(s){
    if(!cfg.url){setBk(s.key,'wait',errText({code:'no_config'}));return}
    if(navigator.onLine===false){setBk(s.key,'wait',errText({code:'offline'}));return}
    syncPending();
  }
  // Програма з вкладок «Програма» і «Дні». Якщо вкладок ще немає, скрипт створює їх зі стартової програми
  var progLoading=null;
  function loadProgram(){
    if(!cfg.url||navigator.onLine===false)return Promise.resolve(false);
    if(progLoading)return progLoading;
    progLoading=api('program').then(function(j){
      if(j.missing)return api('initProgram',{progHead:PROG_HEAD,daysHead:DAYS_HEAD,days:BUILTIN.days,ex:BUILTIN.ex}).then(function(){return api('program')});
      return j;
    }).then(function(j){
      progLoading=null;
      if(!j||!j.ex||!j.ex.length)return false;
      var days=canon(j.daysHead,j.days,DAYS_HEAD);
      // старий скрипт не віддає колонку «Іконка» — беремо стандартну іконку за назвою дня
      if(!j.daysHead)days=days.map(function(r){
        var b=BUILTIN.days.filter(function(x){return normName(x[1])===normName(r[1])})[0];
        return [r[0],r[1],r[2],r[3],b?b[4]:'',''];
      });
      var p={days:days,ex:canon(j.progHead,j.ex,PROG_HEAD),at:Date.now()};
      lsSet(LSP,JSON.stringify(p));
      applyProgram(p);progAt=p.at;mergeCustom();applyExDays();
      if(view==='home')renderHome();
      return true;
    },function(){progLoading=null;return false});
    return progLoading;
  }

  /* ---------- import history (DOM + sheet) ---------- */
  var showAll=false, impState=null;
  function impInner(hasImp){
    var h='';
    if(impState)h+='<p class="bkm '+impState.state+'">'+esc(impState.msg)+'</p>';
    if(!impState||impState.state!=='busy')h+='<button class="retry" data-act="imp">'+(hasImp?T('Оновити історію з таблиці'):T('Імпортувати історію з таблиці'))+'</button>';
    return h;
  }
  function setImp(state,msg){
    impState={state:state,msg:msg};
    var el=document.getElementById('imp');
    if(el)el.innerHTML=impInner(Object.keys(sessions).some(function(k){return sessions[k].imported}));
  }
  function nameToId(nm){
    var t=norm(nm),hit=null;
    Object.keys(EX).forEach(function(id){if(!hit&&EX[id].custom&&norm(EX[id].n)===t)hit=id});
    return hit;
  }
  function importHistory(){
    if(impState&&impState.state==='busy')return;
    setImp('busy',T('Читаю таблицю…'));
    loadProgram().then(function(){return api('read')}).then(function(j){
        var g=gridFromApi(j);
        if(!g.values.length){setImp('err',T('Таблиця порожня або недоступна.'));return}
        var r=buildImported(g.values,nameToId,g.colors);
        // власні тренування з апки мають перевагу над тим самим днем з таблиці
        var mine={};
        // порожнє незавершене тренування (відкрили й нічого не відмітили) таблицю не перекриває
        Object.keys(sessions).forEach(function(k){
          var s=sessions[k];
          if(s.imported)return;
          if(!s.finished&&!setsDone(s)){if(!cur||cur.key!==k)delete sessions[k];return}
          mine[s.date+'_'+s.day]=1;if(s.sheetCol!=null)mine['c'+s.sheetCol]=1;
        });
        Object.keys(sessions).forEach(function(k){
          if(!sessions[k].imported)return;
          delete sessions[k];
        });
        var added=0,skipped=0,fixed=0;
        r.sessions.forEach(function(s){
          if(mine[s.date+'_'+s.day]||mine['c'+s.sheetCol]){skipped++;return}
          sessions[s.key]=s;added++;if(s.dateFix)fixed++;
        });
        saveLocal();
        var msg=T('Імпортовано тренувань: ')+added+T('. Незафарбовані клітинки (')+r.skipped+T(') пораховано як пропущені.');
        if(fixed)msg+=T(' Виправлено дат: ')+fixed+T(' (позначені ≈, якщо дата приблизна).');
        if(skipped)msg+=T(' Пропущено ')+skipped+T(', бо вони вже є в апці.');
        if(r.bad)msg+=T(' Не вдалося розібрати клітинок: ')+r.bad+'.';
        impState={state:'ok',msg:msg};
        if(view==='home')renderHome();
    }).catch(function(e){setImp('err',errText(e))});
  }

  /* ---------- calendar ---------- */
  var calYM=null;
  function calHTML(){
    var now=new Date();
    if(!calYM)calYM=[now.getFullYear(),now.getMonth()];
    var y=calYM[0],m=calYM[1];
    var first=new Date(y,m,1),lead=(first.getDay()+6)%7,len=new Date(y,m+1,0).getDate();
    var pre=y+'-'+('0'+(m+1)).slice(-2)+'-',byDate={},cnt=0;
    Object.keys(sessions).forEach(function(k){
      var s=sessions[k];
      if(!s.finished||s.date.indexOf(pre)!==0)return;
      (byDate[s.date]=byDate[s.date]||[]).push(s);cnt++;
    });
    var title=first.toLocaleDateString(LOC,{month:'long'});
    title=title.charAt(0).toUpperCase()+title.slice(1);
    var h=T('<div class="calh"><button class="calb" data-act="calp" aria-label="Попередній місяць">‹</button>')+
      '<div class="calt">'+title+' '+y+'<small>'+(cnt?cnt+' '+plural(cnt,T('тренування'),T('тренування'),T('тренувань')):T('без тренувань'))+'</small></div>'+
      T('<button class="calb" data-act="caln" aria-label="Наступний місяць">›</button></div><div class="calg">');
    [T('Пн'),T('Вт'),T('Ср'),T('Чт'),T('Пт'),T('Сб'),T('Нд')].forEach(function(w){h+='<div class="calw">'+w+'</div>'});
    for(var i=0;i<lead;i++)h+='<div></div>';
    var today=todayISO();
    for(var d=1;d<=len;d++){
      var iso=pre+('0'+d).slice(-2),list=byDate[iso],cls='cald'+(iso===today?' today':'');
      if(list){
        var s0=list[0],dd=dayOf(s0.day);
        h+='<button class="'+cls+' has'+(s0.dateFix==='est'?' est':'')+'" style="--dc:'+dd.color+'" data-act="open" data-key="'+s0.key+'" aria-label="'+d+' — '+esc(dd.n)+'">'+d+(list.length>1?'<i>'+list.length+'</i>':'')+'</button>';
      }else h+='<div class="'+cls+'">'+d+'</div>';
    }
    h+='</div><div class="calk">';
    DAYKEYS.forEach(function(k){h+='<span><b style="background:'+DAYS[k].color+'"></b>'+esc(DAYS[k].n)+'</span>'});
    h+='</div>';
    return h;
  }
  function plural(n,one,few,many){if(LANG==='en')return n===1?one:many;var a=n%10,b=n%100;return a===1&&b!==11?one:a>=2&&a<=4&&(b<10||b>=20)?few:many}
  function calShift(d){
    if(!calYM)return;
    var t=new Date(calYM[0],calYM[1]+d,1);calYM=[t.getFullYear(),t.getMonth()];
    var el=document.getElementById('cal');if(el)el.innerHTML=calHTML();
  }

  /* ---------- home ---------- */
  function setsDone(s){
    var n=0;Object.keys(s.ex).forEach(function(id){s.ex[id].forEach(function(x){if(x.done)n++})});return n;
  }
  function setsTotal(s){var n=0;Object.keys(s.ex).forEach(function(id){n+=s.ex[id].length});return n}
  function volume(s){
    var v=0;
    Object.keys(s.ex).forEach(function(id){
      var d=EX[id];if(!d||d.t==='cardio')return;
      s.ex[id].forEach(function(x,i){if(x.done)v+=repsOf(id,i,x)*(x.w||0)});
    });
    return Math.round(v);
  }
  function renderHome(){
    view='home';cur=null;
    var nd=nextDay(), dd=DAYS[nd], today=todayISO();
    var open=null;
    Object.keys(sessions).forEach(function(k){var s=sessions[k];if(s.date===today&&!s.finished&&(!open||s.updated>open.updated))open=s});
    var h='<div class="top"><div class="tt"><h1 class="brand">Gym Log</h1><div class="date">'+new Date().toLocaleDateString(LOC,{weekday:'long',day:'numeric',month:'long'})+T('</div></div><button class="gear" data-act="exlist" aria-label="Список вправ">☰</button><button class="gear" data-act="cfg" aria-label="Налаштування таблиці">⚙</button></div>');
    if(!cfg.url)h+=T('<button class="resume" data-act="cfg"><div><b>Підключіть таблицю</b><div class="tag">Щоб підтягнути історію й зберігати резервну копію</div></div><span>Налаштувати</span></button>');
    if(bkFocus&&sessions[bkFocus])h+='<div id="bkbox" class="bkbox" data-key="'+bkFocus+'">'+bkInner(sessions[bkFocus])+'</div>';
    if(open){
      h+='<div class="resume rs2" id="resume"><button class="rmain" data-act="open" data-key="'+open.key+T('"><div><b>Тренування триває</b><div class="tag">')+dayOf(open.day).n+' · '+setsDone(open)+T(' з ')+setsTotal(open)+T(' підходів</div></div><span>Продовжити</span></button>')+
        '<button class="rx" data-act="rdel" data-key="'+open.key+T('" aria-label="Видалити незавершене тренування">✕</button></div>');
    }
    h+='<div class="hero"><div class="big">'+badge(dd)+T('</div><div class="kick">Наступне за чергою</div><h2>')+dd.n+'</h2><div class="meta">'+dd.ids.length+T(' вправ · останнє ')+fmtDate(lastDate(nd))+'</div><button class="cta" data-act="start" data-day="'+nd+T('">Почати тренування</button></div>');
    h+=T('<div><div class="sec">Усі дні</div><div class="rows">');
    DAYKEYS.forEach(function(k){
      var d=DAYS[k],l=lastDate(k);
      h+='<button class="row'+(k===nd?' next':'')+'" data-act="preview" data-day="'+k+'"><div class="dn">'+badge(d)+'</div><div><div class="rn">'+d.n+'</div><div class="rs">'+d.sub+'</div></div><div class="rr">'+fmtDate(l)+'<br>'+ago(l)+'</div></button>';
    });
    h+='</div></div>';
    h+=T('<div><div class="sec">Календар</div><div class="cal" id="cal">')+calHTML()+'</div></div>';
    var all=Object.keys(sessions).map(function(k){return sessions[k]}).filter(function(s){return s.finished&&DAYS[s.day]}).sort(function(a,b){return a.date<b.date?1:a.date>b.date?-1:b.finished-a.finished});
    var hasImp=all.some(function(s){return s.imported});
    var fin=showAll?all:all.slice(0,12);
    h+=T('<div><div class="sec">Журнал')+(all.length?' · '+all.length:'')+'</div><div class="rows">';
    if(!fin.length)h+=T('<div class="empty">Тут з’являться завершені тренування. Щоб підтягнути всі попередні, імпортуйте їх з таблиці.</div>');
    var lastY=null;
    fin.forEach(function(s){
      var y=s.date.slice(0,4);
      if(lastY&&y!==lastY)h+='<div class="yr">'+y+'</div>';
      lastY=y;
      h+='<button class="row" data-act="open" data-key="'+s.key+'"><div class="dn">'+badge(DAYS[s.day])+'</div><div><div class="rn">'+DAYS[s.day].n+'</div><div class="rs num">'+setsDone(s)+T(' підходів · ')+volume(s).toLocaleString(LOC)+T(' кг')+(s.imported?'':s.sheetAt?T(' · в таблиці'):'')+'</div></div><div class="rr">'+(s.dateFix==='est'?'≈ ':'')+fmtDate(s.date)+(y!==todayISO().slice(0,4)?'<br>'+y:'')+'</div></button>';
    });
    h+='</div>';
    if(all.length>fin.length)h+=T('<button class="more" data-act="more">Показати всі (')+all.length+')</button>';
    h+='<div class="imp" id="imp">'+impInner(hasImp)+'</div></div>';
    var pend=Object.keys(sessions).filter(function(k){return sessions[k].finished&&sessions[k].needSheet}).length;
    h+=T('<p class="sync">Записи зберігаються на цьому телефоні. Після завершення тренування апка додає його в таблицю')+(pend?T('. Чекають на запис: ')+pend+'.':'.')+'</p>';
    app.innerHTML=h;
    window.scrollTo(0,0);
  }

  /* ---------- workout ---------- */
  function curW(arr){
    for(var i=0;i<arr.length;i++)if(!arr[i].done)return arr[i].w;
    return arr[arr.length-1].w;
  }
  // Значення кардіо: те, що ввели в апці, або розібране з журналу, або план
  function cfVals(id,e){
    var d=EX[id];
    if(e&&e.v&&e.v.length)return e.v.slice();
    var t=e&&e.txt?cfNums(e.txt):[];
    return t.length?t:(d&&d.cf?d.cf.slice():[]);
  }
  function cfText(id,v){var d=EX[id];return d&&d.min?fw(v[0]).replace(',','.')+' min':v.join('*')}
  function cardHTML(id){
    var d=EX[id],arr=cur.ex[id];
    if(!d||!arr)return '';
    if(d.t==='cardio'){
      var on=arr[0].done,cv=cfVals(id,arr[0]),f='';
      (d.lab||[T('хв')]).forEach(function(l,i){
        f+='<label class="cff" for="cf-'+id+'-'+i+'"><span>'+esc(l)+'</span><input id="cf-'+id+'-'+i+'" type="text" inputmode="decimal" autocomplete="off" value="'+(cv[i]!=null?fw(cv[i]):'')+'" data-ex="'+id+'" data-cf="'+i+'"></label>';
      });
      return '<section class="ex'+(on?' fin':'')+'" id="c-'+id+'"><div class="exh"><div>'+titleBtn(id)+(!on?'<button class="later" data-act="later" data-ex="'+id+T('">Пізніше</button>'):'')+'</div></div>'+
        '<div class="cardio'+(on?' on':'')+'"><div class="cfr">'+f+'</div>'+
        '<button class="cdone" data-act="cardio" data-ex="'+id+'" aria-pressed="'+on+'">'+(on?T('Готово ✓'):T('Позначити'))+'</button></div></section>';
    }
    var all=arr.every(function(x){return x.done});
    var mixed=arr.some(function(x){return x.w!==arr[0].w});
    var p='';
    arr.forEach(function(x,i){
      p+='<button class="plate'+(x.done?' on':'')+'" data-act="set" data-ex="'+id+'" data-i="'+i+'" aria-pressed="'+x.done+T('" aria-label="Підхід ')+(i+1)+', '+repsOf(id,i,x)+T(' повторень"><b>')+repsOf(id,i,x)+'</b>'+(mixed?'<small>'+fw(x.w)+'</small>':'')+'</button>';
    });
    return '<section class="ex'+(all?' fin':'')+'" id="c-'+id+'"><div class="exh"><div>'+titleBtn(id)+(d.tag?'<p class="tag">'+d.tag+'</p>':'')+
      (!all?'<button class="later" data-act="later" data-ex="'+id+T('">Пізніше</button>'):'')+
      ((cur.extra||[]).indexOf(id)>=0&&!arr.some(function(x){return x.done})?'<button class="rmx" data-act="rmx" data-ex="'+id+T('">Прибрати з тренування</button>'):'')+'</div>'+
      '<div class="wt"><button data-act="wm" data-ex="'+id+T('" aria-label="Менше">−</button><label><input id="w-')+id+'" type="text" inputmode="decimal" value="'+fw(curW(arr))+'" data-ex="'+id+T('" aria-label="Вага, кг"><span>кг</span></label><button data-act="wp" data-ex="')+id+T('" aria-label="Більше">+</button></div></div>')+
      '<div class="plates">'+p+'</div></section>';
  }
  function progress(){
    var d=setsDone(cur),t=setsTotal(cur);
    var c=document.getElementById('pc'),b=document.getElementById('pb');
    if(c)c.textContent=d+' / '+t;
    if(b)b.style.width=(t?d/t*100:0)+'%';
    var sm=document.getElementById('sum');
    if(sm)sm.textContent=d+T(' підходів · ')+volume(cur).toLocaleString(LOC)+T(' кг сумарно');
  }
  function renderWorkout(){
    view='workout';
    var dd=dayOf(cur.day);
    var h=T('<div class="wh"><div class="l1"><button class="back" data-act="home" aria-label="Назад">‹</button><h2>')+dd.n+T('</h2><div class="cnt num" id="pc"></div><button class="back" data-act="ord" aria-label="Змінити порядок вправ">⇅</button></div><div class="bar"><i id="pb"></i></div></div>')+
      (cur.draft?T('<div class="draft" id="draftb"><p>Перегляд. Тренування почнеться, коли натиснете кнопку або відмітите перший підхід.</p><button class="cta" data-act="begin">Почати тренування</button></div>'):'')+
      '<div class="list">';
    sIds(cur).forEach(function(id){h+=cardHTML(id)});
    h+=T('</div><button class="addx" data-act="padd">+ Додати вправу</button><button class="finish" id="finb" data-act="finish"')+(cur.draft?' hidden':'')+'>'+(cur.finished?T('Зберегти зміни'):T('Завершити тренування'))+'</button><p class="summary num" id="sum"></p><div id="bkbox" class="bkbox" data-key="'+cur.key+'">'+bkInner(cur)+'</div>';
    app.innerHTML=h;
    progress();
    window.scrollTo(0,0);
  }
  function refreshCard(id){
    var el=document.getElementById('c-'+id);
    if(el)el.outerHTML=cardHTML(id);
    progress();
  }

  /* ---------- add exercise to the current workout ---------- */
  function dayNamesFor(id){
    var r=[];DAYKEYS.forEach(function(k){if(DAYS[k].ids.indexOf(id)>=0)r.push(DAYS[k].n)});
    return r;
  }
  function libList(){
    var have={};sIds(cur).forEach(function(i){have[i]=1});
    var base=[],mine=[];
    Object.keys(EX).forEach(function(id){
      if(have[id])return;
      var d=EX[id];
      if(d.custom){if(d.ready||d.from===cur.key)mine.push(id)}
      else base.push(id);
    });
    return {base:base,mine:mine};
  }
  function pkRow(id){
    var d=EX[id],sub=d.custom?(d.s.length+'×'+d.s[0][0]+(d.s[0][1]?' · '+fw(d.s[0][1])+T(' кг'):'')+(d.ready?'':(d.days&&d.days.length&&DAYS[d.days[0]]?T(' · після завершення стане частиною дня «')+DAYS[d.days[0]].n+'»':T(' · з’явиться в списку після завершення')))):(dayNamesFor(id).join(', ')||T('без дня в програмі'));
    return '<button class="pkr" data-act="ppick" data-ex="'+id+'" data-n="'+esc(norm(d.n+' '+(d.tag||'')))+'"><span>'+esc(d.n)+'</span><small>'+esc(sub)+'</small></button>';
  }
  function openPicker(){
    if(!cur)return;
    var L=libList(),h='';
    h+=T('<div class="pkp" role="dialog" aria-label="Додати вправу"><div class="pkh"><h2>Додати вправу</h2><button class="back" data-act="pclose" aria-label="Закрити">×</button></div>');
    h+=T('<div class="pkt"><button data-act="ptab" data-tab="l" class="on">З наявних</button><button data-act="ptab" data-tab="n">Нова</button></div>');
    h+=T('<div id="pk-l"><input class="in" id="pkq" type="search" placeholder="Пошук" autocomplete="off" aria-label="Пошук вправи">');
    if(L.mine.length){h+=T('<div class="sec pks">Мої вправи</div>');L.mine.forEach(function(id){h+=pkRow(id)})}
    if(L.base.length){h+=T('<div class="sec pks">Інші дні</div>');L.base.forEach(function(id){h+=pkRow(id)})}
    if(!L.mine.length&&!L.base.length)h+=T('<p class="empty">Усі наявні вправи вже в цьому тренуванні.</p>');
    h+='</div>';
    h+=T('<div id="pk-n" class="pkf" hidden><label for="nn">Назва<input class="in" id="nn" type="text" maxlength="60" autocomplete="off" placeholder="Наприклад, молоткові згинання"></label>')+
       T('<div class="pkg"><label for="ns">Підходи<input class="in" id="ns" type="number" inputmode="numeric" min="1" max="10" value="3"></label>')+
       T('<label for="nr">Повтори<input class="in" id="nr" type="number" inputmode="numeric" min="1" max="100" value="10"></label>')+
       T('<label for="nw">Вага, кг<input class="in" id="nw" type="text" inputmode="decimal" value="0"></label></div>')+
       '<p class="pkerr" id="pkerr" role="alert"></p>'+
       T('<button class="cta" type="button" data-act="pnew">Створити й додати</button>')+
       '<p class="sync">'+(cur.day!=='X'&&DAYS[cur.day]?T('Коли ви завершите тренування, вправа стане частиною дня «')+esc(DAYS[cur.day].n)+T('» і з’явиться у вкладці «Програма».'):T('Коли ви завершите тренування, вправа з’явиться у вкладці «Програма» (без дня).'))+T(' У журналі для неї додасться окремий рядок.</p></div></div>');
    pk.innerHTML=h;pk.hidden=false;
  }
  function closePicker(){pk.hidden=true;pk.innerHTML=''}
  function pickTab(t){
    var l=document.getElementById('pk-l'),n=document.getElementById('pk-n');
    if(!l||!n)return;
    l.hidden=t!=='l';n.hidden=t!=='n';
    pk.querySelectorAll('.pkt button').forEach(function(b){b.classList.toggle('on',b.getAttribute('data-tab')===t)});
    if(t==='n'){var nn=document.getElementById('nn');if(nn)try{nn.focus()}catch(e){}}
  }
  function lastSetsFor(id){
    var best=null;
    Object.keys(sessions).forEach(function(k){
      var s=sessions[k];
      if(s===cur||!s.ex||!s.ex[id])return;
      if(!best||s.updated>best.updated)best=s;
    });
    return best&&best.ex[id];
  }
  function addEx(id){
    if(!cur||!EX[id]||cur.ex[id])return;
    var d=EX[id],p=lastSetsFor(id);
    if(d.t==='cardio')cur.ex[id]=[{done:false,v:p&&p[0]?cfVals(id,p[0]):d.cf.slice()}];
    else cur.ex[id]=d.s.map(function(x,i){return {w:(p&&p[i]&&typeof p[i].w==='number')?p[i].w:x[1],done:false}});
    cur.extra=(cur.extra||[]).concat([id]);
    cur.order=sIds(cur).filter(function(x){return x!==id}).concat([id]);
    touch(cur);
    var list=document.querySelector('.list');
    if(list)list.insertAdjacentHTML('beforeend',cardHTML(id));
    progress();
    var el=document.getElementById('c-'+id);
    if(el&&el.scrollIntoView)try{el.scrollIntoView({behavior:'smooth',block:'center'})}catch(e){}
  }
  function removeEx(id){
    if(!cur||!cur.ex[id]||(cur.extra||[]).indexOf(id)<0)return;
    if(cur.ex[id].some(function(x){return x.done}))return;
    delete cur.ex[id];
    cur.extra=cur.extra.filter(function(x){return x!==id});
    if(cur.order)cur.order=cur.order.filter(function(x){return x!==id});
    var d=custom[id];
    if(d&&d.from===cur.key&&!d.ready){
      delete custom[id];delete EX[id];saveLib();
    }
    touch(cur);
    var el=document.getElementById('c-'+id);if(el)el.remove();
    progress();
  }
  function createEx(){
    var err=document.getElementById('pkerr');
    var nm=String((document.getElementById('nn')||{}).value||'').trim().replace(/\s+/g,' ');
    var n=Math.min(10,Math.max(1,parseInt((document.getElementById('ns')||{}).value,10)||3));
    var r=Math.min(100,Math.max(1,parseInt((document.getElementById('nr')||{}).value,10)||10));
    var w=parseFloat(String((document.getElementById('nw')||{}).value||'0').replace(',','.'));
    if(isNaN(w)||w<0)w=0;
    if(!nm){if(err)err.textContent=T('Введіть назву вправи.');return}
    var clash=Object.keys(EX).some(function(id){return norm(EX[id].n)===norm(nm)});
    if(clash){if(err)err.textContent=T('Вправа з такою назвою вже є. Знайдіть її у вкладці «З наявних».');return}
    var id='x'+Date.now().toString(36);
    // нова вправа належить дню, в якому її створили
    var d={n:nm,j:nm,days:(DAYS[cur.day]&&cur.day!=='X')?[cur.day]:[],s:S(n,r,w),custom:1,from:cur.key,ready:false};
    custom[id]=d;EX[id]=d;touchLib(id);
    addEx(id);closePicker();
  }

  /* ---------- settings ---------- */
  function openSettings(){
    pk.innerHTML=T('<div class="pkp" role="dialog" aria-label="Налаштування таблиці"><div class="pkh"><h2>Таблиця</h2><button class="back" data-act="pclose" aria-label="Закрити">×</button></div>')+
      T('<div class="pkf"><label for="cu">Адреса скрипта (Web app URL)<input class="in" id="cu" type="url" inputmode="url" autocomplete="off" spellcheck="false" placeholder="https://script.google.com/macros/s/…/exec" value="')+esc(cfg.url)+'"></label>'+
      T('<label for="ct">Ключ із скрипта<input class="in" id="ct" type="text" autocomplete="off" spellcheck="false" value="')+esc(cfg.token)+'"></label>'+
      '<p class="pkerr" id="cerr" role="status"></p>'+
      T('<button class="cta" type="button" data-act="csave">Зберегти й перевірити</button>')+
      T('<p class="sync">Адреса й ключ зберігаються тільки на цьому пристрої. Як їх отримати, описано в README репозиторію.</p></div>')+
      T('<div class="pkf upd"><div class="sec">Апка</div><p class="sync">Версія ')+APP_VERSION+T('. Якщо після змін нова версія не з’явилась, оновіть вручну. Тренування й налаштування залишаться.</p>')+
      T('<button class="retry" type="button" data-act="upd" id="updb">Оновити апку</button></div>')+
      '<div class="pkf upd"><div class="sec">Мова · Language</div><div class="langs">'+
      '<button class="retry'+(LANG==='uk'?' on':'')+'" type="button" data-act="lang" data-l="uk">Українська</button>'+
      '<button class="retry'+(LANG==='en'?' on':'')+'" type="button" data-act="lang" data-l="en">English</button></div></div></div>';
    pk.hidden=false;
  }
  function saveSettings(){
    var u=String(document.getElementById('cu').value||'').trim(),t=String(document.getElementById('ct').value||'').trim(),m=document.getElementById('cerr');
    m.className='pkerr';
    if(!/^https:\/\/script\.google\.com\/(a\/[^\/]+\/)?macros\/s\/[^\/]+\/exec$/.test(u)){m.textContent=T('Адреса має виглядати так: https://script.google.com/macros/s/…/exec');return}
    if(!t){m.textContent=T('Вставте ключ, який ви вписали в скрипт.');return}
    cfg={url:u,token:t};saveCfg();
    m.textContent=T('Перевіряю…');
    api('ping').then(function(j){
      m.className='pkerr okc';
      m.textContent=T('З’єднано з таблицею «')+(j.title||'')+T('». Завантажую програму…');
      loadProgram().then(function(ok){
        m.textContent=T('З’єднано з таблицею «')+(j.title||'')+'».'+(ok?T(' Програму завантажено з вкладки «Програма».'):'');
        syncPending();
      });
    },function(e){m.textContent=errText(e)});
  }

  // Примусове оновлення: прибираємо старий кеш і service worker, тягнемо файли заново з мережі.
  // Дані в localStorage (тренування, налаштування) не чіпаємо.
  function updateApp(){
    var b=document.getElementById('updb');
    if(b){b.disabled=true;b.textContent=T('Оновлюю…')}
    var p=Promise.resolve();
    try{if('serviceWorker' in navigator)p=navigator.serviceWorker.getRegistrations().then(function(rs){return Promise.all(rs.map(function(r){return r.unregister()}))})}catch(e){}
    p.then(function(){return window.caches?caches.keys().then(function(ks){return Promise.all(ks.map(function(k){return caches.delete(k)}))}):null})
     .then(function(){return Promise.all(['./','index.html','app.css','app.js','sw.js','manifest.webmanifest'].map(function(u){return fetch(u,{cache:'reload'}).catch(function(){})}))})
     .catch(function(){})
     .then(function(){location.reload()});
  }

  /* ---------- зміна порядку вправ ---------- */
  function openOrder(){
    if(!cur)return;
    var ids=sIds(cur),h=T('<div class="pkp" role="dialog" aria-label="Порядок вправ"><div class="pkh"><h2>Порядок вправ</h2><button class="back" data-act="odone" aria-label="Готово">×</button></div><div class="olist">');
    ids.forEach(function(id,i){
      var d=EX[id];if(!d)return;
      h+='<div class="orow'+(anyDone(cur.ex[id])?' odone':'')+'" data-id="'+id+'"><span class="odrag" aria-hidden="true">≡</span><span class="on num">'+(i+1)+'</span><span class="onm">'+esc(d.n)+'</span>'+
        '<button class="ob" data-act="omv" data-ex="'+id+T('" data-d="-1" aria-label="Вище"')+(i===0?' disabled':'')+'>↑</button>'+
        '<button class="ob" data-act="omv" data-ex="'+id+T('" data-d="1" aria-label="Нижче"')+(i===ids.length-1?' disabled':'')+'>↓</button></div>';
    });
    h+=T('</div><button class="retry" data-act="ofreq">Як найчастіше виконую</button>')+
      (cur.day!=='X'?T('<button class="cta" data-act="osave">Зберегти для наступних тренувань «')+esc(dayOf(cur.day).n)+'»</button>':'')+
      '<p class="pkerr" id="omsg" role="status"></p>'+
      T('<p class="sync">Перетягуйте вправи за ≡ або стрілками. Без збереження зміни діють лише в цьому тренуванні. «Як найчастіше виконую» ставить нагору вправи, які ви робите найчастіше, а пропущені — вниз.</p></div>');
    pk.innerHTML=h;pk.hidden=false;
  }
  function moveOrd(id,dir){
    var ids=sIds(cur),i=ids.indexOf(id),j=i+dir;
    if(i<0||j<0||j>=ids.length)return;
    ids.splice(i,1);ids.splice(j,0,id);cur.order=ids;touch(cur);
    var y=pk.querySelector('.pkp')?pk.querySelector('.pkp').scrollTop:0;
    openOrder();
    var p2=pk.querySelector('.pkp');if(p2)p2.scrollTop=y;
    var btn=pk.querySelector('[data-act="omv"][data-ex="'+id+'"][data-d="'+dir+'"]');if(btn&&!btn.disabled)try{btn.focus({preventScroll:true})}catch(e){}
  }
  function beginDraft(rerender){
    if(!cur||!cur.draft)return;
    delete cur.draft;cur.started=Date.now();sessions[cur.key]=cur;touch(cur);
    var db=document.getElementById('draftb');if(db)db.remove();
    var fb=document.getElementById('finb');if(fb)fb.hidden=false;
    if(rerender)renderWorkoutKeep();
  }
  // перетягування за ручку ≡ у вікні «Порядок вправ»
  pk.addEventListener('pointerdown',function(e){
    var hd=e.target.closest&&e.target.closest('.odrag');if(!hd||!cur)return;
    var row=hd.closest('.orow'),list=row.parentNode,rows=[].slice.call(list.querySelectorAll('.orow'));
    var from=rows.indexOf(row),to=from,y0=e.clientY,rh=row.getBoundingClientRect().height,scroller=pk.querySelector('.pkp'),st0=scroller?scroller.scrollTop:0;
    e.preventDefault();
    try{hd.setPointerCapture(e.pointerId)}catch(er){}
    row.classList.add('drag');
    function mv(ev){
      var dy=ev.clientY-y0;
      row.style.transform='translateY('+dy+'px)';
      to=Math.max(0,Math.min(rows.length-1,from+Math.round(dy/rh)));
      rows.forEach(function(r,i){
        if(r===row)return;
        var sh=(from<to&&i>from&&i<=to)?-rh:(from>to&&i<from&&i>=to)?rh:0;
        r.style.transform=sh?'translateY('+sh+'px)':'';
      });
    }
    function up(){
      hd.removeEventListener('pointermove',mv);hd.removeEventListener('pointerup',up);hd.removeEventListener('pointercancel',up);
      if(to!==from){
        var ids=rows.map(function(r){return r.getAttribute('data-id')}),id=ids.splice(from,1)[0];
        ids.splice(to,0,id);
        sIds(cur).forEach(function(x){if(ids.indexOf(x)<0)ids.push(x)});
        cur.order=ids;touch(cur);
      }
      openOrder();
      var p2=pk.querySelector('.pkp');if(p2)p2.scrollTop=st0;
    }
    hd.addEventListener('pointermove',mv);hd.addEventListener('pointerup',up);hd.addEventListener('pointercancel',up);
  });
  function renderWorkoutKeep(){var y=window.scrollY;renderWorkout();window.scrollTo(0,y)}

  /* ---------- екран «Вправи» ---------- */
  function exSummary(id){
    var d=EX[id];if(!d)return '';
    if(d.t==='cardio')return (d.lab||[]).map(function(l,i){return l+' '+(d.cf[i]!=null?fw(d.cf[i]):'')}).join(' · ');
    var w=d.s.map(function(x){return x[1]}),same=w.every(function(v){return v===w[0]});
    return d.s.length+'×'+d.s[0][0]+(w[0]||!same?' · '+(same?fw(w[0]):w.map(fw).join('/'))+T(' кг'):'');
  }
  function lastDoneDate(id){
    var best=null;
    Object.keys(sessions).forEach(function(k){var s=sessions[k];if(s.finished&&s.ex&&s.ex[id]&&anyDone(s.ex[id])&&(!best||s.date>best))best=s.date});
    return best;
  }
  function exRow(id){
    var d=EX[id],l=lastDoneDate(id);
    return '<button class="row exr" data-act="info" data-ex="'+id+'" data-n="'+esc(normName(d.n+' '+(d.j||'')+' '+(d.tag||'')))+'">'+
      '<div class="exi">'+(window.GymAnim&&GymAnim.has(id)?'<span class="dot" aria-hidden="true">▶</span>':'')+'</div>'+
      '<div><div class="rn">'+esc(d.n)+'</div><div class="rs">'+esc(exSummary(id))+'</div></div>'+
      '<div class="rr">'+(l?fmtDate(l)+(l.slice(0,4)!==todayISO().slice(0,4)?'<br>'+l.slice(0,4):''):'—')+'</div></button>';
  }
  function renderExList(){
    view='exlist';cur=null;
    var h='<div class="wh"><div class="l1"><button class="back" data-act="home" aria-label="'+T('Назад')+'">‹</button><h2>'+T('Вправи')+'</h2></div></div>'+
      '<input class="in" id="exq" type="search" placeholder="'+T('Пошук вправи')+'" autocomplete="off" aria-label="'+T('Пошук вправи')+'">';
    var seen={};
    DAYKEYS.forEach(function(k){
      var ids=orderFor(k);if(!ids.length)return;
      h+='<div class="exg"><div class="sec exh2"><span class="dn">'+badge(DAYS[k])+'</span>'+esc(DAYS[k].n)+'</div><div class="rows">';
      ids.forEach(function(id){if(EX[id]){h+=exRow(id);seen[id]=1}});
      h+='</div></div>';
    });
    var rest=Object.keys(EX).filter(function(id){return !seen[id]&&(!EX[id].custom||EX[id].ready)});
    if(rest.length){
      h+='<div class="exg"><div class="sec">'+T('Без дня')+'</div><div class="rows">';
      rest.forEach(function(id){h+=exRow(id)});
      h+='</div></div>';
    }
    h+='<p class="sync">'+T('Натисніть на вправу, щоб побачити схему руху, медіа й останні результати. Програму можна змінити у вкладці «Програма» таблиці.')+'</p>';
    app.innerHTML=h;window.scrollTo(0,0);
  }

  /* ---------- деталі вправи ---------- */
  function titleBtn(id){
    var d=EX[id];
    return '<h3><button class="ttl" data-act="info" data-ex="'+id+'">'+esc(d.n)+'<span class="inf" aria-hidden="true">i</span></button></h3>';
  }
  // Посилання з колонки «Медіа»: картинка/GIF, відео-файл, YouTube або Google Drive (через пробіл можна кілька)
  function mediaHTML(raw){
    var h='';
    String(raw||'').split(/\s+/).forEach(function(u){
      if(!/^https?:\/\//i.test(u))return;
      var m=u.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=\w+&)?id=)([\w-]+)/);
      if(m)u='https://drive.google.com/thumbnail?id='+m[1]+'&sz=w1000';
      if(/youtube\.com|youtu\.be|vimeo\.com|instagram\.com|tiktok\.com/i.test(u))h+='<a class="retry mlink" href="'+esc(u)+T('" target="_blank" rel="noopener">▶ Відкрити відео</a>');
      else if(/\.(mp4|webm|mov)(\?|#|$)/i.test(u))h+='<video class="media" src="'+esc(u)+'" autoplay loop muted playsinline></video>';
      else h+='<img class="media" src="'+esc(u)+'" alt="" loading="lazy">';
    });
    return h;
  }
  // анімація крутиться, поки відкрите вікно вправи
  var animRaf=0;
  function playAnim(id){
    cancelAnimationFrame(animRaf);
    var t0=performance.now(),PER=2600,reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
    (function step(now){
      var el=document.getElementById('animv');
      if(!el||pk.hidden)return;
      el.innerHTML=GymAnim.frame(id,reduce?0.5:((now-t0)%PER)/PER);
      if(!reduce)animRaf=requestAnimationFrame(step);
    })(t0);
  }
  function exHistory(id){
    return Object.keys(sessions).map(function(k){return sessions[k]})
      .filter(function(s){return s.finished&&s.ex&&s.ex[id]&&anyDone(s.ex[id])})
      .sort(function(a,b){return a.date<b.date?1:-1}).slice(0,6);
  }
  function openInfo(id){
    var d=EX[id];if(!d)return;
    var q=(String(d.j||d.n).split('/')[0].replace(/\(.*?\)/g,'').trim()||d.n)+' exercise';
    var h='<div class="pkp" role="dialog" aria-label="'+esc(d.n)+'"><div class="pkh"><h2>'+esc(d.n)+T('</h2><button class="back" data-act="pclose" aria-label="Закрити">×</button></div>');
    var sub=[];
    if(d.j&&normName(d.j)!==normName(d.n))sub.push(d.j);
    if(d.tag&&normName(d.tag)!==normName(d.j))sub.push(d.tag);
    if(sub.length)h+='<p class="sync">'+esc(sub.join(' · '))+'</p>';
    var hasAnim=!!(window.GymAnim&&GymAnim.has(id)),md=mediaHTML(d.media);
    var col=cur&&DAYS[cur.day]&&cur.day!=='X'?DAYS[cur.day].color:(EX[id].days&&EX[id].days[0]&&DAYS[EX[id].days[0]]?DAYS[EX[id].days[0]].color:'var(--accent)');
    if(hasAnim)h+='<div class="animbox" style="color:'+col+'"><div id="animv">'+GymAnim.frame(id,0)+'</div></div>';
    if(md)h+='<div class="mbox">'+md+'</div>';
    else h+='<p class="sync">'+(hasAnim?T('Схема руху. '):'')+T('Фото свого тренажера, GIF чи відео можна додати у вкладці «Програма», колонка «Медіа».</p>');
    h+='<a class="retry mlink" href="https://www.youtube.com/results?search_query='+encodeURIComponent(q)+T('" target="_blank" rel="noopener">Знайти відео на YouTube</a>');
    // у які дні входить вправа
    h+='<div class="sec pks">'+T('Дні тренувань')+'</div><div class="chips">';
    DAYKEYS.forEach(function(k){
      var on=(d.days||[]).indexOf(k)>=0;
      h+='<button class="chip'+(on?' on':'')+'" style="--dc:'+DAYS[k].color+'" data-act="exday" data-ex="'+id+'" data-day="'+k+'" aria-pressed="'+on+'">'+esc(DAYS[k].n)+'</button>';
    });
    h+='</div><p class="pkerr" id="exdmsg" role="status"></p>';
    if(cur&&view==='workout'&&!cur.ex[id])h+='<button class="cta" data-act="exadd" data-ex="'+id+'">'+T('Додати в це тренування')+'</button>';
    var hist=exHistory(id);
    if(hist.length){
      h+=T('<div class="sec pks">Останні результати</div><div class="hist">');
      hist.forEach(function(s){h+='<div class="hrow"><span>'+fmtDate(s.date)+(s.date.slice(0,4)!==todayISO().slice(0,4)?' '+s.date.slice(0,4):'')+'</span><b class="num">'+esc(cellText(id,s.ex[id]))+'</b></div>'});
      h+='</div>';
    }
    h+='</div>';
    pk.innerHTML=h;pk.hidden=false;
    if(hasAnim)playAnim(id);
    // зламане посилання: замість порожньої рамки — пояснення
    pk.querySelectorAll('img.media,video.media').forEach(function(el){el.addEventListener('error',function(){
      var p=document.createElement('p');p.className='sync';p.textContent=T('Не вдалося показати медіа за посиланням. Перевірте, що воно відкривається без входу.');el.replaceWith(p);
    })});
  }

  /* ---------- rest timer ---------- */
  var restEnd=0,restIv=null,actx=null,restEl=document.getElementById('rest');
  function mmss(s){return Math.floor(s/60)+':'+('0'+(s%60)).slice(-2)}
  function ensureAudio(){
    try{
      actx=actx||new (window.AudioContext||window.webkitAudioContext)();
      if(actx.state==='suspended')actx.resume();
    }catch(e){}
  }
  function beep(){
    try{
      ensureAudio();
      var o=actx.createOscillator(),g=actx.createGain();
      o.connect(g);g.connect(actx.destination);o.frequency.value=880;
      g.gain.setValueAtTime(.18,actx.currentTime);
      g.gain.exponentialRampToValueAtTime(.001,actx.currentTime+.6);
      o.start();o.stop(actx.currentTime+.6);
    }catch(e){}
    try{if(navigator.vibrate)navigator.vibrate([200,100,200])}catch(e){}
  }
  function tick(){
    var left=Math.ceil((restEnd-Date.now())/1000);
    var t=document.getElementById('restT'),l=document.getElementById('restL');
    if(left>0){t.textContent=mmss(left);l.textContent=T('відпочинок');restEl.classList.remove('over');return}
    if(!restEl.classList.contains('over')){
      restEl.classList.add('over');t.textContent='0:00';l.textContent=T('час наступного підходу');beep();
      clearInterval(restIv);restIv=null;
      setTimeout(function(){if(restEl.classList.contains('over'))hideRest()},8000);
    }
  }
  function startRest(sec){
    ensureAudio();
    restEnd=Date.now()+(sec||restSec)*1000;
    restEl.hidden=false;restEl.classList.remove('over');
    if(restIv)clearInterval(restIv);
    restIv=setInterval(tick,250);tick();
  }
  function hideRest(){restEl.hidden=true;restEl.classList.remove('over');if(restIv){clearInterval(restIv);restIv=null}}
  function adjustRest(d){
    if(restEl.classList.contains('over')){startRest(Math.max(15,d));return}
    restEnd+=d*1000;restSec=Math.max(15,restSec+d);lsSet(LSR,String(restSec));tick();
  }

  /* ---------- wake lock ---------- */
  var wl=null;
  function lock(){try{if(navigator.wakeLock&&!wl){navigator.wakeLock.request('screen').then(function(x){wl=x;x.addEventListener('release',function(){wl=null})}).catch(function(){})}}catch(e){}}
  document.addEventListener('visibilitychange',function(){if(!document.hidden&&view==='workout')lock();if(!document.hidden&&restIv)tick()});

  /* ---------- actions ---------- */
  function openSession(s){cur=s;renderWorkout();lock()}
  function stepWeight(id,dir){
    var arr=cur.ex[id],w=Math.max(0,Math.round((curW(arr)+dir)*100)/100);
    arr.forEach(function(x){if(!x.done)x.w=w});
    if(arr.every(function(x){return x.done}))arr[arr.length-1].w=w;
    touch(cur);refreshCard(id);
  }
  function onClick(e){
    if(e.target===pk){var wasOrd=!!pk.querySelector('.olist');closePicker();if(wasOrd&&view==='workout')renderWorkoutKeep();return}
    var b=e.target.closest('[data-act]');
    if(!b||b.tagName==='INPUT')return;
    var act=b.getAttribute('data-act'),id=b.getAttribute('data-ex');
    // перший відмічений підхід у перегляді теж починає тренування
    if(cur&&cur.draft&&(act==='set'||act==='cardio')){beginDraft(false)}
    if(act==='start'||act==='preview'){
      var day=b.getAttribute('data-day'),key=todayISO()+'_'+day;
      var s=sessions[key];
      if(!s){
        s=newSession(day);
        // перегляд дня нічого не зберігає, поки не натиснете «Почати тренування»
        if(act==='preview')s.draft=true;else{sessions[key]=s;touch(s)}
      }
      openSession(s);
    }else if(act==='begin'){beginDraft(true)}
    else if(act==='open'){
      var s2=sessions[b.getAttribute('data-key')];if(s2)openSession(s2);
    }else if(act==='home'){hideRest();renderHome()}
    else if(act==='set'){
      var i=parseInt(b.getAttribute('data-i'),10),x=cur.ex[id][i];
      x.done=!x.done;if(x.done)x.t=Date.now();else delete x.t;touch(cur);refreshCard(id);
      var focusSel='#c-'+id+' .plate[data-i="'+i+'"]';
      var nb=document.querySelector(focusSel);if(nb&&document.activeElement!==nb)try{nb.focus({preventScroll:true})}catch(er){}
      if(x.done&&setsDone(cur)<setsTotal(cur))startRest();
      else if(!x.done)hideRest();
    }else if(act==='cardio'){
      var c=cur.ex[id][0];c.done=!c.done;if(c.done)c.t=Date.now();else delete c.t;touch(cur);refreshCard(id);
    }else if(act==='wm')stepWeight(id,-1);
    else if(act==='wp')stepWeight(id,1);
    else if(act==='finish'){
      var fs=cur;
      // нові вправи, створені в цьому тренуванні, стають доступними для всіх тренувань
      (fs.extra||[]).forEach(function(xid){var xd=custom[xid];if(xd&&xd.from===fs.key&&!xd.ready){xd.ready=true;touchLib(xid)}});
      mergeCustom();
      fs.finished=fs.finished||Date.now();fs.needSheet=true;touch(fs);hideRest();
      bkFocus=fs.key;renderHome();sendToSheet(fs);
    }else if(act==='bk'){
      var bs=sessions[b.getAttribute('data-key')]||cur;
      if(bs){bs.needSheet=true;saveLocal();bkFocus=bs.key;sendToSheet(bs)}
    }else if(act==='padd')openPicker();
    else if(act==='pclose')closePicker();
    else if(act==='ptab')pickTab(b.getAttribute('data-tab'));
    else if(act==='ppick'){addEx(id);closePicker()}
    else if(act==='pnew')createEx();
    else if(act==='rmx')removeEx(id);
    else if(act==='imp')importHistory();
    else if(act==='cfg')openSettings();
    else if(act==='csave')saveSettings();
    else if(act==='upd')updateApp();
    else if(act==='exlist')renderExList();
    else if(act==='exday'){
      var dk=b.getAttribute('data-day'),ed=EX[id];if(!ed)return;
      var keys=(ed.days||[]).slice(),ix=keys.indexOf(dk);
      if(ix>=0)keys.splice(ix,1);else keys.push(dk);
      keys.sort(function(a,c){return DAYKEYS.indexOf(a)-DAYKEYS.indexOf(c)});
      setDays(id,keys);
      if(custom[id]){custom[id].days=keys.slice();saveLib()}
      exDays[id]={days:keys,pending:true,at:Date.now()};saveExDays();
      var keepScroll=pk.querySelector('.pkp')?pk.querySelector('.pkp').scrollTop:0;
      openInfo(id);
      var pp=pk.querySelector('.pkp');if(pp)pp.scrollTop=keepScroll;
      var msg=document.getElementById('exdmsg');
      if(msg){msg.className='pkerr';msg.textContent=T('Збережено. Записую в таблицю…')}
      (custom[id]&&!custom[id].synced?Promise.resolve(false):pushExDays(id)).then(function(ok){
        var m=document.getElementById('exdmsg');if(!m)return;
        m.className='pkerr okc';
        m.textContent=ok?T('Записано у вкладку «Програма».'):T('Збережено на телефоні. У таблицю запишеться, коли оновите скрипт або з’явиться мережа.');
      });
      if(view==='exlist'){var y0=window.scrollY;renderExList();window.scrollTo(0,y0)}
    }
    else if(act==='exadd'){closePicker();addEx(id)}
    else if(act==='lang'){try{localStorage.setItem('gym.lang.v1',b.getAttribute('data-l'))}catch(e){}location.reload()}
    else if(act==='info')openInfo(id);
    else if(act==='later'){
      // тренажер зайнятий: вправа йде в кінець списку цього тренування
      cur.order=sIds(cur).filter(function(x){return x!==id}).concat([id]);touch(cur);
      var el=document.getElementById('c-'+id),lst=document.querySelector('.list');
      if(el&&lst){lst.appendChild(el);el.outerHTML=cardHTML(id)}
    }
    else if(act==='ord')openOrder();
    else if(act==='omv'){moveOrd(id,parseInt(b.getAttribute('data-d'),10))}
    else if(act==='ofreq'){cur.order=freqOrder(cur.day).filter(function(x){return cur.ex[x]});sIds(cur).forEach(function(x){if(cur.order.indexOf(x)<0)cur.order.push(x)});touch(cur);openOrder()}
    else if(act==='osave'){
      var om=document.getElementById('omsg');if(om){om.className='pkerr';om.textContent=T('Зберігаю…')}
      saveDayOrder(cur.day,sIds(cur)).then(function(ok){
        var m2=document.getElementById('omsg');if(!m2)return;
        m2.className='pkerr okc';
        m2.textContent=ok?T('Збережено. Наступні тренування цього дня йтимуть у такому порядку.'):T('Збережено на телефоні. У таблицю запишеться, коли оновите скрипт.');
      });
    }
    else if(act==='odone'){closePicker();renderWorkoutKeep()}
    else if(act==='rdel'){
      // підтвердження прямо в картці, без системних діалогів
      var rc=document.getElementById('resume'),dk=b.getAttribute('data-key'),ds=sessions[dk];
      if(rc&&ds)rc.innerHTML=T('<div class="rq"><b>Видалити незавершене тренування?</b><div class="tag">')+esc(dayOf(ds.day).n)+T(' · відмічено підходів: ')+setsDone(ds)+T('. У таблиці нічого не зміниться.</div></div>')+
        T('<div class="rqb"><button class="retry" data-act="rdelno">Ні</button><button class="retry danger" data-act="rdelyes" data-key="')+dk+T('">Видалити</button></div>');
    }
    else if(act==='rdelno')renderHome();
    else if(act==='rdelyes'){
      var xk=b.getAttribute('data-key');
      if(sessions[xk]&&!sessions[xk].finished){delete sessions[xk];saveLocal()}
      renderHome();
      // сьогоднішнє тренування, якщо воно вже є в таблиці, підтягнеться звідти
      if(cfg.url)importHistory();
    }
    else if(act==='calp')calShift(-1);
    else if(act==='caln')calShift(1);
    else if(act==='more'){showAll=true;var y=window.scrollY;renderHome();window.scrollTo(0,y)}
  }
  app.addEventListener('click',onClick);
  app.addEventListener('input',function(e){
    if(e.target.id!=='exq')return;
    var q=normName(e.target.value);
    app.querySelectorAll('.exr').forEach(function(r){r.hidden=!!q&&r.getAttribute('data-n').indexOf(q)<0});
    app.querySelectorAll('.exg').forEach(function(g){g.hidden=!g.querySelector('.exr:not([hidden])')});
  });
  pk.addEventListener('click',onClick);
  pk.addEventListener('input',function(e){
    if(e.target.id!=='pkq')return;
    var q=norm(e.target.value);
    pk.querySelectorAll('.pkr').forEach(function(r){r.hidden=!!q&&r.getAttribute('data-n').indexOf(q)<0});
  });
  app.addEventListener('change',function(e){
    var el=e.target;
    if(el.tagName!=='INPUT'||!cur)return;
    var id=el.getAttribute('data-ex'),v=parseFloat(String(el.value).replace(',','.'));
    if(!id||!cur.ex[id])return;
    if(el.hasAttribute('data-cf')){
      var ce=cur.ex[id][0],ci=parseInt(el.getAttribute('data-cf'),10),cv=cfVals(id,ce);
      if(isNaN(v)||v<0){el.value=cv[ci]!=null?fw(cv[ci]):'';return}
      cv[ci]=v;ce.v=cv;delete ce.txt;touch(cur);
      return;
    }
    if(isNaN(v)||v<0){el.value=fw(curW(cur.ex[id]));return}
    var arr=cur.ex[id];
    arr.forEach(function(x){if(!x.done)x.w=v});
    if(arr.every(function(x){return x.done}))arr[arr.length-1].w=v;
    touch(cur);refreshCard(id);
  });
  restEl.addEventListener('click',function(e){
    var b=e.target.closest('[data-act]');if(!b)return;
    var a=b.getAttribute('data-act');
    if(a==='rm')adjustRest(-15);else if(a==='rp')adjustRest(15);else if(a==='rs')hideRest();
  });

  renderHome();
  // статичні написи з index.html
  document.documentElement.lang=LANG;
  if(LANG==='en'){
    var rl=document.getElementById('restL');if(rl)rl.textContent='rest';
    [['rm','Minus 15 seconds'],['rp','Plus 15 seconds']].forEach(function(x){var el=restEl.querySelector('[data-act="'+x[0]+'"]');if(el)el.setAttribute('aria-label',x[1])});
    var nx=restEl.querySelector('[data-act="rs"]');if(nx)nx.textContent='Next';
  }
  // Офлайн-режим і запис того, що не дійшло до таблиці
  // гортання місяців свайпом по календарю
  var tx=null,ty=null;
  app.addEventListener('touchstart',function(e){var c=e.target.closest&&e.target.closest('#cal');if(!c||e.touches.length!==1){tx=null;return}tx=e.touches[0].clientX;ty=e.touches[0].clientY},{passive:true});
  var sx=null,sy=null;
  app.addEventListener('touchstart',function(e){
    if(e.touches.length!==1||(e.target.closest&&e.target.closest('#cal,input,.orow'))){sx=null;return}
    sx=e.touches[0].clientX;sy=e.touches[0].clientY;
  },{passive:true});
  app.addEventListener('touchend',function(e){
    if(sx==null)return;
    var t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;sx=null;
    if(Math.abs(dx)<70||Math.abs(dx)<Math.abs(dy)*1.8||!pk.hidden)return;
    if(view==='home'&&dx>0)renderExList();
    else if(view==='exlist'&&dx<0)renderHome();
  },{passive:true});
  app.addEventListener('touchend',function(e){
    if(tx==null)return;
    var t=e.changedTouches[0],dx=t.clientX-tx,dy=t.clientY-ty;tx=null;
    if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.5)calShift(dx<0?1:-1);
  },{passive:true});
  window.addEventListener('online',function(){loadProgram().then(syncPending)});
  document.addEventListener('visibilitychange',function(){if(!document.hidden)syncPending()});
  loadProgram().then(syncPending);
  try{if(navigator.storage&&navigator.storage.persist)navigator.storage.persist().catch(function(){})}catch(e){}
  if('serviceWorker' in navigator){
    var hadCtl=!!navigator.serviceWorker.controller;
    navigator.serviceWorker.addEventListener('controllerchange',function(){
      if(!hadCtl){hadCtl=true;return}
      // нова версія готова; не перезавантажуємо посеред тренування, а пропонуємо
      if(document.getElementById('newv'))return;
      var d=document.createElement('button');d.id='newv';d.className='newv';d.type='button';
      d.textContent=T('Є нова версія апки. Натисніть, щоб оновити');
      d.addEventListener('click',function(){location.reload()});
      document.body.appendChild(d);
    });
    window.addEventListener('load',function(){
      navigator.serviceWorker.register('sw.js',{updateViaCache:'none'}).then(function(r){try{r.update()}catch(e){}}).catch(function(){});
    });
    document.addEventListener('visibilitychange',function(){
      if(document.hidden)return;
      navigator.serviceWorker.getRegistration().then(function(r){if(r)r.update()}).catch(function(){});
    });
  }
})();
