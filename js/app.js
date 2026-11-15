// Ruta Láctea 90 – lógica del juego (tablero, turnos, tarjetas, sellos y dictamen)
const ZN = {0:"Dilema ético y diversidad",1:"Inducción",2:"Integración al puesto",3:"Seguimiento",4:"Evaluación del desempeño inicial",5:"Decisión de continuidad"};
const ZS = {1:"I",2:"N",3:"S",4:"E",5:"C"};
const ZC = {0:"var(--zd)",1:"var(--z1)",2:"var(--z2)",3:"var(--z3)",4:"var(--z4)",5:"var(--z5)"};
const DILEMA=[3,9,15,21,27], MENTOR=[8,14], GATES=[6,12,18,24,30];
const COLORS=["#E63946","#1D3557","#F4A261","#2A9D8F","#9B5DE5","#FFFFFF"];
const zoneOf = s => Math.ceil(s/6);
let players=[], turn=0, decks={}, started=0, clockInt=null, lastMentor=null, finishers=0, busy=false, useTimer=true, ended=false;

// ---------- setup ----------
let setupNames=["Jugador 1","Jugador 2","Jugador 3"];
function renderSetup(){
  const el=document.getElementById("plist"); el.innerHTML="";
  setupNames.forEach((n,i)=>{
    const r=document.createElement("div"); r.className="prow";
    r.innerHTML=`<span class="chip" style="background:${COLORS[i]}"></span><input maxlength="20" value="${n}" oninput="setupNames[${i}]=this.value">`;
    el.appendChild(r);
  });
  document.getElementById("addP").disabled=setupNames.length>=6;
  document.getElementById("remP").disabled=setupNames.length<=2;
}
function addPlayer(){ if(setupNames.length<6){setupNames.push("Jugador "+(setupNames.length+1));renderSetup();} }
function removePlayer(){ if(setupNames.length>2){setupNames.pop();renderSetup();} }
renderSetup();

function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function draw(z){ if(!decks[z]||!decks[z].length) decks[z]=shuffle(CARDS.filter(c=>c.z===z)); return decks[z].shift(); }

function startGame(){
  useTimer=document.getElementById("useTimer").checked;
  players=setupNames.map((n,i)=>({name:(n||"Jugador "+(i+1)).trim(),color:COLORS[i],pos:0,litros:3,ac:[0,0,0,0,0,0],seal:[false,false,false,false,false,false],dil:0,plan:null,done:false,order:null}));
  document.getElementById("setup").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  document.getElementById("btnEnd").classList.remove("hidden");
  buildBoard(); started=Date.now(); clockInt=setInterval(tick,1000); tick();
  log("Comienza el día 1. Cada jugador recibe <b>3 litros</b> de bienvenida.");
  renderAll();
}
function tick(){
  const s=Math.floor((Date.now()-started)/1000), m=Math.floor(s/60);
  const c=document.getElementById("clock");
  c.textContent=`⏱ ${String(m).padStart(2,"0")}:${String(s%60).padStart(2,"0")} / 60:00`;
  if(m>=60 && !ended){ c.style.background="#FBE3E2"; }
}

// ---------- board ----------
function cellPos(k){ // returns [row,col] 1-based for square k (0=start,31=meta)
  if(k===0) return [1,1];
  if(k===31) return [4,3];
  if(k<=8) return [1,k+1];
  if(k<=16) return [2,9-(k-9)];
  if(k<=24) return [3,(k-17)+2];
  return [4,9-(k-25)];
}
function buildBoard(){
  const b=document.getElementById("board"); b.innerHTML="";
  for(let k=0;k<=31;k++){
    const d=document.createElement("div"); d.className="sq"; d.id="sq"+k;
    const [r,c]=cellPos(k); d.style.gridRow=r; d.style.gridColumn=c;
    if(k===0){d.classList.add("start");d.innerHTML=`<span class="n" style="font-size:clamp(11px,1.2vw,16px)">SALIDA</span><span class="lab">Día 1</span>`;}
    else if(k===31){d.classList.add("meta");d.innerHTML=`<span class="n" style="font-size:clamp(10px,1.1vw,15px)">META</span><span class="lab">Comité de Continuidad · Día 90</span>`;}
    else{
      const z=zoneOf(k); let bg=ZC[z], lab="";
      if(DILEMA.includes(k)){bg=ZC[0];lab="Dilema ético";}
      if(MENTOR.includes(k)) lab="Mentor";
      if(GATES.includes(k)){d.classList.add("gate");lab="Puerta · sello "+ZS[z];}
      d.style.background=bg; d.innerHTML=`<span class="n">${k}</span><span class="lab">${lab}</span>`;
    }
    const t=document.createElement("div"); t.className="tokens"; d.appendChild(t);
    b.appendChild(d);
  }
}

// ---------- render ----------
function cur(){return players[turn];}
function renderAll(){
  document.querySelectorAll(".tokens").forEach(t=>t.innerHTML="");
  document.querySelectorAll(".sq.here").forEach(t=>t.classList.remove("here"));
  players.forEach((p,i)=>{
    const t=document.createElement("div"); t.className="tok"+(i===turn&&!ended?" active":""); t.style.background=p.color; t.title=p.name;
    if(p.color==="#FFFFFF") t.style.borderColor="#2E2618";
    document.querySelector(`#sq${p.pos} .tokens`).appendChild(t);
  });
  if(!ended) document.getElementById("sq"+cur().pos).classList.add("here");
  const pl=document.getElementById("players"); pl.innerHTML="";
  players.forEach((p,i)=>{
    const d=document.createElement("div"); d.className="pcard"+(i===turn&&!ended?" current":"");
    const seals=[1,2,3,4,5].map(z=>`<div class="seal ${p.seal[z]?"on":""}" style="${p.seal[z]?"background:"+ZC[z]:""}" title="${ZN[z]}">${ZS[z]}</div>`).join("");
    const st=p.done?'<span class="tag" style="background:var(--gold)">En el Comité</span>':(p.plan?`<span class="tag">Plan de mejora ${ZS[p.plan]}</span>`:"");
    d.innerHTML=`<div class="h"><span class="chip" style="background:${p.color};width:18px;height:18px"></span>${esc(p.name)}${st}<span class="lit">🥛 ${p.litros} L</span></div>
      <div class="seals">${seals}</div>
      <div class="ac">Aciertos: I ${p.ac[1]} · N ${p.ac[2]} · S ${p.ac[3]} · E ${p.ac[4]} · C ${p.ac[5]} · Dilemas ${p.dil} · Casilla ${p.pos===31?"Meta":p.pos}</div>`;
    pl.appendChild(d);
  });
  if(ended) return;
  const p=cur();
  document.getElementById("who").innerHTML=`<span class="chip" style="background:${p.color};width:18px;height:18px"></span>Turno de ${esc(p.name)}`;
  const btn=document.getElementById("btnRoll");
  if(p.plan){btn.textContent="Responder plan de mejora";document.getElementById("hint").textContent=`Está en la Puerta de ${ZN[p.plan]} sin sello: responda una tarjeta de esa zona (necesita 2 aciertos).`;}
  else{btn.textContent="Lanzar dado";document.getElementById("hint").textContent=`Casilla ${p.pos===0?"Salida":p.pos} · día ${Math.max(1,p.pos*3)} del período de prueba.`;}
  btn.disabled=busy;
}
function esc(s){return String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));}
function log(h){const l=document.getElementById("log");const d=document.createElement("div");d.innerHTML=h;l.prepend(d);}

// ---------- turn flow ----------
function onAction(){
  if(busy||ended) return;
  const p=cur();
  if(p.plan){ busy=true; renderAll(); const z=p.plan; askCard(draw(z),p,null,z,()=>afterGate(p,p.pos)); return; }
  busy=true; renderAll();
  const die=document.getElementById("die"); die.classList.remove("roll"); void die.offsetWidth; die.classList.add("roll");
  let n=0; const spin=setInterval(()=>{die.textContent=1+Math.floor(Math.random()*3); if(++n>7){clearInterval(spin); const v=1+Math.floor(Math.random()*3); die.textContent=v; move(p,v);}},60);
}
function move(p,v){
  const gate=GATES.find(g=>g>p.pos);
  let target=Math.min(p.pos+v,gate);
  const stepTo=()=>{
    if(p.pos<target){p.pos++;renderAll();setTimeout(stepTo,260);}
    else land(p,v,target===gate&&p.pos+0<p.pos+v&&target<p.pos+v);
  };
  log(`${esc(p.name)} lanza un <b>${v}</b>.`);
  setTimeout(stepTo,200);
}
function land(p){
  const k=p.pos, z=zoneOf(k);
  if(GATES.includes(k)) log(`${esc(p.name)} se detiene en la <b>Puerta de ${ZN[z]}</b>.`);
  const after=()=> GATES.includes(k)?afterGate(p,k):endTurn();
  if(DILEMA.includes(k)){ askCard(draw(0),p,null,z,after,true); }
  else if(MENTOR.includes(k)){ pickMentor(p,m=>askCard(draw(z),p,m,z,after)); }
  else askCard(draw(z),p,null,z,after);
}
function afterGate(p,k){
  const z=zoneOf(k);
  if(p.ac[z]>=2){
    p.seal[z]=true; p.plan=null;
    log(`✅ ${esc(p.name)} obtiene el <b>sello ${ZS[z]}</b> (${ZN[z]}).`);
    if(k===30){
      p.done=true; p.pos=31; finishers++; p.order=finishers;
      if(finishers===1){p.litros+=2; log(`🏁 ${esc(p.name)} llega primero al Comité: <b>+2 litros de puntualidad</b>.`);} else log(`🏁 ${esc(p.name)} llega al Comité de Continuidad.`);
      renderAll();
      if(players.every(x=>x.done)) return setTimeout(finishGame,500);
      return showMsg("¡Día 90!",`<p><b>${esc(p.name)}</b> completó los cinco sellos y llega al <b>Comité de Continuidad</b>. Su dictamen se conocerá cuando termine la partida.</p>`,[["Continuar","btn",()=>{closeMsg();endTurn();}]]);
    }
    showMsg("Sello obtenido",`<p><b>${esc(p.name)}</b> tiene ${p.ac[z]} aciertos en <b>${ZN[z]}</b> y recibe el sello <b>${ZS[z]}</b>. En su próximo turno cruza la Puerta.</p>`,[["Continuar","btn",()=>{closeMsg();endTurn();}]]);
  } else {
    p.plan=z;
    log(`⚠️ ${esc(p.name)} queda en <b>plan de mejora</b> de ${ZN[z]} (${p.ac[z]}/2 aciertos).`);
    showMsg("Plan de mejora",`<p><b>${esc(p.name)}</b> llegó a la Puerta de <b>${ZN[z]}</b> con ${p.ac[z]} de 2 aciertos.</p><p>En sus próximos turnos, en lugar de lanzar el dado, responderá tarjetas de esta zona hasta completar 2 aciertos. Así funciona el seguimiento: corregir a tiempo, no castigar.</p>`,[["Entendido","btn",()=>{closeMsg();endTurn();}]]);
  }
}
function endTurn(){
  busy=false;
  if(players.every(x=>x.done)) return finishGame();
  do{turn=(turn+1)%players.length;}while(players[turn].done);
  renderAll();
}

// ---------- mentor ----------
function pickMentor(p,cb){
  const others=players.filter(x=>x!==p && x!==lastMentor);
  const pool=others.length?others:players.filter(x=>x!==p);
  const html=`<p>¡Casilla <b>Mentor</b>! Elija a otro participante como mentor(a). Resolverán juntos la tarjeta y, si aciertan, <b>ambos</b> ganan los litros y el acierto.</p>
  <div class="mentorpick">${pool.map((x,i)=>`<button class="btn-soft" data-i="${players.indexOf(x)}"><span class="chip" style="display:inline-block;vertical-align:middle;width:14px;height:14px;background:${x.color}"></span> ${esc(x.name)}</button>`).join("")}</div>
  ${players.length>2?'<p style="font-size:13px;color:var(--muted)">Una misma persona no puede ser mentora dos veces seguidas.</p>':""}`;
  showMsg("Mentor",html,[]);
  document.querySelectorAll(".mentorpick button").forEach(b=>b.onclick=()=>{const m=players[+b.dataset.i]; lastMentor=m; closeMsg(); log(`🤝 ${esc(p.name)} elige a ${esc(m.name)} como mentor(a).`); cb(m);});
}

// ---------- card ----------
let tInt=null;
function askCard(card,p,mentor,zone,after,isDilema){
  const color=ZC[card.z];
  document.getElementById("cHead").style.background=color;
  document.getElementById("cHead").style.color=card.z===3?"#2E2618":"#fff";
  document.getElementById("cTitle").textContent=`${card.id} · ${ZN[card.z]}`;
  document.getElementById("cPts").textContent=`🥛 ${card.l} ${card.l===1?"litro":"litros"}`;
  document.getElementById("cWho").innerHTML=`Responde: <b>${esc(p.name)}</b>${mentor?` con su mentor(a) <b>${esc(mentor.name)}</b>`:""}${p.plan?" · plan de mejora":""}`;
  document.getElementById("cQ").textContent=card.q;
  const opts=document.getElementById("cOpts"), fb=document.getElementById("cFb"), foot=document.getElementById("cFoot");
  opts.innerHTML=""; fb.className="fb"; fb.innerHTML=""; foot.innerHTML="";
  let answered=false;
  const finish=(result)=>{ // result: 'ok' | 'part' | 'no'
    if(answered) return; answered=true; clearInterval(tInt);
    const who=[p].concat(mentor?[mentor]:[]);
    if(result==='ok'){ who.forEach(x=>{x.litros+=card.l; x.ac[zone]++; if(isDilema) x.dil++;}); }
    if(result==='part'){ p.litros+=1; }
    const names=who.map(x=>esc(x.name)).join(" y ");
    log(result==='ok'?`✔️ ${names}: acierto en ${card.id} (+${card.l} L).`:result==='part'?`➗ ${esc(p.name)}: logro parcial en ${card.id} (+1 L).`:`✖️ ${esc(p.name)}: no acierta ${card.id}.`);
    renderAll();
    const go=document.createElement("button"); go.className="btn"; go.textContent="Continuar";
    go.onclick=()=>{document.getElementById("ovCard").classList.remove("show"); after();};
    foot.innerHTML=""; foot.appendChild(go);
  };
  if(card.t==="mc"){
    card.o.forEach((o,i)=>{
      const b=document.createElement("button"); b.className="opt"; b.textContent=String.fromCharCode(97+i)+") "+o;
      b.onclick=()=>{
        if(answered) return;
        [...opts.children].forEach((x,j)=>{x.disabled=true; if(j===card.a) x.classList.add("good");});
        const ok=i===card.a; if(!ok) b.classList.add("bad");
        fb.className="fb show "+(ok?"ok":"no");
        fb.innerHTML=(ok?`<b>¡Correcto! +${card.l} ${card.l===1?"litro":"litros"}.</b> `:`<b>No es correcto.</b> La respuesta es la <b>${String.fromCharCode(97+card.a)}</b>. `)+esc(card.e);
        finish(ok?'ok':'no');
      };
      opts.appendChild(b);
    });
  } else {
    fb.className="fb show info"; fb.innerHTML=`<b>Criterio:</b> ${esc(card.c)}<br><span style="font-size:13px">La persona facilitadora (o el grupo por votación) decide el resultado.</span>`;
    [["Logrado (+"+card.l+")","btn-ok",'ok'],["Parcial (+1, no cuenta acierto)","btn-mid",'part'],["No logrado","btn-no",'no']].forEach(([t,c,r])=>{
      const b=document.createElement("button"); b.className=c; b.textContent=t;
      b.onclick=()=>{fb.innerHTML=`<b>Resultado:</b> ${t}.`; finish(r);}; foot.appendChild(b);
    });
  }
  // timer
  const tm=document.getElementById("cTimer"), bar=document.getElementById("cBar");
  clearInterval(tInt);
  if(useTimer){
    tm.classList.remove("hidden"); let left=60; bar.style.transition="none"; bar.style.width="100%"; void bar.offsetWidth; bar.style.transition="width 1s linear";
    tInt=setInterval(()=>{left--; bar.style.width=(left/60*100)+"%"; if(left<=0){clearInterval(tInt);
      if(card.t==="mc"&&!answered){[...opts.children].forEach((x,j)=>{x.disabled=true;if(j===card.a)x.classList.add("good");});fb.className="fb show no";fb.innerHTML=`<b>Tiempo agotado.</b> La respuesta era la <b>${String.fromCharCode(97+card.a)}</b>. `+esc(card.e);finish('no');}
      else if(!answered){bar.style.background="var(--z5)";}
    }},1000);
    bar.style.background="var(--ink)";
  } else tm.classList.add("hidden");
  document.getElementById("ovCard").classList.add("show");
}

// ---------- messages ----------
function showMsg(title,html,buttons,headColor){
  document.getElementById("mTitle").textContent=title;
  document.getElementById("mHead").style.background=headColor||"var(--ink)";
  document.getElementById("mHead").style.color="#fff";
  document.getElementById("mBody").innerHTML=html;
  const f=document.getElementById("mFoot"); f.innerHTML="";
  buttons.forEach(([t,c,fn])=>{const b=document.createElement("button");b.className=c;b.textContent=t;b.onclick=fn;f.appendChild(b);});
  document.getElementById("ovMsg").classList.add("show");
}
function closeMsg(){document.getElementById("ovMsg").classList.remove("show");}
function openRules(){
  showMsg("Reglas de Ruta Láctea 90",`
  <h4>Objetivo</h4><p>Recorrer los 90 días del período de prueba en CoopeMontaña Verde, conseguir los 5 sellos y llegar al Comité de Continuidad con la mayor cantidad de <b>litros de leche</b> (puntos).</p>
  <h4>Turno</h4><ul><li>Lance el dado (valores de 1 a 3) y avance.</li><li>Responda la tarjeta del color de la casilla en 60 segundos. Si acierta, gana los litros indicados y suma un acierto en esa zona.</li><li>Si falla, no gana litros y se muestra la respuesta correcta.</li></ul>
  <h4>Casillas especiales</h4><ul><li><b>Dilema ético (morada: 3, 9, 15, 21, 27):</b> vale 3 litros y el acierto cuenta para la zona.</li><li><b>Mentor (8 y 14):</b> elija a otro jugador; si aciertan, ambos ganan litros y acierto. Nadie es mentor dos veces seguidas.</li><li><b>Puerta (borde grueso: 6, 12, 18, 24, 30):</b> la ficha siempre se detiene. Tras responder su tarjeta, si tiene <b>2 aciertos</b> en la zona recibe el <b>sello</b>; si no, queda en <b>plan de mejora</b> y en cada turno responde tarjetas de esa zona hasta lograrlo.</li></ul>
  <h4>Retos de acción</h4><p>Presentaciones, mímicas y autoevaluaciones se califican como Logrado, Parcial (+1 litro, sin acierto) o No logrado; decide la persona facilitadora o el grupo por votación.</p>
  <h4>Comité de Continuidad y fin</h4><ul><li>El primero en llegar gana <b>+2 litros de puntualidad</b>.</li><li>La partida termina cuando todos llegan o al cumplirse <b>60 minutos</b> (botón «Terminar partida»).</li><li>Dictamen: <b>Confirmado destacado</b> (5 sellos y 30 litros o más), <b>Confirmado</b> (5 sellos y 20 a 29 litros), <b>No supera el período de prueba</b> (menos de 5 sellos o menos de 20 litros).</li><li>Gana el jugador confirmado con más litros; desempata quien tenga más dilemas acertados y luego quien llegó primero.</li></ul>
  <h4>Convivencia</h4><p>Respeto a cada persona, cultura y creencia. La clave de respuestas es la decisión final.</p>`,[["Cerrar","btn",closeMsg]]);
}
function confirmEnd(){
  if(ended) return;
  showMsg("¿Terminar la partida?","<p>Se cumplió el tiempo o el grupo decide cerrar. El Comité evaluará a cada jugador con el expediente que tenga en este momento (el período de prueba no se prorroga).</p>",[["Cancelar","btn-soft",closeMsg],["Sí, convocar al Comité","btn",()=>{closeMsg();finishGame();}]]);
}
function finishGame(){
  if(ended) return; ended=true; clearInterval(clockInt); clearInterval(tInt);
  document.getElementById("ovCard").classList.remove("show");
  document.getElementById("btnEnd").classList.add("hidden");
  document.getElementById("btnRestart").classList.remove("hidden");
  document.getElementById("btnRoll").disabled=true;
  document.getElementById("hint").textContent="Partida terminada.";
  const res=players.map(p=>{
    const s=[1,2,3,4,5].filter(z=>p.seal[z]).length;
    let v,c; if(s===5&&p.litros>=30){v="Confirmado destacado";c="v1";} else if(s===5&&p.litros>=20){v="Confirmado";c="v2";} else {v="No supera el período de prueba";c="v3";}
    return {p,s,v,c,conf:c!=="v3"};
  });
  const ranked=res.slice().sort((a,b)=> (b.conf-a.conf)||(b.p.litros-a.p.litros)||(b.p.dil-a.p.dil)||((a.p.order||99)-(b.p.order||99)));
  const win=ranked.find(r=>r.conf);
  renderAll();
  showMsg("Dictamen del Comité de Continuidad",`
    ${win?`<p style="font-size:18px">🏆 Gana <b>${esc(win.p.name)}</b> con ${win.p.litros} litros.</p>`:`<p style="font-size:18px">Ningún jugador cumplió los requisitos de confirmación.</p>`}
    <table class="res"><tr><th>Jugador</th><th>Sellos</th><th>Litros</th><th>Dilemas</th><th>Dictamen</th></tr>
    ${ranked.map(r=>`<tr><td><span class="chip" style="display:inline-block;vertical-align:middle;width:14px;height:14px;background:${r.p.color}"></span> ${esc(r.p.name)}</td><td>${r.s}/5</td><td>${r.p.litros}</td><td>${r.p.dil}</td><td><span class="verdict ${r.c}">${r.v}</span></td></tr>`).join("")}
    </table>
    <h4>Cierre reflexivo (5 minutos)</h4><ul><li>¿Qué tarjeta les costó más y por qué?</li><li>¿Qué aprendieron sobre los derechos y deberes en el período de prueba?</li><li>¿Qué harían distinto como mentores o jefaturas?</li></ul>`,[["Ver tablero","btn-soft",closeMsg],["Nueva partida","btn",()=>location.reload()]],"var(--gold)");
  document.getElementById("mHead").style.color="var(--ink)";
}
