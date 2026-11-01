(function(){
  'use strict';
  var APP_VERSION='10 · 1 лист. 2026';
  /* ---------- програма тренувань ----------
     Джерело правди — вкладки «Програма» і «Дні» в таблиці. Нижче — стартова програма,
     з якої ці вкладки створюються, і яку апка використовує, доки таблицю не підключено. */
  var PROG_HEAD=['Назва в журналі','Назва в апці','Тип','Дні','Підходи','Повтори','Вага','Примітка','ID'];
  var DAYS_HEAD=['№','Назва','Опис','Колір','Іконка'];
  var BUILTIN={
    days:[
      ['1','Ноги','ноги, підтягування, бруси','#ff9900','ноги'],
      ['2','Плечі та спина','плечі, спина, підтягування','#4a86e8','плечі, спина'],
      ['3','Груди та руки','груди, біцепс, трицепс','#9900ff','груди, руки']
    ],
    ex:[
      ['elipse','Еліпс','кардіо','1, 2, 3','','хв; нахил; рівень','','15*10*7','ell'],
      ['bike','Велосипед','кардіо','1, 2, 3','','хв','','20 min','bike'],
      ['low back','Низ спини','сила','1, 2, 3','3','15','77','low back','lowb'],
      ['back extension','Гіперекстензія','сила','1, 2, 3','3','15','77','back extension','bext'],
      ['abdominal/прес лежачи','Прес лежачи','сила','1, 3','3','15','0','вага 0 = своя вага','abs'],
      ['P14 abdominal crunch/пресс на станку, згинання','Скручування на тренажері','сила','1, 2, 3','3','15','59','P14','crunch'],
      ['chin/підтягування','Підтягування','сила','1, 2','3','8','20','chin','chin'],
      ['dip/бруси','Бруси','сила','1, 2','3','10','20','dip','dip'],
      ['converting shoulder press/ жим вгору станок','Жим вгору на тренажері','сила','2','3','10','23','shoulder press','shp'],
      ['seated row','Тяга сидячи','сила','2','2','10','36','seated row','srow'],
      ['P22 rotary torso/боки, повороти','Повороти корпусу','сила','2','3','10','50','P22 rotary torso','rot'],
      ['rear delt','Задня дельта','сила','2','3','10','39','rear delt','rear'],
      ['P20 lateral raise/плечі','Махи в сторони','сила','2','3','10','45','P20 lateral raise','lat'],
      ['P6 diverging seated row','Розвідна тяга сидячи','сила','2','3','10','45','P6 diverging seated row','drow'],
      ['lat pulldown','Тяга верхнього блоку','сила','2','3','10','45','lat pulldown','pull'],
      ['жим лежачи','Жим лежачи','сила','3','3','10','30','','bench'],
      ['біцепс гнута штанга','Біцепс зі штангою','сила','3','3','10','20','гнута штанга','bbic'],
      ['жим лежачи під кутом','Жим лежачи під кутом','сила','3','3','10','20','','incl'],
      ['біцепс гантелі','Біцепс з гантелями','сила','3','3','10','15','','dbic'],
      ['triceps pressdown','Трицепс на блоці','сила','3','3','10','18','triceps pressdown','tri'],
      ['тріцепс за голову','Трицепс за головою','сила','3','3','10','7.5; 10; 10','','tri2'],
      ['low row','Нижня тяга','сила','3','3','10','45','low row','lrow'],
      ['leg extension  (5,1,3)','Розгинання ніг','сила','1','3','10','36','налаштування 5, 1, 3','lext'],
      ['leg curl','Згинання ніг','сила','1','3','10','36','leg curl','lcurl'],
      ['hip adductor / в середину ><','Зведення ніг','сила','1','3','10','43','hip adductor, до середини','add'],
      ['hip abductor / назовні  <>','Розведення ніг','сила','1','3','15','50','hip abductor, назовні','abd'],
      ['glute','Сідничні','сила','1','3','10','32','glute','glute'],
      ['hack squat/присідання під кутом','Присідання під кутом','сила','1','3','10','30','hack squat','hack'],
      ['ікри стоячи','Ікри стоячи','сила','1','3','10','50','','calfs'],
      ['ікри сидячи','Ікри сидячи','сила','1','3','15','30','','calft'],
      ['prone leg curl / лежачи','Згинання ніг лежачи','сила','1','3','10','32','prone leg curl','plc'],
      ['leg press (4)','Жим ногами','сила','1','3','15','59','налаштування 4','lpress']
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
    var j=String(r[0]||'').trim(),n=String(r[1]||'').trim()||j,type=normName(r[2]),note=String(r[7]||'').trim(),id=String(r[8]||'').trim();
    if(!j&&!n)return null;
    if(!id)id='n:'+normName(j||n);
    var days=String(r[3]||'').split(/[^\d]+/).map(dayKey).filter(Boolean);
    var d={n:n,j:j||n,days:days};
    if(type.indexOf('кард')===0||type==='cardio'){
      // кардіо: у «Примітці» план як у журналі (15*10*7 або 20 min), у «Повторах» — назви полів через «;»
      d.t='cardio';d.sh=note||'';d.d=note||'';
      var nums=cfNums(note);d.cf=nums.length?nums:[20];
      d.min=nums.length===1&&/min|хв/i.test(note);
      var lab=String(r[5]||'').split(/\s*[;,]\s*/).map(function(x){return x.trim()}).filter(Boolean);
      d.lab=lab.length>=d.cf.length?lab.slice(0,d.cf.length):({1:['хв'],2:['хв','нахил'],3:['хв','нахил','рівень']}[d.cf.length]||d.cf.map(function(_,i){return '#'+(i+1)}));
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
      DAYS[k]={n:String(r[1]||'День '+r[0]).trim(),num:parseInt(r[0],10),sub:String(r[2]||'').trim(),ids:[],color:col,icon:String(r[4]||'').trim()};
      DAYKEYS.push(k);
    });
    if(!DAYKEYS.length&&dayRows!==BUILTIN.days)return applyProgram({days:BUILTIN.days,ex:exRows});
    exRows.forEach(function(r){
      var e=exFromRow(r);if(!e||EX[e.id])return;
      EX[e.id]=e.d;NAME2ID[normName(e.d.j)]=e.id;
      e.d.days.forEach(function(k){if(DAYS[k])DAYS[k].ids.push(e.id)});
    });
    DAYS.X={n:'Тренування',num:'·',sub:'без чіткого дня',ids:[],color:'#cccccc'};
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
  try{var p0=JSON.parse(lsGet(LSP)||'null');if(p0&&p0.ex&&p0.ex.length)applyProgram(p0)}catch(e){}
  function saveLib(){lsSet(LSL,JSON.stringify(custom))}
  mergeCustom();
  function dayOf(k){return DAYS[k]||DAYS.X}
  function sIds(s){
    var ids=dayOf(s.day).ids.concat(s.extra||[]);
    // вправи, які вже записані в тренуванні, показуємо, навіть якщо їх прибрали з програми
    Object.keys(s.ex||{}).forEach(function(id){if(ids.indexOf(id)<0)ids.push(id)});
    return ids;
  }
  restSec=parseInt(lsGet(LSR)||'90',10)||90;

  function todayISO(){var d=new Date();return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2)}
  function fmtDate(iso){return new Date(iso+'T12:00:00').toLocaleDateString('uk-UA',{day:'numeric',month:'short'})}
  function ago(iso){
    var a=new Date(iso+'T12:00:00'),b=new Date(todayISO()+'T12:00:00');
    var n=Math.round((b-a)/86400000);
    return n<=0?'сьогодні':n===1?'вчора':n+' дн. тому';
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
    var prev=lastFinished(day), ex={};
    DAYS[day].ids.forEach(function(id){
      var d=EX[id];
      var p=prev&&prev.ex[id];
      if(d.t==='cardio'){ex[id]=[{done:false,v:p&&p[0]?cfVals(id,p[0]):d.cf.slice()}];return}
      ex[id]=d.s.map(function(x,i){var q=p&&(p[i]||p[p.length-1]);return {w:(q&&typeof q.w==='number')?q.w:x[1],done:false}});
    });
    var date=todayISO();
    return {key:date+'_'+day,day:day,date:date,started:Date.now(),finished:0,updated:Date.now(),ex:ex,extra:[]};
  }

  /* ---------- local storage ---------- */
  function touch(s){s.updated=Date.now();saveLocal()}
  function touchLib(id){var d=custom[id];if(!d)return;d.updated=Date.now();saveLib()}

  /* ---------- backup to Google Sheets ---------- */
  var bk={}, bkFocus=null;
  function esc(t){return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
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
    if(c==='no_config')return 'Таблицю не підключено. Натисніть ⚙ угорі й вставте адресу скрипта.';
    if(c==='offline')return 'Немає інтернету. Запишу в таблицю, щойно з’явиться мережа.';
    if(c==='bad_token')return 'Ключ не збігається з ключем у скрипті. Перевірте налаштування (⚙).';
    if(c==='not_json')return 'Скрипт відповів не так, як очікувалось. Перевірте, що його опубліковано як веб-застосунок з доступом «Anyone».';
    if(c==='timeout')return 'Таблиця не відповіла вчасно. Спробуйте ще раз.';
    if(c==='network'||c==='http')return 'Не вдалося з’єднатися з таблицею. Перевірте адресу скрипта та інтернет.';
    return 'Помилка таблиці: '+((e&&e.message)||c);
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
    if(!b&&s.needSheet)b={state:'wait',msg:'Ще не записано в таблицю.'};
    else if(!b&&s.sheetAt)b={state:'ok',msg:(s.imported?'З таблиці, стовпець ':'Записано в таблицю, стовпець ')+colLetter(s.sheetCol)+'.'+(s.dateFix?' Дата в таблиці: '+s.rawDate+'.':'')};
    var h=b?'<p class="bkm '+b.state+'">'+esc(b.msg)+'</p>':'';
    if(!b||b.state==='err'||b.state==='wait')h+='<button class="retry" data-act="bk" data-key="'+s.key+'">'+(b&&b.state==='err'?'Спробувати ще раз':'Записати в таблицю')+'</button>';
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
    setBk(k,'busy','Записую в таблицю…');
    return api('write',payloadFor(s)).then(function(j){
      s.sheetCol=j.col-1;
      (j.rows||[]).forEach(function(r){var id=nameToId(r.name);if(id&&EX[id].custom&&EX[id].row!==r.row){EX[id].row=r.row;touchLib(id)}});
      s.sheetAt=Date.now();s.needSheet=false;touch(s);
      var L=colLetter(s.sheetCol);
      delete bk[k];
      setBk(k,'ok',j.reused?'Оновлено стовпець '+L+' у таблиці.':'Записано в таблицю, стовпець '+L+'.');
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
    if(!exs.length&&!list.length)return Promise.resolve();
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
        return [r[0],r[1],r[2],r[3],b?b[4]:''];
      });
      var p={days:days,ex:canon(j.progHead,j.ex,PROG_HEAD),at:Date.now()};
      lsSet(LSP,JSON.stringify(p));
      applyProgram(p);mergeCustom();
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
    if(!impState||impState.state!=='busy')h+='<button class="retry" data-act="imp">'+(hasImp?'Оновити історію з таблиці':'Імпортувати історію з таблиці')+'</button>';
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
    setImp('busy','Читаю таблицю…');
    loadProgram().then(function(){return api('read')}).then(function(j){
        var g=gridFromApi(j);
        if(!g.values.length){setImp('err','Таблиця порожня або недоступна.');return}
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
        var msg='Імпортовано тренувань: '+added+'. Незафарбовані клітинки ('+r.skipped+') пораховано як пропущені.';
        if(fixed)msg+=' Виправлено дат: '+fixed+' (позначені ≈, якщо дата приблизна).';
        if(skipped)msg+=' Пропущено '+skipped+', бо вони вже є в апці.';
        if(r.bad)msg+=' Не вдалося розібрати клітинок: '+r.bad+'.';
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
    var title=first.toLocaleDateString('uk-UA',{month:'long'});
    title=title.charAt(0).toUpperCase()+title.slice(1);
    var h='<div class="calh"><button class="calb" data-act="calp" aria-label="Попередній місяць">‹</button>'+
      '<div class="calt">'+title+' '+y+'<small>'+(cnt?cnt+' '+plural(cnt,'тренування','тренування','тренувань'):'без тренувань')+'</small></div>'+
      '<button class="calb" data-act="caln" aria-label="Наступний місяць">›</button></div><div class="calg">';
    ['Пн','Вт','Ср','Чт','Пт','Сб','Нд'].forEach(function(w){h+='<div class="calw">'+w+'</div>'});
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
  function plural(n,one,few,many){var a=n%10,b=n%100;return a===1&&b!==11?one:a>=2&&a<=4&&(b<10||b>=20)?few:many}
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
    var h='<div class="top"><div class="tt"><h1 class="brand">Gym Log</h1><div class="date">'+new Date().toLocaleDateString('uk-UA',{weekday:'long',day:'numeric',month:'long'})+'</div></div><button class="gear" data-act="cfg" aria-label="Налаштування таблиці">⚙</button></div>';
    if(!cfg.url)h+='<button class="resume" data-act="cfg"><div><b>Підключіть таблицю</b><div class="tag">Щоб підтягнути історію й зберігати резервну копію</div></div><span>Налаштувати</span></button>';
    if(bkFocus&&sessions[bkFocus])h+='<div id="bkbox" class="bkbox" data-key="'+bkFocus+'">'+bkInner(sessions[bkFocus])+'</div>';
    if(open){
      h+='<div class="resume rs2" id="resume"><button class="rmain" data-act="open" data-key="'+open.key+'"><div><b>Тренування триває</b><div class="tag">'+dayOf(open.day).n+' · '+setsDone(open)+' з '+setsTotal(open)+' підходів</div></div><span>Продовжити</span></button>'+
        '<button class="rx" data-act="rdel" data-key="'+open.key+'" aria-label="Видалити незавершене тренування">✕</button></div>';
    }
    h+='<div class="hero"><div class="big">'+badge(dd)+'</div><div class="kick">Наступне за чергою</div><h2>'+dd.n+'</h2><div class="meta">'+dd.ids.length+' вправ · останнє '+fmtDate(lastDate(nd))+'</div><button class="cta" data-act="start" data-day="'+nd+'">Почати тренування</button></div>';
    h+='<div><div class="sec">Усі дні</div><div class="rows">';
    DAYKEYS.forEach(function(k){
      var d=DAYS[k],l=lastDate(k);
      h+='<button class="row'+(k===nd?' next':'')+'" data-act="start" data-day="'+k+'"><div class="dn">'+badge(d)+'</div><div><div class="rn">'+d.n+'</div><div class="rs">'+d.sub+'</div></div><div class="rr">'+fmtDate(l)+'<br>'+ago(l)+'</div></button>';
    });
    h+='</div></div>';
    h+='<div><div class="sec">Календар</div><div class="cal" id="cal">'+calHTML()+'</div></div>';
    var all=Object.keys(sessions).map(function(k){return sessions[k]}).filter(function(s){return s.finished&&DAYS[s.day]}).sort(function(a,b){return a.date<b.date?1:a.date>b.date?-1:b.finished-a.finished});
    var hasImp=all.some(function(s){return s.imported});
    var fin=showAll?all:all.slice(0,12);
    h+='<div><div class="sec">Журнал'+(all.length?' · '+all.length:'')+'</div><div class="rows">';
    if(!fin.length)h+='<div class="empty">Тут з’являться завершені тренування. Щоб підтягнути всі попередні, імпортуйте їх з таблиці.</div>';
    var lastY=null;
    fin.forEach(function(s){
      var y=s.date.slice(0,4);
      if(lastY&&y!==lastY)h+='<div class="yr">'+y+'</div>';
      lastY=y;
      h+='<button class="row" data-act="open" data-key="'+s.key+'"><div class="dn">'+badge(DAYS[s.day])+'</div><div><div class="rn">'+DAYS[s.day].n+'</div><div class="rs num">'+setsDone(s)+' підходів · '+volume(s).toLocaleString('uk-UA')+' кг'+(s.imported?'':s.sheetAt?' · в таблиці':'')+'</div></div><div class="rr">'+(s.dateFix==='est'?'≈ ':'')+fmtDate(s.date)+(y!==todayISO().slice(0,4)?'<br>'+y:'')+'</div></button>';
    });
    h+='</div>';
    if(all.length>fin.length)h+='<button class="more" data-act="more">Показати всі ('+all.length+')</button>';
    h+='<div class="imp" id="imp">'+impInner(hasImp)+'</div></div>';
    var pend=Object.keys(sessions).filter(function(k){return sessions[k].finished&&sessions[k].needSheet}).length;
    h+='<p class="sync">Записи зберігаються на цьому телефоні. Після завершення тренування апка додає його в таблицю'+(pend?'. Чекають на запис: '+pend+'.':'.')+'</p>';
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
      (d.lab||['хв']).forEach(function(l,i){
        f+='<label class="cff" for="cf-'+id+'-'+i+'"><span>'+esc(l)+'</span><input id="cf-'+id+'-'+i+'" type="text" inputmode="decimal" autocomplete="off" value="'+(cv[i]!=null?fw(cv[i]):'')+'" data-ex="'+id+'" data-cf="'+i+'"></label>';
      });
      return '<section class="ex'+(on?' fin':'')+'" id="c-'+id+'"><div class="exh"><div><h3>'+esc(d.n)+'</h3></div></div>'+
        '<div class="cardio'+(on?' on':'')+'"><div class="cfr">'+f+'</div>'+
        '<button class="cdone" data-act="cardio" data-ex="'+id+'" aria-pressed="'+on+'">'+(on?'Готово ✓':'Позначити')+'</button></div></section>';
    }
    var all=arr.every(function(x){return x.done});
    var mixed=arr.some(function(x){return x.w!==arr[0].w});
    var p='';
    arr.forEach(function(x,i){
      p+='<button class="plate'+(x.done?' on':'')+'" data-act="set" data-ex="'+id+'" data-i="'+i+'" aria-pressed="'+x.done+'" aria-label="Підхід '+(i+1)+', '+repsOf(id,i,x)+' повторень"><b>'+repsOf(id,i,x)+'</b>'+(mixed?'<small>'+fw(x.w)+'</small>':'')+'</button>';
    });
    return '<section class="ex'+(all?' fin':'')+'" id="c-'+id+'"><div class="exh"><div><h3>'+d.n+'</h3>'+(d.tag?'<p class="tag">'+d.tag+'</p>':'')+
      ((cur.extra||[]).indexOf(id)>=0&&!arr.some(function(x){return x.done})?'<button class="rmx" data-act="rmx" data-ex="'+id+'">Прибрати з тренування</button>':'')+'</div>'+
      '<div class="wt"><button data-act="wm" data-ex="'+id+'" aria-label="Менше">−</button><label><input id="w-'+id+'" type="text" inputmode="decimal" value="'+fw(curW(arr))+'" data-ex="'+id+'" aria-label="Вага, кг"><span>кг</span></label><button data-act="wp" data-ex="'+id+'" aria-label="Більше">+</button></div></div>'+
      '<div class="plates">'+p+'</div></section>';
  }
  function progress(){
    var d=setsDone(cur),t=setsTotal(cur);
    var c=document.getElementById('pc'),b=document.getElementById('pb');
    if(c)c.textContent=d+' / '+t;
    if(b)b.style.width=(t?d/t*100:0)+'%';
    var sm=document.getElementById('sum');
    if(sm)sm.textContent=d+' підходів · '+volume(cur).toLocaleString('uk-UA')+' кг сумарно';
  }
  function renderWorkout(){
    view='workout';
    var dd=dayOf(cur.day);
    var h='<div class="wh"><div class="l1"><button class="back" data-act="home" aria-label="Назад">‹</button><h2>'+dd.n+'</h2><div class="cnt num" id="pc"></div></div><div class="bar"><i id="pb"></i></div></div><div class="list">';
    sIds(cur).forEach(function(id){h+=cardHTML(id)});
    h+='</div><button class="addx" data-act="padd">+ Додати вправу</button><button class="finish" data-act="finish">'+(cur.finished?'Зберегти зміни':'Завершити тренування')+'</button><p class="summary num" id="sum"></p><div id="bkbox" class="bkbox" data-key="'+cur.key+'">'+bkInner(cur)+'</div>';
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
    var d=EX[id],sub=d.custom?(d.s.length+'×'+d.s[0][0]+(d.s[0][1]?' · '+fw(d.s[0][1])+' кг':'')+(d.ready?'':(d.days&&d.days.length&&DAYS[d.days[0]]?' · після завершення стане частиною дня «'+DAYS[d.days[0]].n+'»':' · з’явиться в списку після завершення'))):(dayNamesFor(id).join(', ')||'без дня в програмі');
    return '<button class="pkr" data-act="ppick" data-ex="'+id+'" data-n="'+esc(norm(d.n+' '+(d.tag||'')))+'"><span>'+esc(d.n)+'</span><small>'+esc(sub)+'</small></button>';
  }
  function openPicker(){
    if(!cur)return;
    var L=libList(),h='';
    h+='<div class="pkp" role="dialog" aria-label="Додати вправу"><div class="pkh"><h2>Додати вправу</h2><button class="back" data-act="pclose" aria-label="Закрити">×</button></div>';
    h+='<div class="pkt"><button data-act="ptab" data-tab="l" class="on">З наявних</button><button data-act="ptab" data-tab="n">Нова</button></div>';
    h+='<div id="pk-l"><input class="in" id="pkq" type="search" placeholder="Пошук" autocomplete="off" aria-label="Пошук вправи">';
    if(L.mine.length){h+='<div class="sec pks">Мої вправи</div>';L.mine.forEach(function(id){h+=pkRow(id)})}
    if(L.base.length){h+='<div class="sec pks">Інші дні</div>';L.base.forEach(function(id){h+=pkRow(id)})}
    if(!L.mine.length&&!L.base.length)h+='<p class="empty">Усі наявні вправи вже в цьому тренуванні.</p>';
    h+='</div>';
    h+='<div id="pk-n" class="pkf" hidden><label for="nn">Назва<input class="in" id="nn" type="text" maxlength="60" autocomplete="off" placeholder="Наприклад, молоткові згинання"></label>'+
       '<div class="pkg"><label for="ns">Підходи<input class="in" id="ns" type="number" inputmode="numeric" min="1" max="10" value="3"></label>'+
       '<label for="nr">Повтори<input class="in" id="nr" type="number" inputmode="numeric" min="1" max="100" value="10"></label>'+
       '<label for="nw">Вага, кг<input class="in" id="nw" type="text" inputmode="decimal" value="0"></label></div>'+
       '<p class="pkerr" id="pkerr" role="alert"></p>'+
       '<button class="cta" type="button" data-act="pnew">Створити й додати</button>'+
       '<p class="sync">'+(cur.day!=='X'&&DAYS[cur.day]?'Коли ви завершите тренування, вправа стане частиною дня «'+esc(DAYS[cur.day].n)+'» і з’явиться у вкладці «Програма».':'Коли ви завершите тренування, вправа з’явиться у вкладці «Програма» (без дня).')+' У журналі для неї додасться окремий рядок.</p></div></div>';
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
    if(!nm){if(err)err.textContent='Введіть назву вправи.';return}
    var clash=Object.keys(EX).some(function(id){return norm(EX[id].n)===norm(nm)});
    if(clash){if(err)err.textContent='Вправа з такою назвою вже є. Знайдіть її у вкладці «З наявних».';return}
    var id='x'+Date.now().toString(36);
    // нова вправа належить дню, в якому її створили
    var d={n:nm,j:nm,days:(DAYS[cur.day]&&cur.day!=='X')?[cur.day]:[],s:S(n,r,w),custom:1,from:cur.key,ready:false};
    custom[id]=d;EX[id]=d;touchLib(id);
    addEx(id);closePicker();
  }

  /* ---------- settings ---------- */
  function openSettings(){
    pk.innerHTML='<div class="pkp" role="dialog" aria-label="Налаштування таблиці"><div class="pkh"><h2>Таблиця</h2><button class="back" data-act="pclose" aria-label="Закрити">×</button></div>'+
      '<div class="pkf"><label for="cu">Адреса скрипта (Web app URL)<input class="in" id="cu" type="url" inputmode="url" autocomplete="off" spellcheck="false" placeholder="https://script.google.com/macros/s/…/exec" value="'+esc(cfg.url)+'"></label>'+
      '<label for="ct">Ключ із скрипта<input class="in" id="ct" type="text" autocomplete="off" spellcheck="false" value="'+esc(cfg.token)+'"></label>'+
      '<p class="pkerr" id="cerr" role="status"></p>'+
      '<button class="cta" type="button" data-act="csave">Зберегти й перевірити</button>'+
      '<p class="sync">Адреса й ключ зберігаються тільки на цьому пристрої. Як їх отримати, описано в README репозиторію.</p></div>'+
      '<div class="pkf upd"><div class="sec">Апка</div><p class="sync">Версія '+APP_VERSION+'. Якщо після змін нова версія не з’явилась, оновіть вручну. Тренування й налаштування залишаться.</p>'+
      '<button class="retry" type="button" data-act="upd" id="updb">Оновити апку</button></div></div>';
    pk.hidden=false;
  }
  function saveSettings(){
    var u=String(document.getElementById('cu').value||'').trim(),t=String(document.getElementById('ct').value||'').trim(),m=document.getElementById('cerr');
    m.className='pkerr';
    if(!/^https:\/\/script\.google\.com\/(a\/[^\/]+\/)?macros\/s\/[^\/]+\/exec$/.test(u)){m.textContent='Адреса має виглядати так: https://script.google.com/macros/s/…/exec';return}
    if(!t){m.textContent='Вставте ключ, який ви вписали в скрипт.';return}
    cfg={url:u,token:t};saveCfg();
    m.textContent='Перевіряю…';
    api('ping').then(function(j){
      m.className='pkerr okc';
      m.textContent='З’єднано з таблицею «'+(j.title||'')+'». Завантажую програму…';
      loadProgram().then(function(ok){
        m.textContent='З’єднано з таблицею «'+(j.title||'')+'».'+(ok?' Програму завантажено з вкладки «Програма».':'');
        syncPending();
      });
    },function(e){m.textContent=errText(e)});
  }

  // Примусове оновлення: прибираємо старий кеш і service worker, тягнемо файли заново з мережі.
  // Дані в localStorage (тренування, налаштування) не чіпаємо.
  function updateApp(){
    var b=document.getElementById('updb');
    if(b){b.disabled=true;b.textContent='Оновлюю…'}
    var p=Promise.resolve();
    try{if('serviceWorker' in navigator)p=navigator.serviceWorker.getRegistrations().then(function(rs){return Promise.all(rs.map(function(r){return r.unregister()}))})}catch(e){}
    p.then(function(){return window.caches?caches.keys().then(function(ks){return Promise.all(ks.map(function(k){return caches.delete(k)}))}):null})
     .then(function(){return Promise.all(['./','index.html','app.css','app.js','sw.js','manifest.webmanifest'].map(function(u){return fetch(u,{cache:'reload'}).catch(function(){})}))})
     .catch(function(){})
     .then(function(){location.reload()});
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
    if(left>0){t.textContent=mmss(left);l.textContent='відпочинок';restEl.classList.remove('over');return}
    if(!restEl.classList.contains('over')){
      restEl.classList.add('over');t.textContent='0:00';l.textContent='час наступного підходу';beep();
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
    if(e.target===pk){closePicker();return}
    var b=e.target.closest('[data-act]');
    if(!b||b.tagName==='INPUT')return;
    var act=b.getAttribute('data-act'),id=b.getAttribute('data-ex');
    if(act==='start'){
      var day=b.getAttribute('data-day'),key=todayISO()+'_'+day;
      var s=sessions[key];
      if(!s){s=newSession(day);sessions[key]=s;touch(s)}
      openSession(s);
    }else if(act==='open'){
      var s2=sessions[b.getAttribute('data-key')];if(s2)openSession(s2);
    }else if(act==='home'){hideRest();renderHome()}
    else if(act==='set'){
      var i=parseInt(b.getAttribute('data-i'),10),x=cur.ex[id][i];
      x.done=!x.done;touch(cur);refreshCard(id);
      var focusSel='#c-'+id+' .plate[data-i="'+i+'"]';
      var nb=document.querySelector(focusSel);if(nb&&document.activeElement!==nb)try{nb.focus({preventScroll:true})}catch(er){}
      if(x.done&&setsDone(cur)<setsTotal(cur))startRest();
      else if(!x.done)hideRest();
    }else if(act==='cardio'){
      var c=cur.ex[id][0];c.done=!c.done;touch(cur);refreshCard(id);
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
    else if(act==='rdel'){
      // підтвердження прямо в картці, без системних діалогів
      var rc=document.getElementById('resume'),dk=b.getAttribute('data-key'),ds=sessions[dk];
      if(rc&&ds)rc.innerHTML='<div class="rq"><b>Видалити незавершене тренування?</b><div class="tag">'+esc(dayOf(ds.day).n)+' · відмічено підходів: '+setsDone(ds)+'. У таблиці нічого не зміниться.</div></div>'+
        '<div class="rqb"><button class="retry" data-act="rdelno">Ні</button><button class="retry danger" data-act="rdelyes" data-key="'+dk+'">Видалити</button></div>';
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
  // Офлайн-режим і запис того, що не дійшло до таблиці
  // гортання місяців свайпом по календарю
  var tx=null,ty=null;
  app.addEventListener('touchstart',function(e){var c=e.target.closest&&e.target.closest('#cal');if(!c||e.touches.length!==1){tx=null;return}tx=e.touches[0].clientX;ty=e.touches[0].clientY},{passive:true});
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
      d.textContent='Є нова версія апки. Натисніть, щоб оновити';
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
