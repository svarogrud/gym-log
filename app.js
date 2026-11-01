(function(){
  'use strict';
  var S=function(n,r,w){var a=[];for(var i=0;i<n;i++)a.push([r,w]);return a};

  // Дані взято з таблиці Gym: підходи × повторення × вага
  var EX={
    ell:{n:'Еліпс',t:'cardio',d:'15 · 10 · 7',nt:'значення з таблиці',sh:'15*10*7'},
    bike:{n:'Велосипед',t:'cardio',d:'20 хв',sh:'20 min'},
    lowb:{n:'Низ спини',tag:'low back',s:S(3,15,77)},
    bext:{n:'Гіперекстензія',tag:'back extension',s:S(3,15,77)},
    abs:{n:'Прес лежачи',tag:'вага 0 = своя вага',s:S(3,15,0)},
    crunch:{n:'Скручування на тренажері',tag:'P14',s:S(3,15,59)},
    chin:{n:'Підтягування',tag:'chin',s:S(3,8,20)},
    dip:{n:'Бруси',tag:'dip',s:S(3,10,20)},
    shp:{n:'Жим вгору на тренажері',tag:'shoulder press',s:S(3,10,23)},
    srow:{n:'Тяга сидячи',tag:'seated row',s:S(2,10,36)},
    rot:{n:'Повороти корпусу',tag:'P22 rotary torso',s:S(3,10,50)},
    rear:{n:'Задня дельта',tag:'rear delt',s:S(3,10,39)},
    lat:{n:'Махи в сторони',tag:'P20 lateral raise',s:S(3,10,45)},
    drow:{n:'Розвідна тяга сидячи',tag:'P6 diverging seated row',s:S(3,10,45)},
    pull:{n:'Тяга верхнього блоку',tag:'lat pulldown',s:S(3,10,45)},
    bench:{n:'Жим лежачи',s:S(3,10,30)},
    bbic:{n:'Біцепс зі штангою',tag:'гнута штанга',s:S(3,10,20)},
    incl:{n:'Жим лежачи під кутом',s:S(3,10,20)},
    dbic:{n:'Біцепс з гантелями',s:S(3,10,15)},
    tri:{n:'Трицепс на блоці',tag:'triceps pressdown',s:S(3,10,18)},
    tri2:{n:'Трицепс за головою',s:[[10,7.5],[10,10],[10,10]]},
    lrow:{n:'Нижня тяга',tag:'low row',s:S(3,10,45)},
    lext:{n:'Розгинання ніг',tag:'налаштування 5, 1, 3',s:S(3,10,36)},
    lcurl:{n:'Згинання ніг',tag:'leg curl',s:S(3,10,36)},
    add:{n:'Зведення ніг',tag:'hip adductor, до середини',s:S(3,10,43)},
    abd:{n:'Розведення ніг',tag:'hip abductor, назовні',s:S(3,15,50)},
    glute:{n:'Сідничні',tag:'glute',s:S(3,10,32)},
    hack:{n:'Присідання під кутом',tag:'hack squat',s:S(3,10,30)},
    calfs:{n:'Ікри стоячи',s:S(3,10,50)},
    calft:{n:'Ікри сидячи',s:S(3,15,30)},
    plc:{n:'Згинання ніг лежачи',tag:'prone leg curl',s:S(3,10,32)},
    lpress:{n:'Жим ногами',tag:'налаштування 4',s:S(3,15,59)}
  };
  var DAYS={
    A:{n:'Ноги',num:1,sub:'ноги, підтягування, бруси',ids:['ell','bike','lowb','bext','abs','crunch','chin','dip','lext','lcurl','add','abd','glute','hack','calfs','calft','plc','lpress']},
    B:{n:'Плечі та спина',num:2,sub:'плечі, спина, підтягування',ids:['ell','bike','lowb','bext','crunch','chin','dip','shp','srow','rot','rear','lat','drow','pull']},
    C:{n:'Груди та руки',num:3,sub:'груди, біцепс, трицепс',ids:['ell','bike','lowb','bext','abs','crunch','bench','bbic','incl','dbic','tri','tri2','lrow']}
  };
  // Останні дати тренувань кожного дня за таблицею
  var SEED={A:'2026-10-25',B:'2026-10-27',C:'2026-10-16'};

  // Резервна копія в Google Sheets: нове тренування = новий стовпець, вправа = рядок
  var ROW={ell:2,bike:3,lowb:4,bext:5,abs:6,crunch:7,chin:8,dip:9,shp:10,srow:11,rot:12,rear:13,lat:14,drow:15,pull:16,bench:17,bbic:18,incl:19,dbic:20,tri:21,tri2:22,lrow:23,lext:24,lcurl:25,add:26,abd:27,glute:28,hack:29,calfs:30,calft:31,plc:32,lpress:33};
  var ROWID={};Object.keys(ROW).forEach(function(k){ROWID[ROW[k]]=k});
  DAYS.X={n:'Тренування',num:'·',sub:'без чіткого дня',ids:[]};

  /* ---------- import history from the sheet (pure functions) ---------- */
  var GROUPS={
    A:['lext','lcurl','add','abd','glute','hack','calfs','calft','plc','lpress'],
    B:['shp','srow','rot','rear','lat','drow','pull'],
    C:['bench','bbic','incl','dbic','tri','tri2','lrow']
  };
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
    if(d.t==='cardio')return [{done:true,txt:t}];
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
    ['A','B','C'].forEach(function(k){
      var sc=GROUPS[k].filter(function(id){return ex[id]}).length;
      if(sc>bs){bs=sc;best=k}
    });
    return best;
  }
  // Колір клітинки = виконано; біла чи без заливки = пропущено. Відтінок кольору підказує день
  var DAYCOL={A:{red:1,green:0.6,blue:0},B:{red:0.2901961,green:0.5254902,blue:0.9098039},C:{red:0.6,green:0,blue:1},X:{red:0.8,green:0.8,blue:0.8}};
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
    var best=null,bd=36;
    [['A',36],['B',217],['C',276]].forEach(function(a){var dd=Math.abs(h-a[1]);dd=Math.min(dd,360-dd);if(dd<bd){bd=dd;best=a[0]}});
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
      var id=ROWID[r+1];
      if(!id&&nameToId){var nm=values[r]&&values[r][0];if(nm)id=nameToId(nm)}
      rowIds[r]=id||null;
    }
    var raw=[],fixed;
    for(var c=1;c<cols;c++)raw.push(parseDate(head[c]));
    fixed=fixDates(raw);
    var now=Date.now(),used={},skippedCells=0;
    for(var c2=1;c2<cols;c2++){
      var ex={},votes={A:0,B:0,C:0};
      for(var r2=1;r2<values.length;r2++){
        var id2=rowIds[r2];if(!id2||!EX[id2])continue;
        var cell=values[r2]&&values[r2][c2];
        if(cell==null||String(cell).trim()==='')continue;
        var col=colors&&colors[r2]&&colors[r2][c2];
        if(colors&&!isDone(col)){skippedCells++;continue}
        var dc=dayOfColor(col);if(dc)votes[dc]++;
        var p=parseCell(id2,cell);
        if(p)ex[id2]=p;else bad++;
      }
      if(!Object.keys(ex).length)continue;
      var f=fixed[c2-1],day=null,vb=0;
      ['A','B','C'].forEach(function(k){if(votes[k]>vb){vb=votes[k];day=k}});
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
  Object.keys(custom).forEach(function(id){if(custom[id]&&custom[id].n&&custom[id].s)EX[id]=custom[id];else delete custom[id]});
  function saveLib(){lsSet(LSL,JSON.stringify(custom))}
  function sIds(s){return DAYS[s.day].ids.concat(s.extra||[])}
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
    var d=SEED[day];
    Object.keys(sessions).forEach(function(k){var s=sessions[k];if(s.day===day&&s.finished&&s.date>d)d=s.date});
    return d;
  }
  function nextDay(){
    return ['A','B','C'].slice().sort(function(a,b){var x=lastDate(a),y=lastDate(b);return x<y?-1:x>y?1:0})[0];
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
      if(d.t==='cardio'){ex[id]=[{done:false}];return}
      var p=prev&&prev.ex[id];
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
    if(d.t==='cardio')return arr[0].txt||d.sh;
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
  var DAYHEX={A:'#ff9900',B:'#4a86e8',C:'#9900ff',X:'#cccccc'};
  function payloadFor(s){
    var items=[];
    Object.keys(s.ex).forEach(function(id){
      var d=EX[id];if(!d)return;
      items.push({row:ROW[id]||d.row||null,name:d.n,text:cellText(id,s.ex[id]),done:anyDone(s.ex[id])});
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
  // Усе завершене, що ще не дійшло до таблиці, надсилаємо по черзі
  var syncing=false;
  function syncPending(){
    if(syncing||!cfg.url||navigator.onLine===false)return;
    var list=Object.keys(sessions).map(function(k){return sessions[k]}).filter(function(s){return s.finished&&s.needSheet});
    if(!list.length)return;
    syncing=true;
    var chain=Promise.resolve();
    list.forEach(function(s){chain=chain.then(function(){return backup(s)})});
    chain.then(function(){syncing=false;if(view==='home')renderHome()},function(){syncing=false});
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
    api('read').then(function(j){
        var g=gridFromApi(j);
        if(!g.values.length){setImp('err','Таблиця порожня або недоступна.');return}
        var r=buildImported(g.values,nameToId,g.colors);
        // власні тренування з апки мають перевагу над тим самим днем з таблиці
        var mine={};
        Object.keys(sessions).forEach(function(k){var s=sessions[k];if(!s.imported){mine[s.date+'_'+s.day]=1;if(s.sheetCol!=null)mine['c'+s.sheetCol]=1}});
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
      h+='<button class="resume" data-act="open" data-key="'+open.key+'"><div><b>Тренування триває</b><div class="tag">День '+DAYS[open.day].num+' · '+DAYS[open.day].n+' · '+setsDone(open)+' з '+setsTotal(open)+' підходів</div></div><span>Продовжити</span></button>';
    }
    h+='<div class="hero"><div class="big">'+dd.num+'</div><div class="kick">Наступне за чергою</div><h2>'+dd.n+'</h2><div class="meta">'+dd.ids.length+' вправ · останнє '+fmtDate(lastDate(nd))+'</div><button class="cta" data-act="start" data-day="'+nd+'">Почати тренування</button></div>';
    h+='<div><div class="sec">Усі дні</div><div class="rows">';
    ['A','B','C'].forEach(function(k){
      var d=DAYS[k],l=lastDate(k);
      h+='<button class="row'+(k===nd?' next':'')+'" data-act="start" data-day="'+k+'"><div class="dn">'+d.num+'</div><div><div class="rn">'+d.n+'</div><div class="rs">'+d.sub+'</div></div><div class="rr">'+fmtDate(l)+'<br>'+ago(l)+'</div></button>';
    });
    h+='</div></div>';
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
      h+='<button class="row" data-act="open" data-key="'+s.key+'"><div class="dn">'+DAYS[s.day].num+'</div><div><div class="rn">'+DAYS[s.day].n+'</div><div class="rs num">'+setsDone(s)+' підходів · '+volume(s).toLocaleString('uk-UA')+' кг'+(s.imported?'':s.sheetAt?' · в таблиці':'')+'</div></div><div class="rr">'+(s.dateFix==='est'?'≈ ':'')+fmtDate(s.date)+(y!==todayISO().slice(0,4)?'<br>'+y:'')+'</div></button>';
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
  function cardHTML(id){
    var d=EX[id],arr=cur.ex[id];
    if(!d||!arr)return '';
    if(d.t==='cardio'){
      var on=arr[0].done;
      return '<section class="ex'+(on?' fin':'')+'" id="c-'+id+'"><div class="exh"><div><h3>'+d.n+'</h3>'+(d.nt?'<p class="tag">'+d.nt+'</p>':'')+'</div></div>'+
        '<button class="cardio'+(on?' on':'')+'" data-act="cardio" data-ex="'+id+'" aria-pressed="'+on+'"><span class="cd">'+esc(arr[0].txt||d.d)+'</span><span class="cs">'+(on?'Готово':'Позначити')+'</span></button></section>';
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
    var dd=DAYS[cur.day];
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
    var r=[];['A','B','C'].forEach(function(k){if(DAYS[k].ids.indexOf(id)>=0)r.push(DAYS[k].n)});
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
    var d=EX[id],sub=d.custom?(d.s.length+'×'+d.s[0][0]+(d.s[0][1]?' · '+fw(d.s[0][1])+' кг':'')+(d.ready?'':' · з’явиться в усіх після завершення')):dayNamesFor(id).join(', ');
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
       '<p class="sync">У списку для всіх тренувань вправа з’явиться, коли ви завершите це. У таблиці для неї додасться окремий рядок.</p></div></div>';
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
    if(d.t==='cardio')cur.ex[id]=[{done:false}];
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
    var d={n:nm,s:S(n,r,w),custom:1,from:cur.key,ready:false};
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
      '<p class="sync">Адреса й ключ зберігаються тільки на цьому пристрої. Як їх отримати, описано в README репозиторію.</p></div></div>';
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
      m.textContent='З’єднано з таблицею «'+(j.title||'')+'».';
      syncPending();
    },function(e){m.textContent=errText(e)});
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
      fs.finished=fs.finished||Date.now();fs.needSheet=true;touch(fs);hideRest();
      bkFocus=fs.key;renderHome();backup(fs);
    }else if(act==='bk'){
      var bs=sessions[b.getAttribute('data-key')]||cur;
      if(bs){bkFocus=bs.key;backup(bs)}
    }else if(act==='padd')openPicker();
    else if(act==='pclose')closePicker();
    else if(act==='ptab')pickTab(b.getAttribute('data-tab'));
    else if(act==='ppick'){addEx(id);closePicker()}
    else if(act==='pnew')createEx();
    else if(act==='rmx')removeEx(id);
    else if(act==='imp')importHistory();
    else if(act==='cfg')openSettings();
    else if(act==='csave')saveSettings();
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
  window.addEventListener('online',syncPending);
  document.addEventListener('visibilitychange',function(){if(!document.hidden)syncPending()});
  syncPending();
  try{if(navigator.storage&&navigator.storage.persist)navigator.storage.persist().catch(function(){})}catch(e){}
  if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('sw.js').catch(function(){})})}
})();
