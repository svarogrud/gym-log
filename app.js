(function(){
  'use strict';
  var APP_VERSION='34';
  var NEED_SCRIPT=5; // має збігатися з SCRIPT_VERSION у apps-script/Code.gs
  // Мова інтерфейсу: українська або англійська (⚙ → Мова). За замовчуванням — мова телефона.
  var LANG='uk';
  try{LANG=localStorage.getItem('gym.lang.v1')||((navigator.language||'').toLowerCase().indexOf('uk')===0?'uk':'en')}catch(e){LANG=(navigator.language||'').toLowerCase().indexOf('uk')===0?'uk':'en'}
  var LOC=LANG==='en'?'en-GB':'uk-UA';
  var EN={
"З таблиці підтягнуто нових чи змінених тренувань: ": "New or changed workouts pulled from the sheet: ",
"У цей день інший пристрій уже записав тренування — щоб не затерти його, записано в новий стовпець ": "Another device already saved a workout for this day — to avoid overwriting it, saved to a new column ",
"Інший пристрій уже записав цей день — записано в окремий стовпець ": "Another device already saved this day — saved to a separate column ",
"Рекомендація під ваш профіль: ті самі 3 дні по черзі, ~75 хв кожен. Лише для інформації — ваша програма в «Тренуванні» не змінюється. Натисніть на вправу, щоб побачити техніку й ваги.": "Recommendation for your profile: the same 3 days in rotation, ~75 min each. For information only — your program under Workout doesn’t change. Tap an exercise for technique and weights. (Notes are in Ukrainian.)",
"Чому так": "Why",
"День 1 · Ноги + тяга": "Day 1 · Legs + pull",
"День 2 · Спина й плечі": "Day 2 · Back & shoulders",
"День 3 · Груди й руки": "Day 3 · Chest & arms",
"відпочинок ": "rest ",
"Останній раз: ": "Last time: ",
"суперсет": "superset",
"RPE 7 — після підходу ще ~3 повтори в запасі. Суперсет — дві вправи підряд, відпочинок після обох.": "RPE 7 — about 3 reps left in the tank. Superset — two exercises back to back, rest after both.",
"Прогресія на 8–12 тижнів": "Progression for 8–12 weeks",
"Що з пропущеними вправами": "What about skipped exercises",
"Безпека": "Safety",
"Загальні рекомендації, не медична порада.": "General guidance, not medical advice.",
"Пропоновані вправи": "Suggested exercises",
"Яких вправ бракувало у вашій програмі. Відкрийте вправу й додайте в день — або просто виконайте в тренуванні.": "Exercises your program was missing. Open one and add it to a day, or just do it in a workout.",
"Пропоную додати в день": "Suggested day",
"Нова вправа в програмі.": "New in your program.",
"Тренажер зайнятий чи зламаний? Вправи на ті самі м’язи замість «": "Machine busy or broken? Exercises for the same muscles instead of “",
"Ставиться лише в це тренування.": "Only for this workout.",
"підходи": "sets",
"сек": "sec",
"скрипт v": "script v",
"Скрипт у таблиці застарів": "The script in the sheet is outdated",
"потрібна v": "needed v",
"Вставте новий Code.gs і зробіть Deploy → Manage deployments → New version.": "Paste the new Code.gs and do Deploy → Manage deployments → New version.",
"Схожі вправи": "Similar exercises",
"У тому самому дні вже є вправи на ці м’язи": "The same day already has exercises for these muscles",
"Це нормально, якщо так задумано, але легко перевантажити ті самі м’язи.": "Fine if intended, but it’s easy to overload the same muscles.",
"Замінити": "Swap",
"«Замінити» ставить схожу вправу замість цієї лише в цьому тренуванні — коли тренажер зайнятий чи зламаний.": "“Swap” puts the similar exercise in place of this one for this workout only — when the machine is busy or broken.",
"Замінено на ": "Swapped for ",
"AI-тренер": "AI coach",
"ІМТ": "BMI",
"Апка збере ваш профіль, поточну програму й підсумок останніх 8 тижнів у готовий текст. Скопіюйте його в будь-який AI-чат — отримаєте розбір і пропозиції.": "The app gathers your profile, current program and a summary of the last 8 weeks into ready-made text. Paste it into any AI chat to get an analysis and suggestions.",
"Вага": "Weight",
"Вагу записано": "Weight saved",
"Введіть вагу в кілограмах, наприклад 82,5.": "Enter your weight in kilograms, for example 82.5.",
"Видалити": "Delete",
"Вік": "Age",
"Графік": "Chart",
"Дані зберігаються на телефоні та у вкладках «Профіль» і «Вага» вашої таблиці.": "Data is stored on this phone and in the “Профіль” and “Вага” tabs of your sheet.",
"Дата": "Date",
"Дата народження": "Date of birth",
"Допоміжні": "Secondary",
"Досвід": "Experience",
"За 30 днів": "Last 30 days",
"Записати": "Save",
"Записуйте вагу раз на тиждень (зранку, натщесерце) — тут з’явиться графік.": "Log your weight once a week (morning, before eating) and a chart will appear here.",
"Запит для AI": "AI prompt",
"Зараз": "Now",
"Збережено в таблицю.": "Saved to the sheet.",
"Збережено на телефоні.": "Saved on this phone.",
"Зберіть профіль, програму й останні тренування в один текст і вставте в будь-який AI-чат (Claude, ChatGPT, Gemini).": "Gather your profile, program and recent workouts into one text and paste it into any AI chat (Claude, ChatGPT, Gemini).",
"Зріст, см": "Height, cm",
"Мета": "Goal",
"Можна дописати своє питання в кінці перед відправкою.": "You can add your own question at the end before sending.",
"Моє": "Mine",
"М’язи": "Muscles",
"Налаштування тренажера": "Machine settings",
"Наприклад: болить ліве коліно при глибоких присіданнях": "For example: left knee hurts in deep squats",
"Наприклад: лікті не нижче 90°": "For example: elbows no lower than 90°",
"Наприклад: сидіння 5, спинка 3": "For example: seat 5, back 3",
"Не вдалося скопіювати — виділіть текст і скопіюйте вручну.": "Couldn’t copy — select the text and copy it manually.",
"Нотатка": "Note",
"Обмеження, травми": "Limitations, injuries",
"Описи вправ поки що українською.": "Exercise descriptions are in Ukrainian for now.",
"Основні": "Primary",
"Поділитися": "Share",
"Помилки й безпека": "Mistakes and safety",
"Порада": "Tip",
"Про мене": "About me",
"Програма": "Program",
"Прогрес": "Progress",
"Профіль": "Profile",
"Рекорд": "Best",
"Скласти запит для AI": "Build AI prompt",
"Скопійовано. Вставте в AI-чат.": "Copied. Paste it into an AI chat.",
"Скопіювати": "Copy",
"Стать": "Sex",
"Талія, см": "Waist, cm",
"Тренувань на тиждень": "Workouts per week",
"Тут з’явиться рекомендована програма під вашу мету й рівень — щоб порівняти з поточною й поступово щось змінити. Для неї заповніть «Профіль».": "A recommended program for your goal and level will appear here, to compare with your current one and change gradually. Fill in your Profile for it.",
"Хвилин на тренування": "Minutes per workout",
"Як виконувати": "How to do it",
"без змін": "no change",
"кг з": "kg since",
"не записано": "not logged",
"повт.": "reps",
"см": "cm",
"Сила": "Strength",
"М’язова маса": "Muscle mass",
"Здоров’я й тонус": "Health & tone",
"Схуднення": "Fat loss",
"Витривалість": "Endurance",
"Початківець (до 1 року)": "Beginner (under 1 year)",
"Середній (1–3 роки)": "Intermediate (1–3 years)",
"Досвідчений (3+ роки)": "Advanced (3+ years)",
"Чоловік": "Male",
"Жінка": "Female",
"Розділи": "Sections",
"Виконано": "Done",
"Суперсет": "Superset",
"чергуйте підходи, відпочинок — після обох": "alternate sets, rest after both",
"Тепер: ": "Next: ",
"Підхід ": "Set ",
"виконано": "done",
"Вага, кг": "Weight, kg",
"Повтори": "Reps",
",": ".",
"Також для наступних невиконаних підходів": "Also for the following unfinished sets",
"Зберегти": "Save",
"Закрити": "Close",
"Утримуйте підхід, щоб змінити його вагу чи повтори. − і + змінюють вагу наступних підходів.": "Hold a set to change its weight or reps. − and + change the weight of the following sets.",
"Редагувати тренування": "Edit workout",
"Тренування завершене": "Workout finished",
"Пропущено": "Skipped",
"кг": "kg",
"Змінити порядок вправ": "Change exercise order",
"Редагування. Зміни запишуться в таблицю, коли натиснете «Зберегти зміни» або вийдете.": "Editing. Changes are written to the sheet when you tap “Save changes” or leave.",
"Тренування триває": "Workout in progress",
" підходів": " sets",
"Продовжити": "Continue",
"Видалити незавершене тренування": "Delete unfinished workout",
"Завершити": "Finish",
"Порядок дня збережено": "Day order saved",
"Порядок збережено на телефоні": "Order saved on this phone",
"Перетягнути": "Drag",
"Натисніть на вправу, щоб побачити схему руху, медіа й останні результати. Перетягніть за ≡, щоб змінити порядок вправ у дні.": "Tap an exercise to see the movement diagram, media and recent results. Drag by ≡ to change the order within a day.",
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
  var PROG_HEAD=['Назва в журналі','Назва в апці','Тип','Дні','Підходи','Повтори','Вага','Примітка','ID','Медіа','Name EN','Або','Суперсет','Налаштування','Нотатка'];
  var DAYS_HEAD=['№','Назва','Опис','Колір','Іконка','Порядок','Name EN'];
  var BUILTIN={
    days:[
      ['1','Ноги','ноги, підтягування, бруси','#ff9900','ноги','','Legs'],
      ['2','Плечі та спина','плечі, спина, підтягування','#4a86e8','плечі, спина','','Shoulders & back'],
      ['3','Груди та руки','груди, біцепс, трицепс','#9900ff','груди, руки','','Chest & arms']
    ],
    ex:[
      ['elipse','Еліпс','кардіо','1, 2, 3','','хв; нахил; рівень','','15*10*7','ell','','Elliptical','розминка',''],
      ['bike','Велосипед','кардіо','1, 2, 3','','хв','','20 min','bike','','Bike','розминка',''],
      ['low back','Низ спини','сила','1, 2, 3','3','15','77','low back','lowb','','Lower back'],
      ['back extension','Гіперекстензія','сила','1, 2, 3','3','15','77','back extension','bext','','Back extension'],
      ['abdominal/прес лежачи','Прес лежачи','сила','1, 3','3','15','0','вага 0 = своя вага','abs','','Floor crunches'],
      ['P14 abdominal crunch/пресс на станку, згинання','Скручування на тренажері','сила','1, 2, 3','3','15','59','P14','crunch','','Ab crunch machine'],
      ['chin/підтягування','Підтягування','сила','1, 2','3','8','20','chin','chin','','Pull-ups','','підтягування+бруси'],
      ['dip/бруси','Бруси','сила','1, 2','3','10','20','dip','dip','','Dips','','підтягування+бруси'],
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
  // Нові вправи, яких бракувало в програмі. Не входять у план, поки їх не додати в день
  // (кнопки днів у деталях) або не виконати в тренуванні; тоді рядок дописується у «Програму».
  var SUGGEST=[
    ['romanian deadlift/румунська тяга гантелі','Румунська тяга з гантелями','сила','','3','10','12','','rdl','','Dumbbell Romanian deadlift','',''],
    ['plank/планка','Планка','кардіо','','','підходи; сек','','3*45','plank','','Plank','',''],
    ['face pull','Тяга до обличчя','сила','','3','15','15','канат, блок на рівні очей','face','','Face pull','',''],
    ['hanging leg raise/підйом ніг у висі','Підйом ніг у висі','сила','','3','10','0','вага 0 = своя вага','hleg','','Hanging leg raise','',''],
    ['pec deck/метелик','Метелик (pec deck)','сила','','3','12','30','','pdeck','','Pec deck fly','',''],
    ['hammer curl/молоткові','Молоткові згинання','сила','','3','10','12','','hammer','','Hammer curl','','']
  ];
  var SUG_DAY={rdl:['A'],plank:['A','C'],face:['B'],hleg:['B'],pdeck:['C'],hammer:['C']};
  function sugRow(id){return SUGGEST.filter(function(r){return r[8]===id})[0]}
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
    var j=String(r[0]||'').trim(),n=String(r[1]||'').trim()||j,enName=String(r[10]||'').trim();
    if(LANG==='en'){var en=String(r[10]||'').trim();if(en)n=en;else if(/[a-z]/i.test(j.split('/')[0])){n=j.split('/')[0].replace(/\(.*?\)/g,'').trim();n=n.charAt(0).toUpperCase()+n.slice(1)}}
    var type=normName(r[2]),note=String(r[7]||'').trim(),id=String(r[8]||'').trim();
    if(!j&&!n)return null;
    if(!id)id='n:'+normName(j||n);
    var days=String(r[3]||'').split(/[^\d]+/).map(dayKey).filter(Boolean);
    var d={n:n,j:j||n,days:days,media:String(r[9]||'').trim(),en:enName,alt:normName(r[11]),ss:normName(r[12]),setup:String(r[13]||'').trim(),pnote:String(r[14]||'').trim()};
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
      if(r.length<13){var bi=BUILTIN.ex.filter(function(x){return x[8]===String(r[8]||'').trim()})[0];if(bi){r=r.slice();while(r.length<11)r.push('');r[11]=bi[11]||'';r[12]=bi[12]||''}}
      var e=exFromRow(r);if(!e||EX[e.id])return;
      EX[e.id]=e.d;NAME2ID[normName(e.d.j)]=e.id;
      e.d.days.forEach(function(k){if(DAYS[k])DAYS[k].ids.push(e.id)});
      if(sugRow(e.id))e.d.isNew=true;
    });
    SUGGEST.forEach(function(r){
      if(EX[r[8]]||NAME2ID[normName(r[0])])return;
      var e=exFromRow(r);e.d.isNew=true;e.d.sugOnly=true;e.d.sug=SUG_DAY[e.id]||[];
      EX[e.id]=e.d;NAME2ID[normName(e.d.j)]=e.id;
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
      var ex={},votes={},sk={};
      for(var r2=1;r2<values.length;r2++){
        var id2=rowIds[r2];if(!id2||!EX[id2])continue;
        var cell=values[r2]&&values[r2][c2];
        if(cell==null||String(cell).trim()==='')continue;
        var col=colors&&colors[r2]&&colors[r2][c2];
        if(colors&&!isDone(col)){
          skippedCells++;
          // незафарбована клітинка = пропущена вправа: запам'ятовуємо план з клітинки як невиконані підходи
          var ps=parseCell(id2,cell);
          if(ps)sk[id2]=ps.map(function(x){var y={};Object.keys(x).forEach(function(k){y[k]=x[k]});y.done=false;return y});
          continue;
        }
        var dc=dayOfColor(col);if(dc)votes[dc]=(votes[dc]||0)+1;
        var p=parseCell(id2,cell);
        if(p)ex[id2]=p;else bad++;
      }
      if(!Object.keys(ex).length)continue;
      var f=fixed[c2-1],day=null,vb=0;
      DAYKEYS.forEach(function(k){if((votes[k]||0)>vb){vb=votes[k];day=k}});
      if(!day)day=classify(ex);
      var dids=DAYS[day].ids;
      // пропущені вправи цього дня лишаються в тренуванні як «Пропущено»; чужі білі клітинки (скопійовані зі стовпця іншого дня) ігноруємо
      Object.keys(sk).forEach(function(id){if(!ex[id]&&dids.indexOf(id)>=0)ex[id]=sk[id]});
      var extra=Object.keys(ex).filter(function(id){return dids.indexOf(id)<0});
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
    var pre=Promise.resolve();
    if(EX[id]&&EX[id].sugOnly&&sugRow(id)){var row=sugRow(id).slice();row[3]=nums;pre=api('addExercise',{head:PROG_HEAD,row:row})}
    return pre.then(function(){return api('setExerciseDays',{id:id,days:nums})}).then(function(){o.pending=false;saveExDays();return true},function(){return false});
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
  function touch(s){s.updated=Date.now();if(s.editing)s._chg=true;if(s.draft)return;saveLocal()}
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
  // ID цього пристрою: таблиця пам'ятає, який пристрій записав стовпець, щоб інший його не затер
  var DEV=lsGet('gym.dev.v1');
  if(!DEV){DEV='d'+Math.random().toString(36).slice(2,10);lsSet('gym.dev.v1',DEV)}
  function payloadFor(s){
    var items=[];
    Object.keys(s.ex).forEach(function(id){
      var d=EX[id];if(!d)return;
      items.push({row:null,name:d.j||d.n,text:cellText(id,s.ex[id]),done:anyDone(s.ex[id])});
    });
    var taken=[];
    Object.keys(sessions).forEach(function(q){var o=sessions[q];if(o.key!==s.key&&o.sheetCol!=null)taken.push(o.sheetCol+1)});
    return {key:s.key,dev:DEV,date:sheetDate(s.date),iso:s.date,col:s.sheetCol==null?null:s.sheetCol+1,fixedCol:!!s.imported,taken:taken,
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
      setBk(k,'ok',j.conflict?T('У цей день інший пристрій уже записав тренування — щоб не затерти його, записано в новий стовпець ')+L+'.':
        j.reused?T('Оновлено стовпець ')+L+T(' у таблиці.'):T('Записано в таблицю, стовпець ')+L+'.');
      if(j.conflict)toast(T('Інший пристрій уже записав цей день — записано в окремий стовпець ')+L);
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
    var pn=Object.keys(exNote).filter(function(id){return exNote[id].pending});
    if(!exs.length&&!list.length&&!ords.length&&!exd.length&&!pn.length)return Promise.resolve();
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
    Object.keys(exNote).forEach(function(id){if(exNote[id].pending)chain=chain.then(function(){return pushPersonal(id)})});
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
  // quiet — автоматично при відкритті апки: без «Читаю таблицю…», помилки мовчки, повідомлення лише про нові тренування
  var impBusy=false,impLast=0;
  function autoImport(){
    if(!cfg.url||navigator.onLine===false||impBusy||(impState&&impState.state==='busy'))return Promise.resolve();
    // посеред тренування чи з відкритим вікном не чіпаємо — щоб не загубити зміни
    if(view==='workout'||!pk.hidden||Date.now()-impLast<60000)return Promise.resolve();
    impLast=Date.now();
    return importHistory(true);
  }
  function importHistory(quiet){
    if(impState&&impState.state==='busy')return Promise.resolve();
    impBusy=true;
    if(!quiet)setImp('busy',T('Читаю таблицю…'));
    var before={};Object.keys(sessions).forEach(function(k){var s=sessions[k];before[k]=s.imported?(s.sheetCol+'|'+JSON.stringify(s.ex)):1});
    return (quiet?Promise.resolve():loadProgram()).then(function(){return api('read')}).then(function(j){
        impBusy=false;
        if(quiet&&(view==='workout'||!pk.hidden))return;
        var g=gridFromApi(j);
        if(!g.values.length){if(!quiet)setImp('err',T('Таблиця порожня або недоступна.'));return}
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
        var fresh=Object.keys(sessions).filter(function(k){var s=sessions[k];return s.imported&&before[k]!==(s.sheetCol+'|'+JSON.stringify(s.ex))}).length;
        if(!quiet)impState={state:'ok',msg:msg};
        else if(fresh)toast(T('З таблиці підтягнуто нових чи змінених тренувань: ')+fresh);
        if(view==='home'&&(!quiet||fresh))renderHome();
    }).catch(function(e){impBusy=false;if(!quiet)setImp('err',errText(e))});
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
  /* ---------- групи вправ у тренуванні ----------
     «Або» (alt): кілька вправ, з яких робиться одна (еліпс або велосипед) — одна картка з перемикачем.
     «Суперсет» (ss): вправи чергуються підхід за підходом, відпочинок — після підходу всіх вправ групи. */
  function grpMembers(s,id,kind){
    var g=EX[id]&&EX[id][kind];if(!g)return [id];
    var m=sIds(s).filter(function(x){return s.ex[x]&&EX[x]&&EX[x][kind]===g});
    return m.length>1?m:[id];
  }
  function altChoice(s,id){
    var m=grpMembers(s,id,'alt');if(m.length<2)return id;
    var g=EX[id].alt;s.alt=s.alt||{};
    if(s.alt[g]&&m.indexOf(s.alt[g])>=0)return s.alt[g];
    var done=m.filter(function(x){return anyDone(s.ex[x])})[0];
    return done||seasonPick(m,s.date);
  }
  // що найчастіше робили в цю пору року (±45 днів у будь-якому році)
  function seasonPick(m,iso){
    var doy=function(d){var t=new Date(d+'T12:00:00');return Math.floor((t-new Date(t.getFullYear(),0,0))/864e5)};
    var me=doy(iso),score={},last={};
    m.forEach(function(x){score[x]=0;last[x]=''});
    Object.keys(sessions).forEach(function(k){
      var q=sessions[k];if(!q.finished||!q.ex)return;
      var dd=Math.abs(doy(q.date)-me);dd=Math.min(dd,365-dd);
      m.forEach(function(x){if(q.ex[x]&&anyDone(q.ex[x])){if(dd<=45)score[x]++;if(q.date>last[x])last[x]=q.date}});
    });
    return m.slice().sort(function(a,b){return (score[b]-score[a])||(last[b]>last[a]?1:last[b]<last[a]?-1:0)})[0];
  }
  function countable(s){
    var skip={};
    Object.keys(s.ex).forEach(function(id){
      if(!EX[id]||!EX[id].alt)return;
      var m=grpMembers(s,id,'alt');if(m.length<2)return;
      var c=altChoice(s,id);m.forEach(function(x){if(x!==c)skip[x]=1});
    });
    return Object.keys(s.ex).filter(function(id){return !skip[id]});
  }
  function setsDone(s){
    var n=0;Object.keys(s.ex).forEach(function(id){s.ex[id].forEach(function(x){if(x.done)n++})});return n;
  }
  function setsTotal(s){var n=0;countable(s).forEach(function(id){n+=s.ex[id].length});return n}
  function volume(s){
    var v=0;
    Object.keys(s.ex).forEach(function(id){
      var d=EX[id];if(!d||d.t==='cardio')return;
      s.ex[id].forEach(function(x,i){if(x.done)v+=repsOf(id,i,x)*(x.w||0)});
    });
    return Math.round(v);
  }
  function renderHome(){
    view='home';cur=null;setTab('home');
    var nd=nextDay(), dd=DAYS[nd], today=todayISO();
    var open=null;
    Object.keys(sessions).forEach(function(k){var s=sessions[k];if(s.date===today&&!s.finished&&(!open||s.updated>open.updated))open=s});
    var h='<div class="top"><div class="tt"><h1 class="brand">Gym Log</h1><div class="date">'+new Date().toLocaleDateString(LOC,{weekday:'long',day:'numeric',month:'long'})+T('</div></div><button class="gear" data-act="cfg" aria-label="Налаштування таблиці">⚙</button></div>');
    if(!cfg.url)h+=T('<button class="resume" data-act="cfg"><div><b>Підключіть таблицю</b><div class="tag">Щоб підтягнути історію й зберігати резервну копію</div></div><span>Налаштувати</span></button>');
    if(bkFocus&&sessions[bkFocus])h+='<div id="bkbox" class="bkbox" data-key="'+bkFocus+'">'+bkInner(sessions[bkFocus])+'</div>';
    if(open){
      // картка: інформація зверху, дії окремим рядком
      h+='<div class="resume rs2" id="resume"><button class="rmain" data-act="open" data-key="'+open.key+'"><div><b>'+T('Тренування триває')+'</b><div class="tag">'+esc(dayOf(open.day).n)+' · '+setsDone(open)+T(' з ')+setsTotal(open)+T(' підходів')+'</div></div></button>'+
        '<div class="ract"><button class="rgo" data-act="open" data-key="'+open.key+'">'+T('Продовжити')+'</button>'+
        '<button class="rfin" data-act="rfin" data-key="'+open.key+'">'+T('Завершити')+'</button>'+
        '<button class="rx" data-act="rdel" data-key="'+open.key+'" aria-label="'+T('Видалити незавершене тренування')+'">✕</button></div></div>';
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
  // завершене тренування лише для перегляду, доки не натиснути «Редагувати»
  function locked(){return !!(cur&&cur.finished&&!cur.editing)}
  function cardHTML(id){
    var d=EX[id],arr=cur.ex[id],lk=locked();
    if(!d||!arr)return '';
    if(d.t==='cardio'){
      var on=arr[0].done,cv=cfVals(id,arr[0]),f='';
      (d.lab||[T('хв')]).forEach(function(l,i){
        f+='<label class="cff" for="cf-'+id+'-'+i+'"><span>'+esc(l)+'</span><input id="cf-'+id+'-'+i+'" type="text" inputmode="decimal" autocomplete="off" value="'+(cv[i]!=null?fw(cv[i]):'')+'" data-ex="'+id+'" data-cf="'+i+'"'+(lk?' readonly':'')+'></label>';
      });
      var cst=on?'done':(lk||cur.finished?'skip':'todo');
      return '<section class="ex st-'+cst+(on?' fin':'')+(lk?' lk':'')+'" id="c-'+id+'"><div class="exh"><div>'+titleBtn(id,cst)+(!on&&!lk?'<button class="later" data-act="later" data-ex="'+id+T('">Пізніше</button>'):'')+'</div></div>'+
        '<div class="cardio'+(on?' on':'')+'"><div class="cfr">'+f+'</div>'+
        '<button class="cdone" data-act="cardio" data-ex="'+id+'" aria-pressed="'+on+'"'+(lk?' disabled':'')+'>'+(on?T('Готово ✓'):(lk?T('Пропущено'):T('Позначити')))+'</button></div></section>';
    }
    var all=arr.every(function(x){return x.done});
    var mixed=arr.some(function(x){return x.w!==arr[0].w});
    var p='';
    arr.forEach(function(x,i){
      p+='<button class="plate'+(x.done?' on':'')+'" data-act="set" data-ex="'+id+'" data-i="'+i+'"'+(lk?' disabled':'')+' aria-pressed="'+x.done+T('" aria-label="Підхід ')+(i+1)+', '+repsOf(id,i,x)+T(' повторень"><b>')+repsOf(id,i,x)+'</b>'+(mixed?'<small>'+fw(x.w)+'</small>':'')+'</button>';
    });
    var doneW=arr.filter(function(x){return x.done}).map(function(x){return x.w}),shownW=doneW.length?doneW[0]:curW(arr);
    var nd=arr.filter(function(q){return q.done}).length,st=all?'done':nd?'part':(lk||cur.finished?'skip':'todo');
    return '<section class="ex st-'+st+(all?' fin':'')+(lk?' lk':'')+'" id="c-'+id+'"><div class="exh"><div>'+titleBtn(id,st,nd,arr.length)+(d.tag?'<p class="tag">'+d.tag+'</p>':'')+
      (!all&&!lk?'<button class="later" data-act="later" data-ex="'+id+T('">Пізніше</button>'):'')+
      (!nd&&!lk&&similar(id).some(function(o){return !cur.ex[o.id]})?'<button class="later" data-act="swapl" data-ex="'+id+'">⇄ '+T('Замінити')+'</button>':'')+
      (!lk&&(cur.extra||[]).indexOf(id)>=0&&!arr.some(function(x){return x.done})?'<button class="rmx" data-act="rmx" data-ex="'+id+T('">Прибрати з тренування</button>'):'')+'</div>'+
      (lk?'<div class="wt lockw"><b class="num">'+fw(shownW)+'</b><span>'+T('кг')+'</span></div></div>':'<div class="wt"><button data-act="wm" data-ex="'+id+T('" aria-label="Менше">−</button><label><input id="w-')+id+'" type="text" inputmode="decimal" value="'+fw(curW(arr))+'" data-ex="'+id+T('" aria-label="Вага, кг"><span>кг</span></label><button data-act="wp" data-ex="')+id+T('" aria-label="Більше">+</button></div></div>'))+
      '<div class="plates">'+p+'</div>'+(!lk&&!hintShown++?'<p class="hint">'+T('Утримуйте підхід, щоб змінити його вагу чи повтори. − і + змінюють вагу наступних підходів.')+'</p>':'')+'</section>';
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
    view='workout';setTab('workout');
    var dd=dayOf(cur.day);
    var h=T('<div class="wh"><div class="l1"><button class="back" data-act="home" aria-label="Назад">‹</button><h2>')+dd.n+T('</h2><div class="cnt num" id="pc"></div>')+(locked()?'<button class="back edt" data-act="edit" aria-label="'+T('Редагувати тренування')+'">✎</button>':
        '<button class="back" data-act="ord" aria-label="'+T('Змінити порядок вправ')+'">⇅</button>'+(cur.draft?'':'<button class="back fin" data-act="finish" aria-label="'+(cur.finished?T('Зберегти зміни'):T('Завершити тренування'))+'">✓</button>'))+'</div><div class="bar"><i id="pb"></i></div></div>'+
      (locked()?'<div class="lockb"><p>'+T('Тренування завершене')+' · '+fmtDate(cur.date)+'</p><button class="retry" data-act="edit">✎ '+T('Редагувати тренування')+'</button></div>':'')+
      (cur.finished&&cur.editing?'<div class="lockb edit"><p>'+T('Редагування. Зміни запишуться в таблицю, коли натиснете «Зберегти зміни» або вийдете.')+'</p></div>':'')+
      (cur.draft?T('<div class="draft" id="draftb"><p>Перегляд. Тренування почнеться, коли натиснете кнопку або відмітите перший підхід.</p><button class="cta" data-act="begin">Почати тренування</button></div>'):'')+
      '<div class="list">';
    h+=listHTML();
    h+=(locked()?'</div><button class="finish" id="finb" hidden>':T('</div><button class="addx" data-act="padd">+ Додати вправу</button><button class="finish" id="finb" data-act="finish"')+(cur.draft?' hidden':'')+'>')+(cur.finished?T('Зберегти зміни'):T('Завершити тренування'))+'</button><p class="summary num" id="sum"></p><div id="bkbox" class="bkbox" data-key="'+cur.key+'">'+bkInner(cur)+'</div>';
    app.innerHTML=h;
    progress();
    window.scrollTo(0,0);
  }
  var hintShown=0;
  function listHTML(){
    var h='',done={};hintShown=0;
    sIds(cur).forEach(function(id){
      if(done[id])return;
      var alt=grpMembers(cur,id,'alt'),ss=grpMembers(cur,id,'ss');
      if(alt.length>1){alt.forEach(function(x){done[x]=1});h+=altHTML(alt);return}
      if(ss.length>1){ss.forEach(function(x){done[x]=1});h+=ssHTML(ss);return}
      done[id]=1;h+=cardHTML(id);
    });
    return h;
  }
  function altHTML(m){
    var c=altChoice(cur,m[0]),g=EX[m[0]].alt,lk=locked();
    var h='<div class="grp altg" id="g-'+m[0]+'"><div class="grph"><span>'+esc(g.charAt(0).toUpperCase()+g.slice(1))+'</span><span class="seg">';
    m.forEach(function(x){h+='<button class="sgb'+(x===c?' on':'')+'" data-act="alt" data-ex="'+x+'" data-g="'+m[0]+'"'+(lk?' disabled':'')+'>'+esc(EX[x].n)+'</button>'});
    return h+'</span></div>'+cardHTML(c)+'</div>';
  }
  function ssHTML(m){
    var h='<div class="grp ssg" id="g-'+m[0]+'"><div class="grph"><span>'+T('Суперсет')+'</span><span class="ssn">'+T('чергуйте підходи, відпочинок — після обох')+'</span></div>';
    m.forEach(function(x){h+=cardHTML(x)});
    return h+'</div>';
  }
  function refreshCard(id){
    var am=grpMembers(cur,id,'alt');
    if(am.length>1){var g=document.getElementById('g-'+am[0]);if(g)g.outerHTML=altHTML(am);progress();return}
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
  function old(j){return !(+j.version>=NEED_SCRIPT)}
  function scriptNote(j){return T('скрипт v')+(j.version||'1–2')}
  // Раз на запуск: якщо скрипт у таблиці старіший за потрібний, кажемо про це
  function checkScript(){
    if(!cfg||!cfg.url)return;
    api('ping').then(function(j){if(old(j))toast(T('Скрипт у таблиці застарів')+' ('+scriptNote(j)+', '+T('потрібна v')+NEED_SCRIPT+')')},function(){});
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
      var sv=scriptNote(j);
      m.textContent=T('З’єднано з таблицею «')+(j.title||'')+'» · '+sv+T('. Завантажую програму…');
      loadProgram().then(function(ok){
        m.textContent=T('З’єднано з таблицею «')+(j.title||'')+'» · '+sv+'.'+(ok?T(' Програму завантажено з вкладки «Програма».'):'');
        if(old(j)){m.className='pkerr';m.textContent+=' '+T('Скрипт у таблиці застарів')+' ('+T('потрібна v')+NEED_SCRIPT+'). '+T('Вставте новий Code.gs і зробіть Deploy → Manage deployments → New version.')}
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
  function finishSession(fs,when){
    // нові вправи, створені в цьому тренуванні, стають доступними для всіх тренувань
    (fs.extra||[]).forEach(function(xid){var xd=custom[xid];if(xd&&xd.from===fs.key&&!xd.ready){xd.ready=true;touchLib(xid)}});
    mergeCustom();
    Object.keys(fs.ex||{}).forEach(function(xid){
      var xd=EX[xid];if(!xd||!xd.sugOnly||(xd.days||[]).length||!anyDone(fs.ex[xid]))return;
      var ks=DAYS[fs.day]&&fs.day!=='X'?[fs.day]:(xd.sug||[]).slice(0,1);
      setDays(xid,ks);exDays[xid]={days:ks,pending:true,at:Date.now()};saveExDays();
    });
    fs.finished=fs.finished||when||Date.now();fs.needSheet=true;touch(fs);
  }
  // Незавершені тренування з минулих днів: з відміченими підходами — завершуємо, порожні — прибираємо
  function autoFinish(){
    var today=todayISO(),n=0,changed=false;
    Object.keys(sessions).forEach(function(k){
      var s=sessions[k];
      if(s.finished||s.date>=today)return;
      if(cur&&cur.key===k&&view==='workout')return;
      if(setsDone(s)){finishSession(s,s.updated||Date.now());n++;changed=true}
      else{delete sessions[k];changed=true}
    });
    if(changed){saveLocal();if(view==='home')renderHome()}
    if(n)syncPending();
    return n;
  }
  function beginDraft(rerender){
    if(!cur||!cur.draft)return;
    delete cur.draft;cur.started=Date.now();sessions[cur.key]=cur;touch(cur);
    var db=document.getElementById('draftb');if(db)db.remove();
    var fb=document.getElementById('finb');if(fb)fb.hidden=false;
    if(rerender)renderWorkoutKeep();
  }
  /* ---------- перетягування рядків за ручку ≡ ----------
     Працює пальцем і мишею (pointer events), прокручує список біля країв.
     scroller — елемент, що прокручується (або null для сторінки). onDrop(from,to). */
  var dragging=false,dragJustEnded=0;
  function dragRows(e,rowSel,scroller,onDrop){
    var hd=e.target.closest('.odrag');if(!hd)return false;
    var row=hd.closest(rowSel),list=row&&row.parentNode;if(!row)return false;
    var rows=[].slice.call(list.children).filter(function(r){return r.matches(rowSel)&&!r.hidden});
    var from=rows.indexOf(row);if(from<0)return false;
    e.preventDefault();e.stopPropagation();
    var sc=function(){return scroller?scroller.scrollTop:window.scrollY};
    var s0=sc(),y0=e.clientY,lastY=e.clientY,to=from,raf=0;
    var mids=rows.map(function(r){var b=r.getBoundingClientRect();return b.top+b.height/2+s0});
    var rh=row.getBoundingClientRect().height;
    dragging=true;row.classList.add('drag');
    try{hd.setPointerCapture(e.pointerId)}catch(er){}
    function layout(){
      var docY=lastY+sc();
      row.style.transform='translateY('+(docY-(y0+s0))+'px)';
      to=rows.filter(function(r,i){return i!==from&&mids[i]<docY}).length;
      rows.forEach(function(r,i){
        if(r===row)return;
        var sh=(from<to&&i>from&&i<=to)?-rh:(from>to&&i<from&&i>=to)?rh:0;
        r.style.transform=sh?'translateY('+sh+'px)':'';
      });
    }
    function edge(){
      var top=scroller?scroller.getBoundingClientRect().top:0,bot=scroller?scroller.getBoundingClientRect().bottom:window.innerHeight,v=0;
      if(lastY<top+70)v=-Math.ceil((top+70-lastY)/6);else if(lastY>bot-70)v=Math.ceil((lastY-(bot-70))/6);
      if(v){if(scroller)scroller.scrollTop+=v;else window.scrollBy(0,v);layout()}
      raf=requestAnimationFrame(edge);
    }
    raf=requestAnimationFrame(edge);
    function mv(ev){lastY=ev.clientY;layout()}
    function up(){
      cancelAnimationFrame(raf);dragging=false;dragJustEnded=Date.now();
      hd.removeEventListener('pointermove',mv);hd.removeEventListener('pointerup',up);hd.removeEventListener('pointercancel',up);
      rows.forEach(function(r){r.style.transform=''});row.classList.remove('drag');
      if(to!==from)onDrop(from,to,rows);
    }
    hd.addEventListener('pointermove',mv);hd.addEventListener('pointerup',up);hd.addEventListener('pointercancel',up);
    return true;
  }
  // у вікні «Порядок вправ» (посеред тренування)
  pk.addEventListener('pointerdown',function(e){
    if(!cur||!e.target.closest||!e.target.closest('.odrag'))return;
    var scroller=pk.querySelector('.pkp');
    dragRows(e,'.orow',scroller,function(from,to,rows){
      var st=scroller.scrollTop;
      var ids=rows.map(function(r){return r.getAttribute('data-id')}),id=ids.splice(from,1)[0];
      ids.splice(to,0,id);
      sIds(cur).forEach(function(x){if(ids.indexOf(x)<0)ids.push(x)});
      cur.order=ids;touch(cur);
      openOrder();
      var p2=pk.querySelector('.pkp');if(p2)p2.scrollTop=st;
    });
  });
  // на екрані «Вправи»: порядок дня зберігається одразу
  app.addEventListener('pointerdown',function(e){
    if(view!=='exlist'||!e.target.closest||!e.target.closest('.odrag'))return;
    var g=e.target.closest('details.exg'),k=g&&g.getAttribute('data-g');if(!k||!DAYS[k])return;
    dragRows(e,'.exr',null,function(from,to,rows){
      var ids=rows.map(function(r){return r.getAttribute('data-ex')}),id=ids.splice(from,1)[0];
      ids.splice(to,0,id);
      var y=window.scrollY;
      saveDayOrder(k,ids).then(function(ok){toast(ok?T('Порядок дня збережено'):T('Порядок збережено на телефоні'))});
      renderExList();window.scrollTo(0,y);
    });
  });
  function toast(msg){
    var t=document.getElementById('toast');
    if(!t){t=document.createElement('div');t.id='toast';t.className='toast';t.setAttribute('role','status');document.body.appendChild(t)}
    t.textContent=msg;t.classList.add('on');
    clearTimeout(t._h);t._h=setTimeout(function(){t.classList.remove('on')},2200);
  }
  function renderWorkoutKeep(){var y=window.scrollY;renderWorkout();window.scrollTo(0,y)}

  /* ---------- вкладки внизу ---------- */
  var tabsEl=document.getElementById('tabs');
  function setTab(v){
    if(!tabsEl)return;
    var on={home:1,exlist:1,plan:1,me:1}[v];
    tabsEl.hidden=!on;document.body.classList.toggle('hastabs',!!on);
    tabsEl.querySelectorAll('[data-t]').forEach(function(b){var a=b.getAttribute('data-t')===v;b.classList.toggle('on',a);b.setAttribute('aria-current',a?'page':'false')});
  }
  if(tabsEl){
    tabsEl.querySelectorAll('[data-t]').forEach(function(b){b.querySelector('span').textContent=T(b.querySelector('span').textContent)});
    tabsEl.addEventListener('click',function(e){
      var b=e.target.closest('[data-t]');if(!b)return;
      var t=b.getAttribute('data-t');hideRest();
      if(t==='home')renderHome();else if(t==='exlist')renderExList();else if(t==='plan')renderPlan();else if(t==='me')renderMe();
    });
  }

  /* ---------- профіль ---------- */
  var LSPF='gym.profile.v1',PF={};
  try{PF=JSON.parse(lsGet(LSPF)||'{}')||{}}catch(e){PF={}}
  PF.weights=PF.weights||[];
  var PF_FIELDS=[['birth','Дата народження'],['sex','Стать'],['height','Зріст, см'],['goal','Мета'],['exp','Досвід'],['days','Тренувань на тиждень'],['mins','Хвилин на тренування'],['limits','Обмеження, травми']];
  var GOALS=[['','—'],['strength','Сила'],['muscle','М’язова маса'],['health','Здоров’я й тонус'],['fatloss','Схуднення'],['endurance','Витривалість']];
  var EXPS=[['','—'],['beg','Початківець (до 1 року)'],['mid','Середній (1–3 роки)'],['adv','Досвідчений (3+ роки)']];
  var SEXES=[['','—'],['m','Чоловік'],['f','Жінка']];
  function optLabel(list,v){var o=list.filter(function(x){return x[0]===v})[0];return o?T(o[1]):''}
  function saveProfileLocal(){PF.at=Date.now();PF.pending=true;lsSet(LSPF,JSON.stringify(PF));clearTimeout(saveProfileLocal.t);saveProfileLocal.t=setTimeout(pushProfile,1200)}
  function ageOf(b){if(!b)return null;var t=new Date(b+'T12:00:00'),n=new Date(),a=n.getFullYear()-t.getFullYear();if(n.getMonth()<t.getMonth()||(n.getMonth()===t.getMonth()&&n.getDate()<t.getDate()))a--;return a>0&&a<120?a:null}
  function lastWeight(){var w=PF.weights.slice().sort(function(a,b){return a.d<b.d?-1:1});return w[w.length-1]||null}
  function weightAgo(days){
    var lim=fromDayNum(dayNum(todayISO())-days),w=PF.weights.filter(function(x){return x.d<=lim}).sort(function(a,b){return a.d<b.d?-1:1});
    return w[w.length-1]||null;
  }
  function pushProfile(){
    if(!PF.pending||!cfg.url)return Promise.resolve(false);
    var rows=PF_FIELDS.map(function(f){return [f[0],f[1],String(PF[f[0]]||'')]});
    rows.push(['at','Оновлено',String(PF.at||'')]);
    var ws=PF.weights.slice().sort(function(a,b){return a.d<b.d?-1:1}).map(function(x){return [x.d,String(x.kg),x.waist?String(x.waist):'']});
    return api('saveProfile',{rows:rows,weights:ws}).then(function(){PF.pending=false;lsSet(LSPF,JSON.stringify(PF));return true},function(){return false});
  }
  function loadProfile(){
    if(!cfg.url||navigator.onLine===false)return Promise.resolve(false);
    return api('readProfile').then(function(j){
      if(!j||!j.rows)return false;
      var r={};(j.rows||[]).forEach(function(x){r[x[0]]=x[2]});
      var remoteAt=parseInt(r.at,10)||0;
      if(PF.pending||remoteAt<=(PF.at||0))return false;
      PF_FIELDS.forEach(function(f){PF[f[0]]=r[f[0]]||''});
      PF.weights=(j.weights||[]).map(function(x){return {d:String(x[0]),kg:parseFloat(String(x[1]).replace(',','.')),waist:x[2]?parseFloat(String(x[2]).replace(',','.')):''}}).filter(function(x){return /^\d{4}-\d\d-\d\d$/.test(x.d)&&!isNaN(x.kg)});
      PF.at=remoteAt;PF.pending=false;lsSet(LSPF,JSON.stringify(PF));
      if(view==='me')renderMe();
      return true;
    },function(){return false});
  }
  function sel(id,list,v){return '<select class="in" id="'+id+'">'+list.map(function(o){return '<option value="'+o[0]+'"'+(o[0]===(v||'')?' selected':'')+'>'+esc(T(o[1]))+'</option>'}).join('')+'</select>'}
  function renderMe(){
    view='me';cur=null;setTab('me');
    var lw=lastWeight(),age=ageOf(PF.birth),h=parseFloat(PF.height),bmi=lw&&h?lw.kg/Math.pow(h/100,2):null;
    var m1=weightAgo(30),m3=weightAgo(90);
    var html='<div class="wh"><div class="l1"><h2>'+T('Профіль')+'</h2></div></div>';
    html+='<div class="stats">'+
      '<div><span>'+T('Вага')+'</span><b class="num">'+(lw?fw(lw.kg):'—')+'</b><small>'+(lw?T('кг')+' · '+fmtDate(lw.d):T('не записано'))+'</small></div>'+
      '<div><span>'+T('За 30 днів')+'</span><b class="num">'+(lw&&m1?((lw.kg-m1.kg>0?'+':'')+fw(Math.round((lw.kg-m1.kg)*10)/10)):'—')+'</b><small>'+T('кг')+'</small></div>'+
      '<div><span>'+T('Вік')+'</span><b class="num">'+(age||'—')+'</b><small>'+(bmi?T('ІМТ')+' '+fw(Math.round(bmi*10)/10):'&nbsp;')+'</small></div></div>';
    var pts=PF.weights.slice().sort(function(a,b){return a.d<b.d?-1:1}).map(function(x){return {d:x.d,v:x.kg}});
    html+='<div class="sec pks">'+T('Вага')+'</div>'+(pts.length>1?lineChart(pts,T('кг'),'var(--accent)'):'<p class="sync">'+T('Записуйте вагу раз на тиждень (зранку, натщесерце) — тут з’явиться графік.')+'</p>');
    html+='<div class="wadd"><label for="pwkg">'+T('Вага, кг')+'<input class="in" id="pwkg" type="text" inputmode="decimal" value="'+(lw?fw(lw.kg):'')+'"></label>'+
      '<label for="pwwaist">'+T('Талія, см')+'<input class="in" id="pwwaist" type="text" inputmode="decimal" placeholder="—"></label>'+
      '<label for="pwdate">'+T('Дата')+'<input class="in" id="pwdate" type="date" value="'+todayISO()+'" max="'+todayISO()+'"></label>'+
      '<button class="cta" data-act="wadd">'+T('Записати')+'</button></div><p class="pkerr" id="pwmsg" role="status"></p>';
    var wl=PF.weights.slice().sort(function(a,b){return a.d<b.d?1:-1}).slice(0,8);
    if(wl.length){
      html+='<div class="hist">';
      wl.forEach(function(x){html+='<div class="hrow"><span>'+fmtDate(x.d)+(x.d.slice(0,4)!==todayISO().slice(0,4)?' '+x.d.slice(0,4):'')+'</span><b class="num">'+fw(x.kg)+' '+T('кг')+(x.waist?' · '+fw(x.waist)+' '+T('см'):'')+'</b><button class="wdel" data-act="wdel" data-d="'+x.d+'" aria-label="'+T('Видалити')+'">✕</button></div>'});
      html+='</div>';
    }
    html+='<div class="sec pks">'+T('Про мене')+'</div><div class="pkf pform">'+
      '<div class="pkg two"><label for="pf-birth">'+T('Дата народження')+'<input class="in" id="pf-birth" type="date" value="'+esc(PF.birth||'')+'"></label>'+
      '<label for="pf-sex">'+T('Стать')+sel('pf-sex',SEXES,PF.sex)+'</label></div>'+
      '<div class="pkg two"><label for="pf-height">'+T('Зріст, см')+'<input class="in" id="pf-height" type="text" inputmode="numeric" value="'+esc(PF.height||'')+'"></label>'+
      '<label for="pf-days">'+T('Тренувань на тиждень')+'<input class="in" id="pf-days" type="text" inputmode="numeric" value="'+esc(PF.days||'')+'"></label></div>'+
      '<label for="pf-goal">'+T('Мета')+sel('pf-goal',GOALS,PF.goal)+'</label>'+
      '<div class="pkg two"><label for="pf-exp">'+T('Досвід')+sel('pf-exp',EXPS,PF.exp)+'</label>'+
      '<label for="pf-mins">'+T('Хвилин на тренування')+'<input class="in" id="pf-mins" type="text" inputmode="numeric" value="'+esc(PF.mins||'')+'"></label></div>'+
      '<label for="pf-limits">'+T('Обмеження, травми')+'<textarea class="in" id="pf-limits" rows="2" placeholder="'+T('Наприклад: болить ліве коліно при глибоких присіданнях')+'">'+esc(PF.limits||'')+'</textarea></label>'+
      '<p class="sync">'+T('Дані зберігаються на телефоні та у вкладках «Профіль» і «Вага» вашої таблиці.')+'</p></div>';
    html+='<div class="sec pks">'+T('AI-тренер')+'</div><p class="sync">'+T('Зберіть профіль, програму й останні тренування в один текст і вставте в будь-який AI-чат (Claude, ChatGPT, Gemini).')+'</p><button class="cta" data-act="prompt">'+T('Скласти запит для AI')+'</button>';
    app.innerHTML=html;window.scrollTo(0,0);
  }
  app.addEventListener('change',function(e){
    if(view!=='me')return;
    var id=e.target.id;if(id.indexOf('pf-')!==0)return;
    PF[id.slice(3)]=String(e.target.value).trim();saveProfileLocal();
    if(id==='pf-birth'||id==='pf-height'){var y=window.scrollY;renderMe();window.scrollTo(0,y)}
  });

  /* ---------- програма й запит для AI ---------- */
  // Рекомендована програма: ті самі 3 дні по черзі (~1,6 тренування на тиждень), але кожен день
  // зачіпає більшість груп м'язів — великі м'язи працюють щодругого тренування, хоч би як випали дні.
  // Під профіль: 41 рік, мета — здоров’я й тонус, досвід 3+ роки, 75 хв, чутливий поперек, без зайвого навантаження на коліна.
  // ss — суперсет з наступною вправою.
  var REC={
    A:{n:'День 1 · Ноги + тяга',items:[
      {id:'ell',alt:'bike',sr:'8–10 хв',w:'легкий темп',r:'',nt:'Далі 1 легкий підхід перед першою вправою на кожну групу м’язів.'},
      {id:'lpress',sr:'3×10–12',w:'RPE 7',r:'2 хв',nt:'Стопи вище на платформі, коліна не нижче 90°, не випрямляйте до замка.'},
      {id:'rdl',sr:'3×10',w:'2×12 кг',r:'90 с',nt:'Спина рівна; опускайтеся до натягу в стегнах, не нижче.'},
      {id:'lcurl',sr:'3×10–12',w:'36 кг',r:'90 с'},
      {id:'chin',sr:'3×8',w:'20 кг',r:'',ss:1},
      {id:'dip',sr:'3×10',w:'20 кг',r:'2 хв'},
      {id:'abd',sr:'3×15',w:'50 кг',r:'60 с',nt:'Або «Сідничні».'},
      {id:'calfs',sr:'3×12',w:'50 кг',r:'60 с'},
      {id:'plank',sr:'3×30–45 с',w:'',r:'45 с'}
    ]},
    B:{n:'День 2 · Спина й плечі',items:[
      {id:'ell',alt:'bike',sr:'8–10 хв',w:'легкий темп',r:''},
      {id:'chin',sr:'3×8',w:'20 кг',r:'',ss:1},
      {id:'dip',sr:'3×10',w:'20 кг',r:'2 хв'},
      {id:'pull',sr:'3×10',w:'45 кг',r:'90 с'},
      {id:'drow',sr:'3×10',w:'45 кг',r:'90 с'},
      {id:'shp',sr:'3×10',w:'23 кг',r:'90 с'},
      {id:'lat',sr:'3×12',w:'45 кг',r:'',ss:1},
      {id:'face',sr:'3×15',w:'легко',r:'60 с'},
      {id:'plc',sr:'3×10–12',w:'32 кг',r:'90 с',nt:'Задня поверхня стегна — другий раз за круг.'},
      {id:'hleg',sr:'3×10',w:'своя вага',r:'60 с',nt:'Коліна зігнуті; без розгойдування.'}
    ]},
    C:{n:'День 3 · Груди й руки',items:[
      {id:'ell',alt:'bike',sr:'8–10 хв',w:'легкий темп',r:''},
      {id:'bench',sr:'3×8–10',w:'30 кг → +2,5',r:'2 хв'},
      {id:'incl',sr:'3×10',w:'20 кг',r:'90 с',nt:'Лава зайнята — «Метелик».'},
      {id:'lrow',sr:'3×10',w:'45 кг',r:'90 с',nt:'Спина — другий раз за круг, урівноважує жими.'},
      {id:'lpress',sr:'2×12',w:'легше, RPE 6',r:'90 с',nt:'Ноги — другий раз за круг, без втоми колін.'},
      {id:'bbic',sr:'3×10',w:'20 кг',r:'',ss:1},
      {id:'tri',sr:'3×10–12',w:'18 кг',r:'60 с'},
      {id:'hammer',sr:'2×12',w:'10–12 кг',r:'60 с'},
      {id:'bext',sr:'2×12–15',w:'легко',r:'60 с',nt:'Поперек — раз за круг, плавно, без перерозгинання.'}
    ]}
  };
  var REC_TEXT={
    why:['Ви робите дні по черзі, в середньому 1,6 тренування на тиждень, тож кожен день повторюється раз на ~2 тижні. Якщо м’яз працює лише в одному дні, він отримує навантаження раз на 2 тижні — для тонусу замало.',
      'Тому дні лишаються вашими (Ноги, Спина й плечі, Груди й руки), але кожен зачіпає й інші великі м’язи: ноги, спина й груди працюють щодругого тренування, хоч би як випав тиждень.',
      'Зараз у дні 12–16 вправ і кінець не встигається — «Жим ногами», «Сідничні», «Задня дельта», «Нижня тяга» 0 разів за 8 тижнів. Тепер 9–10 вправ, найважливіші — першими.',
      'Перевантажено: поперек і прес у кожному дні (гіперекстензія + низ спини + скручування) — забагато згинання під вагою для чутливого попереку. Недопрацьовано: задня поверхня стегна й сідниці, задня дельта, стабільність корпусу.'],
    prog:['Круг = 3 тренування (≈2 тижні); 8–12 тижнів — це 5–6 кругів.',
      'Круг 1: вага як зараз, RPE 7 (ще ~3 повтори в запасі). Мета — не пропускати вправи зі списку.',
      'Круги 2–4: подвійна прогресія. Коли в усіх підходах — верхня межа повторів (напр. 3×12), додайте найменший крок ваги (тренажер +1 плитка, штанга +2,5 кг) і знову з нижньої межі.',
      'Круг 5: легкий — ті самі вправи, 2 підходи замість 3, вага −10–20%.',
      'Далі продовжуйте прогресію; наприкінці перегляньте рекорди у «Вправах» і, якщо треба, замініть 1–2 вправи на схожі.',
      'Після перерви понад 10 днів — повертайтеся з ~80% ваги.'],
    skip:['Задня дельта → «Тяга до обличчя»: те саме плюс здорові плечі.','Тяга сидячи → «Розвідна тяга» (день 2) і «Нижня тяга» (день 3) — горизонтальних тяг досить.',
      'Присідання під кутом, розгинання ніг → прибрати: навантажують коліна. Квадрицепс — у жимі ногами.','Повороти корпусу, скручування на тренажері, низ спини → «Планка», «Підйом ніг у висі», легка гіперекстензія раз за круг.',
      'Ікри сидячи, зведення ніг, трицепс за головою, прес лежачи — необов’язкові; додавайте в кінець, якщо лишився час.'],
    safe:['Поперек: біль після перерви — ознака детренованості. У дні без залу 5 хв: «кішка-корова», «пташка-собака», сідничний місток, «мертвий жук».',
      'Румунська тяга й гіперекстензія — рівна спина, без ривків і без перерозгинання вгорі. Біль, що віддає в ногу, — стоп і до лікаря чи фізіотерапевта.',
      'Коліна: у жимі ногами не опускайтеся нижче 90° і не блокуйте коліна вгорі; без присідань під кутом і важкого розгинання ніг.',
      'Бруси: не опускайтеся нижче, ніж плече паралельно ліктю, якщо тягне передню частину плеча.',
      'Перед першою силовою вправою дня — 1 легкий розминочний підхід.']
  };
  function recRow(o){
    var d=EX[o.id];if(!d)return '';
    var nm=esc(d.n)+(o.alt&&EX[o.alt]?' / '+esc(EX[o.alt].n):'')+newBadge(o.id);
    var meta=[o.sr,o.w,o.r?T('відпочинок ')+o.r:''].filter(Boolean).join(' · ');
    var hist=exHistory(o.id),last=hist.length?T('Останній раз: ')+cellText(o.id,hist[0].ex[o.id]):'';
    return '<div class="recr'+(o.ss?' ss1':'')+'"><button class="simn" data-act="info" data-ex="'+o.id+'"><b>'+nm+'</b><small>'+esc(meta)+'</small>'+
      (o.nt?'<small class="recn">'+esc(o.nt)+'</small>':'')+(last?'<small class="recl">'+esc(last)+'</small>':'')+'</button>'+
      (o.ss?'<span class="recss">'+T('суперсет')+' ↓</span>':'')+'</div>';
  }
  function ul(a){return '<ul class="recul">'+a.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul>'}
  function renderPlan(){
    view='plan';cur=null;setTab('plan');
    var h='<div class="wh"><div class="l1"><h2>'+T('Програма')+'</h2></div></div>'+
      '<p class="sync">'+T('Рекомендація під ваш профіль: ті самі 3 дні по черзі, ~75 хв кожен. Лише для інформації — ваша програма в «Тренуванні» не змінюється. Натисніть на вправу, щоб побачити техніку й ваги.')+'</p>'+
      '<div class="sec pks">'+T('Чому так')+'</div>'+ul(REC_TEXT.why);
    ['A','B','C'].forEach(function(k){
      h+='<div class="sec pks"'+(DAYS[k]?' style="color:'+DAYS[k].color+'"':'')+'>'+T(REC[k].n)+'</div><div class="hist">'+REC[k].items.map(recRow).join('')+'</div>';
    });
    h+='<p class="sync">'+T('RPE 7 — після підходу ще ~3 повтори в запасі. Суперсет — дві вправи підряд, відпочинок після обох.')+'</p>'+
      '<div class="sec pks">'+T('Прогресія на 8–12 тижнів')+'</div>'+ul(REC_TEXT.prog)+
      '<div class="sec pks">'+T('Що з пропущеними вправами')+'</div>'+ul(REC_TEXT.skip)+
      '<div class="sec pks">'+T('Безпека')+'</div>'+ul(REC_TEXT.safe)+
      '<p class="sync">'+T('Загальні рекомендації, не медична порада.')+'</p>'+
      '<div class="sec pks">'+T('Запит для AI')+'</div><p class="sync">'+T('Апка збере ваш профіль, поточну програму й підсумок останніх 8 тижнів у готовий текст. Скопіюйте його в будь-який AI-чат — отримаєте розбір і пропозиції.')+'</p>'+
      '<button class="cta" data-act="prompt">'+T('Скласти запит для AI')+'</button>';
    app.innerHTML=h;window.scrollTo(0,0);
  }
  function buildPrompt(){
    var en=LANG==='en',L=function(uk,e){return en?e:uk};
    var lw=lastWeight(),m3=weightAgo(90),age=ageOf(PF.birth);
    var out=[];
    out.push(L('Ти — досвідчений тренер із силових тренувань. Проаналізуй мої дані й журнал тренувань і допоможи покращити програму. Я тренуюсь у звичайній залі з тренажерами (JustGym).',
               'You are an experienced strength coach. Analyse my data and training log and help me improve my program. I train in a regular commercial gym with machines (JustGym).'));
    out.push('');out.push(L('## Про мене','## About me'));
    if(age)out.push(L('- Вік: ','- Age: ')+age);
    if(PF.sex)out.push(L('- Стать: ','- Sex: ')+optLabel(SEXES,PF.sex));
    if(PF.height)out.push(L('- Зріст: ','- Height: ')+PF.height+' cm');
    if(lw)out.push(L('- Вага: ','- Weight: ')+fw(lw.kg)+' kg'+(m3&&m3!==lw?L(' (3 місяці тому ',' (3 months ago ')+fw(m3.kg)+' kg)':'')+(lw.waist?L(', талія ',', waist ')+fw(lw.waist)+' cm':''));
    if(PF.goal)out.push(L('- Мета: ','- Goal: ')+optLabel(GOALS,PF.goal));
    if(PF.exp)out.push(L('- Досвід: ','- Experience: ')+optLabel(EXPS,PF.exp));
    if(PF.days)out.push(L('- Тренувань на тиждень: ','- Sessions per week: ')+PF.days);
    if(PF.mins)out.push(L('- Тривалість тренування: ','- Session length: ')+PF.mins+L(' хв',' min'));
    out.push(L('- Обмеження, травми: ','- Limitations, injuries: ')+(PF.limits||L('немає','none')));
    out.push('');out.push(L('## Поточна програма (підходи×повтори × вага)','## Current program (sets×reps × weight)'));
    DAYKEYS.forEach(function(k){
      var ids=orderFor(k),parts=[],seen={};
      ids.forEach(function(id){
        if(seen[id]||!EX[id])return;
        var d=EX[id];
        if(d.alt){var a=ids.filter(function(x){return EX[x]&&EX[x].alt===d.alt});a.forEach(function(x){seen[x]=1});parts.push(a.map(function(x){return EX[x].n}).join(L(' або ',' or '))+' ('+d.alt+')');return}
        if(d.ss){var g=ids.filter(function(x){return EX[x]&&EX[x].ss===d.ss});g.forEach(function(x){seen[x]=1});parts.push(L('суперсет: ','superset: ')+g.map(function(x){return EX[x].n+' '+exSummary(x)}).join(' + '));return}
        seen[id]=1;parts.push(d.n+' '+exSummary(id));
      });
      out.push(L('- День ','- Day ')+DAYS[k].num+' «'+DAYS[k].n+'»: '+parts.join('; '));
    });
    var since=fromDayNum(dayNum(todayISO())-56),recent=Object.keys(sessions).map(function(k){return sessions[k]}).filter(function(s){return s.finished&&s.date>=since});
    out.push('');out.push(L('## Останні 8 тижнів','## Last 8 weeks'));
    out.push(L('- Тренувань: ','- Workouts: ')+recent.length+L(' (у середньому ',' (avg ')+fw(Math.round(recent.length/8*10)/10)+L(' на тиждень)',' per week)'));
    var perDay=DAYKEYS.map(function(k){return DAYS[k].n+': '+recent.filter(function(s){return s.day===k}).length}).join(', ');
    out.push(L('- По днях: ','- By day: ')+perDay);
    out.push(L('- Вправи (останній результат; вага на початку → зараз; виконано в скількох тренуваннях цього дня):','- Exercises (last result; weight then → now; done in how many sessions of its day):'));
    var listed={};
    DAYKEYS.forEach(function(k){orderFor(k).forEach(function(id){
      if(listed[id]||!EX[id])return;listed[id]=1;
      var d=EX[id],rel=recent.filter(function(s){return (d.days||[]).indexOf(s.day)>=0||(s.ex&&s.ex[id])});
      var done=rel.filter(function(s){return s.ex&&s.ex[id]&&anyDone(s.ex[id])});
      if(!rel.length)return;
      var lastS=done.sort(function(a,b){return a.date<b.date?1:-1})[0];
      var ser=d.t==='cardio'?[]:exSeries(id).filter(function(p){return p.d>=since});
      out.push('  - '+d.n+': '+(lastS?cellText(id,lastS.ex[id]):L('не виконувалась','not done'))+
        (ser.length>1&&ser[0].w!==ser[ser.length-1].w?'; '+fw(ser[0].w)+' → '+fw(ser[ser.length-1].w)+' kg':'')+
        '; '+done.length+'/'+rel.length);
    })});
    out.push('');out.push(L('## Що потрібно','## What I need'));
    out.push(L('1. Оціни баланс програми: які м’язи недопрацьовані чи перевантажені.','1. Assess the balance of my program: which muscle groups are under- or over-worked.'));
    out.push(L('2. Запропонуй програму на ','2. Propose a program for ')+(PF.days||'3')+L(' дні на тиждень таблицею: вправа, підходи × повтори, стартова вага або RPE, відпочинок.',' days a week as a table: exercise, sets × reps, starting weight or RPE, rest.'));
    out.push(L('3. План прогресії на 8–12 тижнів.','3. A progression plan for 8–12 weeks.'));
    out.push(L('4. Що робити з вправами, які я часто пропускаю.','4. What to do about exercises I often skip.'));
    out.push(L('5. Застереження щодо безпеки з урахуванням моїх обмежень.','5. Safety notes considering my limitations.'));
    out.push(L('Відповідай українською, стисло й по суті.','Answer in English, concise and to the point.'));
    return out.join('\n');
  }
  function openPrompt(){
    var txt=buildPrompt();
    pk.innerHTML='<div class="pkp" role="dialog" aria-label="'+T('Запит для AI')+'"><div class="pkh"><h2>'+T('Запит для AI')+'</h2><button class="back" data-act="pclose" aria-label="'+T('Закрити')+'">×</button></div>'+
      '<textarea class="in ptxt" id="ptxt" rows="14" readonly>'+esc(txt)+'</textarea>'+
      '<div class="steps"><button class="cta" data-act="pcopy">'+T('Скопіювати')+'</button>'+(navigator.share?'<button class="retry" data-act="pshare">'+T('Поділитися')+'</button>':'')+'</div>'+
      '<p class="pkerr" id="pmsg" role="status"></p><p class="sync">'+T('Можна дописати своє питання в кінці перед відправкою.')+'</p></div>';
    pk.hidden=false;
  }

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
  // «New» — пропонована вправа, доки її жодного разу не виконано
  function isNewEx(id){return !!(EX[id]&&EX[id].isNew&&!lastDoneDate(id))}
  function newBadge(id){return isNewEx(id)?' <span class="newb">New</span>':''}
  function exRow(id,drag){
    var d=EX[id],l=lastDoneDate(id);
    return '<button class="row exr'+(drag?' dr':'')+'" data-act="info" data-ex="'+id+'" data-n="'+esc(normName(d.n+' '+(d.j||'')+' '+(d.tag||'')))+'">'+
      '<div class="exi">'+(window.GymAnim&&GymAnim.has(id)?'<span class="dot" aria-hidden="true">▶</span>':'')+'</div>'+
      '<div><div class="rn">'+esc(d.n)+newBadge(id)+'</div><div class="rs">'+esc(exSummary(id))+'</div></div>'+
      '<div class="rr">'+(l?fmtDate(l)+(l.slice(0,4)!==todayISO().slice(0,4)?'<br>'+l.slice(0,4):''):'—')+'</div>'+
      (drag?'<span class="odrag" aria-label="'+T('Перетягнути')+'">≡</span>':'')+'</button>';
  }
  var exOpen={new:true};
  function renderExList(){
    view='exlist';cur=null;setTab('exlist');
    var h='<div class="wh"><div class="l1"><h2>'+T('Вправи')+'</h2></div></div>'+
      '<input class="in" id="exq" type="search" placeholder="'+T('Пошук вправи')+'" autocomplete="off" aria-label="'+T('Пошук вправи')+'">';
    var seen={};
    var sug=Object.keys(EX).filter(function(id){return EX[id].sugOnly&&!(EX[id].days||[]).length});
    if(sug.length){
      h+='<details class="exg" data-g="new"'+(exOpen.new?' open':'')+'><summary class="exh2"><span class="dn"><span class="newb">New</span></span><span class="exn">'+T('Пропоновані вправи')+'</span><span class="exc num">'+sug.length+'</span></summary><div class="rows">';
      sug.forEach(function(id){h+=exRow(id);seen[id]=1});
      h+='<p class="sync">'+T('Яких вправ бракувало у вашій програмі. Відкрийте вправу й додайте в день — або просто виконайте в тренуванні.')+'</p></div></details>';
    }
    DAYKEYS.forEach(function(k){
      var ids=orderFor(k);if(!ids.length)return;
      var rows='',n=0;
      ids.forEach(function(id){if(EX[id]){rows+=exRow(id,true);seen[id]=1;n++}});
      // категорії згорнуті; відкриті запам’ятовуються, поки апка відкрита
      h+='<details class="exg" data-g="'+k+'"'+(exOpen[k]?' open':'')+'><summary class="exh2"><span class="dn">'+badge(DAYS[k])+'</span><span class="exn">'+esc(DAYS[k].n)+'</span><span class="exc num">'+n+'</span></summary><div class="rows">'+rows+'</div></details>';
    });
    var rest=Object.keys(EX).filter(function(id){return !seen[id]&&(!EX[id].custom||EX[id].ready)});
    if(rest.length){
      h+='<details class="exg" data-g="none"'+(exOpen.none?' open':'')+'><summary class="exh2"><span class="dn"></span><span class="exn">'+T('Без дня')+'</span><span class="exc num">'+rest.length+'</span></summary><div class="rows">';
      rest.forEach(function(id){h+=exRow(id)});
      h+='</div></details>';
    }
    h+='<p class="sync">'+T('Натисніть на вправу, щоб побачити схему руху, медіа й останні результати. Перетягніть за ≡, щоб змінити порядок вправ у дні.')+'</p>';
    app.innerHTML=h;window.scrollTo(0,0);
  }

  /* ---------- деталі вправи ---------- */
  // стан вправи: виконана ✓, почата (2/3), не почата ○, пропущена (у завершеному тренуванні)
  function titleBtn(id,st,nd,tot){
    var d=EX[id],mk='',pill='';
    if(st==='done')mk='<span class="stm done" aria-label="'+T('Виконано')+'">✓</span>';
    else if(st==='part'){mk='<span class="stm part" aria-hidden="true"></span>';pill='<span class="stp part num">'+nd+'/'+tot+'</span>'}
    else if(st==='skip'){mk='<span class="stm skip" aria-hidden="true">–</span>';pill='<span class="stp skip">'+T('Пропущено')+'</span>'}
    else if(st==='todo')mk='<span class="stm todo" aria-hidden="true"></span>';
    return '<h3 class="exttl">'+mk+'<button class="ttl" data-act="info" data-ex="'+id+'">'+esc(d.n)+'<span class="inf" aria-hidden="true">i</span></button>'+pill+'</h3>';
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
  // Запити для YouTube: точна назва тренажера англійською дає релевантні відео
  var YTQ={rdl:'dumbbell romanian deadlift proper form',plank:'forearm plank proper form',face:'cable face pull proper form',
    hleg:'hanging leg raise proper form',pdeck:'pec deck machine how to use',hammer:'dumbbell hammer curl proper form',ell:'elliptical trainer how to use',bike:'stationary bike proper form',lowb:'seated back extension machine how to use',
    bext:'45 degree back extension hyperextension proper form',abs:'floor crunches proper form',crunch:'ab crunch machine how to use',
    chin:'assisted pull up machine how to use',dip:'assisted dip machine how to use',shp:'converging shoulder press machine how to use',
    srow:'seated cable row proper form',rot:'rotary torso machine how to use',rear:'rear delt fly machine how to use',
    lat:'lateral raise machine how to use',drow:'diverging seated row machine how to use',pull:'lat pulldown proper form',
    bench:'barbell bench press proper form',bbic:'ez bar curl proper form',incl:'incline barbell bench press proper form',
    dbic:'dumbbell bicep curl proper form',tri:'cable triceps pressdown proper form',tri2:'overhead dumbbell triceps extension proper form',
    lrow:'low row machine how to use',lext:'leg extension machine how to use',lcurl:'seated leg curl machine how to use',
    add:'hip adductor machine how to use',abd:'hip abductor machine how to use',glute:'glute kickback machine how to use',
    hack:'hack squat machine proper form',calfs:'standing calf raise machine proper form',calft:'seated calf raise machine proper form',
    plc:'lying leg curl machine how to use',lpress:'leg press machine proper form'};
  function ytQuery(id){
    if(YTQ[id])return YTQ[id];
    var d=EX[id],base=d.en||'';
    if(!base){var lat=String(d.j||'').split('/')[0].replace(/\(.*?\)/g,'').trim();if(/[a-z]{3}/i.test(lat))base=lat}
    if(!base)base=d.n;
    return base+(/[a-z]/i.test(base)?(d.t==='cardio'?' how to use':' proper form'):' техніка виконання');
  }
  /* ---------- розширені деталі вправи ---------- */
  var LSN='gym.exnote.v1',exNote={};
  try{exNote=JSON.parse(lsGet(LSN)||'{}')||{}}catch(e){exNote={}}
  function saveExNote(){lsSet(LSN,JSON.stringify(exNote))}
  function personal(id,f){var o=exNote[id];if(o&&o[f]!=null&&(o.pending||(o.at||0)>progAt))return o[f];var d=EX[id];return d?(f==='setup'?d.setup:d.pnote)||'':''}
  // найкраща вага за кожне тренування (виконані підходи) — для рекорду й графіка
  function exSeries(id){
    var pts=[];
    Object.keys(sessions).forEach(function(k){
      var s=sessions[k];if(!s.finished||!s.ex||!s.ex[id])return;
      var best=null;
      s.ex[id].forEach(function(x,i){if(x.done&&typeof x.w==='number'){var r=repsOf(id,i,x);if(!best||x.w>best.w||(x.w===best.w&&r>best.r))best={w:x.w,r:r}}});
      if(best)pts.push({d:s.date,w:best.w,r:best.r});
    });
    return pts.sort(function(a,b){return a.d<b.d?-1:1});
  }
  function lineChart(pts,unit,color){
    if(pts.length<2)return '';
    var W=320,H=120,P=26,xs=pts.map(function(p){return dayNum(p.d)}),ys=pts.map(function(p){return p.v});
    var x0=Math.min.apply(0,xs),x1=Math.max.apply(0,xs),y0=Math.min.apply(0,ys),y1=Math.max.apply(0,ys);
    if(y1===y0){y1+=1;y0-=1}
    var X=function(v){return P+(x1===x0?0:(v-x0)/(x1-x0))*(W-P-8)},Y=function(v){return 8+(1-(v-y0)/(y1-y0))*(H-P-8)};
    var d=pts.map(function(p,i){return (i?'L':'M')+X(xs[i]).toFixed(1)+' '+Y(ys[i]).toFixed(1)}).join(' ');
    var area=d+' L'+X(xs[xs.length-1]).toFixed(1)+' '+(H-P)+' L'+X(xs[0]).toFixed(1)+' '+(H-P)+' Z';
    var last=pts[pts.length-1];
    return '<svg class="lchart" viewBox="0 0 '+W+' '+H+'" style="color:'+color+'" role="img" aria-label="'+T('Графік')+'">'+
      '<line x1="'+P+'" y1="'+(H-P)+'" x2="'+(W-8)+'" y2="'+(H-P)+'" class="gx"/>'+
      '<text x="'+(P-4)+'" y="'+(Y(y1)+4)+'" class="gt" text-anchor="end">'+fw(y1)+'</text><text x="'+(P-4)+'" y="'+(Y(y0)+4)+'" class="gt" text-anchor="end">'+fw(y0)+'</text>'+
      '<path d="'+area+'" class="ga"/><path d="'+d+'" class="gl"/>'+
      '<circle cx="'+X(xs[xs.length-1])+'" cy="'+Y(ys[ys.length-1])+'" r="4" class="gp"/>'+
      '<text x="'+P+'" y="'+(H-8)+'" class="gt">'+fmtDate(pts[0].d)+(pts[0].d.slice(0,4)!==last.d.slice(0,4)?' '+pts[0].d.slice(0,4):'')+'</text>'+
      '<text x="'+(W-8)+'" y="'+(H-8)+'" class="gt" text-anchor="end">'+fmtDate(last.d)+'</text></svg>';
  }
  function infoMore(id){
    var d=EX[id],G=window.GymInfo,inf=G&&G.get(id),h='',col=dayColorOf(id);
    if(inf){
      var nm=LANG==='en'?G.NAMES_EN:G.NAMES,list=function(a){return a.map(function(k){return nm[k]||k}).join(', ')};
      h+='<div class="sec pks">'+T('М’язи')+'</div><div class="mbox2" style="color:'+col+'">'+(LANG==='en'?G.musclesSvg(inf.m,inf.m2).replace('спереду','front').replace('ззаду','back'):G.musclesSvg(inf.m,inf.m2))+'</div>'+
        '<p class="mtxt"><b>'+T('Основні')+':</b> '+esc(list(inf.m))+(inf.m2.length?'<br><b>'+T('Допоміжні')+':</b> '+esc(list(inf.m2)):'')+'</p>';
      h+='<div class="sec pks">'+T('Як виконувати')+'</div><ol class="steps2">'+inf.s.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ol>';
      h+='<div class="sec pks">'+T('Помилки й безпека')+'</div><ul class="warn">'+inf.e.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul>';
      if(inf.t)h+='<p class="tipx"><b>'+T('Порада')+':</b> '+esc(inf.t)+'</p>';
      if(LANG==='en')h+='<p class="sync">'+T('Описи вправ поки що українською.')+'</p>';
    }
    if(d.t!=='cardio'){
      var pts=exSeries(id);
      if(pts.length){
        var pr=pts.reduce(function(a,b){return b.w>a.w||(b.w===a.w&&b.r>a.r)?b:a});
        var first=pts[0],last=pts[pts.length-1],diff=Math.round((last.w-first.w)*100)/100;
        h+='<div class="sec pks">'+T('Прогрес')+'</div><div class="prs"><div><span>'+T('Рекорд')+'</span><b class="num">'+fw(pr.w)+' '+T('кг')+'</b><small>'+pr.r+' '+T('повт.')+' · '+fmtDate(pr.d)+'</small></div>'+
          '<div><span>'+T('Зараз')+'</span><b class="num">'+fw(last.w)+' '+T('кг')+'</b><small>'+(diff?(diff>0?'+':'')+fw(diff)+' '+T('кг з')+' '+fmtDate(first.d)+(first.d.slice(0,4)!==last.d.slice(0,4)?' '+first.d.slice(0,4):''):T('без змін'))+'</small></div></div>'+
          lineChart(pts.slice(-30).map(function(p){return {d:p.d,v:p.w}}),T('кг'),col);
      }
    }
    h+=similarHTML(id);
    h+='<div class="sec pks">'+T('Моє')+'</div><div class="pkf">'+
      '<label for="exsetup">'+T('Налаштування тренажера')+'<input class="in" id="exsetup" type="text" autocomplete="off" placeholder="'+T('Наприклад: сидіння 5, спинка 3')+'" value="'+esc(personal(id,'setup'))+'" data-ex="'+id+'"></label>'+
      '<label for="exnote">'+T('Нотатка')+'<textarea class="in" id="exnote" rows="2" placeholder="'+T('Наприклад: лікті не нижче 90°')+'" data-ex="'+id+'">'+esc(personal(id,'note'))+'</textarea></label>'+
      '<p class="pkerr" id="exnmsg" role="status"></p></div>';
    if(G)h+='<p class="sync">'+esc(LANG==='en'?'Warm up for 5–10 minutes before training. Make the first set light. Joint pain (not muscle fatigue) is a signal to stop.':G.GENERAL)+'</p>';
    return h;
  }
  // Схожі вправи: спільні основні м'язи (з описів вправ)
  function similar(id){
    var G=window.GymInfo,a=G&&G.get(id);if(!a)return [];
    var pa=a.m.filter(function(k){return k!=='cardio'}),cardio=a.m.indexOf('cardio')>=0;
    return Object.keys(EX).filter(function(x){return x!==id&&G.get(x)}).map(function(x){
      var b=G.get(x),pb=b.m.filter(function(k){return k!=='cardio'});
      var sh=pa.filter(function(k){return pb.indexOf(k)>=0}).length,sh2=b.m2.filter(function(k){return pa.indexOf(k)>=0}).length;
      if(cardio!==(b.m.indexOf('cardio')>=0))return null;
      return sh?{id:x,score:sh*10+sh2,shared:pa.filter(function(k){return pb.indexOf(k)>=0})}:null;
    }).filter(Boolean).sort(function(p,q){return q.score-p.score}).slice(0,6);
  }
  function similarHTML(id,swapOnly){
    var list=similar(id);if(swapOnly)list=list.filter(function(o){return !cur.ex[o.id]});if(!list.length)return '';
    var G=window.GymInfo,nm=LANG==='en'?G.NAMES_EN:G.NAMES,d=EX[id],h='';
    // у тому самому дні вже є вправа на ці м'язи
    var same=list.filter(function(o){return (EX[o.id].days||[]).some(function(k){return (d.days||[]).indexOf(k)>=0})});
    if(!swapOnly)h+='<div class="sec pks">'+T('Схожі вправи')+'</div>';
    if(same.length&&!swapOnly)h+='<p class="dup">⚠ '+T('У тому самому дні вже є вправи на ці м’язи')+': '+esc(same.map(function(o){return EX[o.id].n}).join(', '))+'. '+T('Це нормально, якщо так задумано, але легко перевантажити ті самі м’язи.')+'</p>';
    var canSwap=cur&&view==='workout'&&cur.ex[id]&&!locked();
    h+='<div class="hist">';
    list.forEach(function(o){
      var dn=(EX[o.id].days||[]).map(function(k){return DAYS[k]?DAYS[k].n:''}).filter(Boolean).join(', ');
      h+='<div class="hrow sim"><button class="simn" data-act="info" data-ex="'+o.id+'"><b>'+esc(EX[o.id].n)+newBadge(o.id)+'</b><small>'+esc(o.shared.map(function(k){return nm[k]||k}).join(', '))+(dn?' · '+esc(dn):'')+'</small></button>'+
        (canSwap&&!cur.ex[o.id]?'<button class="retry swp" data-act="swap" data-ex="'+o.id+'" data-from="'+id+'">'+T('Замінити')+'</button>':'')+'</div>';
    });
    h+='</div>';
    if(canSwap&&!swapOnly)h+='<p class="sync">'+T('«Замінити» ставить схожу вправу замість цієї лише в цьому тренуванні — коли тренажер зайнятий чи зламаний.')+'</p>';
    return h;
  }
  function dayColorOf(id){
    if(cur&&DAYS[cur.day]&&cur.day!=='X')return DAYS[cur.day].color;
    var d=EX[id];return d&&d.days&&d.days[0]&&DAYS[d.days[0]]?DAYS[d.days[0]].color:'var(--accent)';
  }
  // налаштування й нотатка: на телефоні одразу, у таблицю (колонки «Налаштування», «Нотатка»), коли є зв’язок
  function savePersonal(id,f,v){
    var o=exNote[id]||(exNote[id]={});o[f]=v;o.pending=true;o.at=Date.now();saveExNote();
    return pushPersonal(id);
  }
  function pushPersonal(id){
    var o=exNote[id];if(!o||!o.pending||!cfg.url)return Promise.resolve(false);
    var jobs=[];
    if(o.setup!=null)jobs.push(api('setExerciseField',{id:id,field:'Налаштування',value:o.setup}));
    if(o.note!=null)jobs.push(api('setExerciseField',{id:id,field:'Нотатка',value:o.note}));
    return Promise.all(jobs).then(function(){o.pending=false;saveExNote();return true},function(){return false});
  }
  pk.addEventListener('change',function(e){
    var el=e.target;if(el.id!=='exsetup'&&el.id!=='exnote')return;
    var id=el.getAttribute('data-ex'),m=document.getElementById('exnmsg');
    savePersonal(id,el.id==='exsetup'?'setup':'note',String(el.value).trim()).then(function(ok){
      if(m){m.className='pkerr okc';m.textContent=ok?T('Збережено в таблицю.'):T('Збережено на телефоні.')}
    });
  });
  function exHistory(id){
    return Object.keys(sessions).map(function(k){return sessions[k]})
      .filter(function(s){return s.finished&&s.ex&&s.ex[id]&&anyDone(s.ex[id])})
      .sort(function(a,b){return a.date<b.date?1:-1}).slice(0,6);
  }
  function openInfo(id){
    var d=EX[id];if(!d)return;
    var q=ytQuery(id);
    var h='<div class="pkp" role="dialog" aria-label="'+esc(d.n)+'"><div class="pkh"><h2>'+esc(d.n)+T('</h2><button class="back" data-act="pclose" aria-label="Закрити">×</button></div>');
    var sub=[];
    if(d.j&&normName(d.j)!==normName(d.n))sub.push(d.j);
    if(d.tag&&normName(d.tag)!==normName(d.j))sub.push(d.tag);
    if(sub.length)h+='<p class="sync">'+esc(sub.join(' · '))+'</p>';
    if(isNewEx(id))h+='<p class="newp"><span class="newb">New</span> '+(d.sugOnly&&!(d.days||[]).length&&(d.sug||[]).length?T('Пропоную додати в день')+': '+esc(d.sug.map(function(k){return DAYS[k]?DAYS[k].n:''}).filter(Boolean).join(', '))+'.':T('Нова вправа в програмі.'))+'</p>';
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
    if(cur&&view==='workout'&&!cur.ex[id]&&!locked())h+='<button class="cta" data-act="exadd" data-ex="'+id+'">'+T('Додати в це тренування')+'</button>';
    h+=infoMore(id);
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
  var EDIT_ACTS={set:1,cardio:1,wm:1,wp:1,later:1,rmx:1,padd:1,ord:1,omv:1,ofreq:1,osave:1,exadd:1,ppick:1,pnew:1};
  var lpFired=0,lpT=null,lpXY=null;
  app.addEventListener('pointerdown',function(e){
    var pl=e.target.closest&&e.target.closest('.plate');
    if(!pl||pl.disabled||view!=='workout'||locked())return;
    lpXY=[e.clientX,e.clientY];
    clearTimeout(lpT);
    lpT=setTimeout(function(){lpFired=Date.now();try{navigator.vibrate&&navigator.vibrate(15)}catch(er){}openSetEditor(pl.getAttribute('data-ex'),parseInt(pl.getAttribute('data-i'),10))},480);
  });
  ['pointerup','pointercancel','pointerleave'].forEach(function(t){app.addEventListener(t,function(){clearTimeout(lpT)})});
  app.addEventListener('pointermove',function(e){if(lpXY&&(Math.abs(e.clientX-lpXY[0])>10||Math.abs(e.clientY-lpXY[1])>10))clearTimeout(lpT)});
  app.addEventListener('contextmenu',function(e){if(e.target.closest&&e.target.closest('.plate'))e.preventDefault()});
  function openSetEditor(id,i){
    var d=EX[id],x=cur&&cur.ex[id]&&cur.ex[id][i];if(!d||!x)return;
    var h='<div class="pkp" role="dialog" aria-label="'+esc(d.n)+'"><div class="pkh"><h2>'+esc(d.n)+'</h2><button class="back" data-act="pclose" aria-label="'+T('Закрити')+'">×</button></div>'+
      '<p class="sync">'+T('Підхід ')+(i+1)+(x.done?' · '+T('виконано'):'')+'</p><div class="pkf">'+
      '<div class="pkg two"><label for="sw">'+T('Вага, кг')+'<input class="in" id="sw" type="text" inputmode="decimal" value="'+fw(x.w)+'"></label>'+
      '<label for="sr">'+T('Повтори')+'<input class="in" id="sr" type="number" inputmode="numeric" min="1" max="100" value="'+repsOf(id,i,x)+'"></label></div>'+
      '<div class="steps">'+['-5','-2.5','+2.5','+5'].map(function(v){return '<button class="retry" data-act="sws" data-v="'+v+'">'+v.replace('.',T(','))+'</button>'}).join('')+'</div>'+
      '<label class="chk"><input type="checkbox" id="snext" checked> '+T('Також для наступних невиконаних підходів')+'</label>'+
      '<button class="cta" data-act="ssave" data-ex="'+id+'" data-i="'+i+'">'+T('Зберегти')+'</button></div></div>';
    pk.innerHTML=h;pk.hidden=false;
  }
  function onClick(e){
    if(e.target.closest&&e.target.closest('.odrag'))return;
    var lb=e.target.closest&&e.target.closest('[data-act]');
    if(lb&&view==='workout'&&locked()&&EDIT_ACTS[lb.getAttribute('data-act')])return;
    if(Date.now()-dragJustEnded<350)return;
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
    }else if(act==='home'){
      // вийшли з редагування: збережені зміни все одно йдуть у таблицю
      if(cur&&cur.editing){var ek=cur;delete ek.editing;if(ek._chg){delete ek._chg;ek.needSheet=true;touch(ek);hideRest();renderHome();sendToSheet(ek);return}touch(ek)}
      hideRest();renderHome();
    }
    else if(act==='edit'){if(cur&&cur.finished){cur.editing=true;renderWorkoutKeep()}}
    else if(act==='set'){
      if(Date.now()-lpFired<700)return;
      var i=parseInt(b.getAttribute('data-i'),10),x=cur.ex[id][i];
      x.done=!x.done;if(x.done)x.t=Date.now();else delete x.t;touch(cur);refreshCard(id);
      var focusSel='#c-'+id+' .plate[data-i="'+i+'"]';
      var nb=document.querySelector(focusSel);if(nb&&document.activeElement!==nb)try{nb.focus({preventScroll:true})}catch(er){}
      if(x.done){
        // суперсет: поки в іншій вправі групи цей підхід не зроблено — без відпочинку, одразу до неї
        var sm=grpMembers(cur,id,'ss'),nextEx=sm.filter(function(y){return y!==id&&cur.ex[y][i]&&!cur.ex[y][i].done})[0];
        if(sm.length>1&&nextEx){hideRest();toast(T('Тепер: ')+EX[nextEx].n)}
        else if(setsDone(cur)<setsTotal(cur))startRest();
      }
      else hideRest();
    }
    else if(act==='alt'){
      var gfirst=b.getAttribute('data-g'),ag=EX[id].alt;
      cur.alt=cur.alt||{};cur.alt[ag]=id;
      // обрана вправа одна: відмітки з інших варіантів знімаються
      grpMembers(cur,id,'alt').forEach(function(y){if(y!==id)cur.ex[y].forEach(function(q){q.done=false;delete q.t})});
      touch(cur);
      var gEl=document.getElementById('g-'+gfirst);if(gEl)gEl.outerHTML=altHTML(grpMembers(cur,id,'alt'));progress();
    }else if(act==='cardio'){
      var c=cur.ex[id][0];c.done=!c.done;if(c.done)c.t=Date.now();else delete c.t;touch(cur);refreshCard(id);
    }else if(act==='wm')stepWeight(id,-1);
    else if(act==='wp')stepWeight(id,1);
    else if(act==='finish'){
      if(!cur||cur.draft)return;
      if(cur.editing){delete cur.editing;delete cur._chg}
      finishSession(cur);hideRest();
      bkFocus=cur.key;var fk=cur;renderHome();sendToSheet(fk);
    }
    else if(act==='rfin'){
      var rs=sessions[b.getAttribute('data-key')];if(!rs)return;
      finishSession(rs);bkFocus=rs.key;renderHome();sendToSheet(rs);
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
    else if(act==='prompt')openPrompt();
    else if(act==='swapl'){
      var sd=EX[id];if(!sd)return;
      pk.innerHTML='<div class="pkp" role="dialog" aria-label="'+T('Замінити')+'"><div class="pkh"><h2>'+T('Замінити')+'</h2><button class="back" data-act="pclose" aria-label="'+T('Закрити')+'">×</button></div>'+
        '<p class="sync">'+T('Тренажер зайнятий чи зламаний? Вправи на ті самі м’язи замість «')+esc(sd.n)+'». '+T('Ставиться лише в це тренування.')+'</p>'+similarHTML(id,true)+'</div>';
      pk.hidden=false;
    }
    else if(act==='swap'){
      var from=b.getAttribute('data-from');if(!cur||!cur.ex[from]||cur.ex[id])return;
      var ord=sIds(cur),pos=ord.indexOf(from);
      addEx(id);
      // поточну прибираємо, якщо в ній ще нічого не відмічено
      if(!anyDone(cur.ex[from])){delete cur.ex[from];cur.extra=(cur.extra||[]).filter(function(x){return x!==from});ord.splice(pos,1,id)}
      else ord.splice(pos+1,0,id);
      cur.order=ord.filter(function(x,i){return ord.indexOf(x)===i&&cur.ex[x]});touch(cur);
      closePicker();renderWorkoutKeep();toast(T('Замінено на ')+EX[id].n);
    }
    else if(act==='pcopy'){
      var ta=document.getElementById('ptxt'),pm=document.getElementById('pmsg');
      var done2=function(ok){if(pm){pm.className='pkerr'+(ok?' okc':'');pm.textContent=ok?T('Скопійовано. Вставте в AI-чат.'):T('Не вдалося скопіювати — виділіть текст і скопіюйте вручну.')}};
      try{navigator.clipboard.writeText(ta.value).then(function(){done2(true)},function(){ta.removeAttribute('readonly');ta.select();done2(false)})}catch(er){ta.select();done2(false)}
    }
    else if(act==='pshare'){try{navigator.share({text:document.getElementById('ptxt').value}).catch(function(){})}catch(er){}}
    else if(act==='wadd'){
      var kg=parseFloat(String(document.getElementById('pwkg').value).replace(',','.')),wa=parseFloat(String(document.getElementById('pwwaist').value).replace(',','.')),wd=document.getElementById('pwdate').value||todayISO(),wm=document.getElementById('pwmsg');
      if(isNaN(kg)||kg<25||kg>350){wm.className='pkerr';wm.textContent=T('Введіть вагу в кілограмах, наприклад 82,5.');return}
      PF.weights=PF.weights.filter(function(x){return x.d!==wd});PF.weights.push({d:wd,kg:Math.round(kg*10)/10,waist:isNaN(wa)?'':Math.round(wa*10)/10});
      saveProfileLocal();renderMe();toast(T('Вагу записано'));
    }
    else if(act==='wdel'){var dd2=b.getAttribute('data-d');PF.weights=PF.weights.filter(function(x){return x.d!==dd2});saveProfileLocal();var y3=window.scrollY;renderMe();window.scrollTo(0,y3)}
    else if(act==='sws'){var swi=document.getElementById('sw'),sv=parseFloat(String(swi.value).replace(',','.'))||0;swi.value=fw(Math.max(0,Math.round((sv+parseFloat(b.getAttribute('data-v')))*100)/100))}
    else if(act==='ssave'){
      var si=parseInt(b.getAttribute('data-i'),10),arr2=cur.ex[id],nw=parseFloat(String(document.getElementById('sw').value).replace(',','.')),nr=parseInt(document.getElementById('sr').value,10);
      if(isNaN(nw)||nw<0)nw=arr2[si].w;if(!(nr>0))nr=repsOf(id,si,arr2[si]);
      var nx=document.getElementById('snext').checked;
      arr2.forEach(function(q,j){if(j===si||(nx&&j>si&&!q.done)){q.w=nw;if(j===si||q.r!=null||nr!==repsOf(id,j,q))q.r=nr}});
      touch(cur);closePicker();refreshCard(id);
    }
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
      // тренажер зайнятий: вправа (або вся її група) йде в кінець списку цього тренування
      var grpL=grpMembers(cur,id,'ss').length>1?grpMembers(cur,id,'ss'):grpMembers(cur,id,'alt');
      if(grpL.length>1){cur.order=sIds(cur).filter(function(x){return grpL.indexOf(x)<0}).concat(grpL);touch(cur);renderWorkoutKeep();return}
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
  app.addEventListener('toggle',function(e){
    var g=e.target;if(!g.classList||!g.classList.contains('exg'))return;
    var q=document.getElementById('exq');if(q&&q.value)return;
    exOpen[g.getAttribute('data-g')]=g.open;
  },true);
  app.addEventListener('input',function(e){
    if(e.target.id!=='exq')return;
    var q=normName(e.target.value);
    app.querySelectorAll('.exr').forEach(function(r){r.hidden=!!q&&r.getAttribute('data-n').indexOf(q)<0});
    // під час пошуку категорії з результатами розгортаються, після очищення — як були
    app.querySelectorAll('.exg').forEach(function(g){
      var has=!!g.querySelector('.exr:not([hidden])');
      g.hidden=!has;
      g.open=q?has:!!exOpen[g.getAttribute('data-g')];
    });
  });
  pk.addEventListener('click',onClick);
  pk.addEventListener('input',function(e){
    if(e.target.id!=='pkq')return;
    var q=norm(e.target.value);
    pk.querySelectorAll('.pkr').forEach(function(r){r.hidden=!!q&&r.getAttribute('data-n').indexOf(q)<0});
  });
  app.addEventListener('change',function(e){
    var el=e.target;
    if(el.tagName!=='INPUT'||!cur||locked())return;
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
    if(e.touches.length!==1||(e.target.closest&&e.target.closest('#cal,input,.orow,.odrag'))){sx=null;return}
    sx=e.touches[0].clientX;sy=e.touches[0].clientY;
  },{passive:true});
  app.addEventListener('touchend',function(e){
    if(sx==null)return;
    var t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;sx=null;
    if(dragging||Date.now()-dragJustEnded<350||Math.abs(dx)<70||Math.abs(dx)<Math.abs(dy)*1.8||!pk.hidden)return;
    // як у звичайних вкладках: палець вліво — наступна вкладка праворуч, вправо — попередня
    var order=['home','exlist','plan','me'],fn={home:renderHome,exlist:renderExList,plan:renderPlan,me:renderMe};
    var i=order.indexOf(view);if(i<0)return;
    var j=i+(dx<0?1:-1);if(j>=0&&j<order.length)fn[order[j]]();
  },{passive:true});
  app.addEventListener('touchend',function(e){
    if(tx==null)return;
    var t=e.changedTouches[0],dx=t.clientX-tx,dy=t.clientY-ty;tx=null;
    if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.5)calShift(dx<0?1:-1);
  },{passive:true});
  window.addEventListener('online',function(){loadProgram().then(syncPending).then(autoImport)});
  document.addEventListener('visibilitychange',function(){if(!document.hidden){autoFinish();syncPending().then(autoImport)}});
  Object.keys(sessions).forEach(function(k){var s=sessions[k];if(s.editing){delete s.editing;if(s._chg){delete s._chg;s.needSheet=true}}});
  autoFinish();
  loadProgram().then(syncPending).then(autoImport).then(loadProfile).then(pushProfile).then(checkScript);
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
