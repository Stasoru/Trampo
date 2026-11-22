/* ====== SONS: efeitos sintetizados na hora (sem arquivos), ligados ao que acontece na tela ====== */
(function(){
  const AC = window.AudioContext || window.webkitAudioContext;
  const btn = document.getElementById("som");
  if(!AC || !btn){ if(btn) btn.hidden = true; return; }
  let ctx = null, mestre = null, eco = null, ligado = true, trilha = null;
  try{ ligado = localStorage.getItem("bd_som") !== "0"; }catch(e){}

  function prepara(){
    if(ctx) { if(ctx.state === "suspended") ctx.resume(); return true; }
    try{ ctx = new AC(); }catch(e){ return false; }
    mestre = ctx.createGain(); mestre.gain.value = ligado ? .9 : 0;
    const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -14; comp.ratio.value = 4;
    mestre.connect(comp).connect(ctx.destination);
    // eco curto, para dar o ar de "sala de pedra"
    eco = ctx.createDelay(1); eco.delayTime.value = .19;
    const volta = ctx.createGain(); volta.gain.value = .28;
    const filtro = ctx.createBiquadFilter(); filtro.type = "lowpass"; filtro.frequency.value = 2600;
    eco.connect(filtro).connect(volta).connect(eco); volta.connect(mestre);
    if(window.TRILHA){ trilha = new Audio(window.TRILHA); trilha.loop = true; trilha.volume = .22; if(ligado) trilha.play().catch(()=>{}); }
    return true;
  }
  const agora = () => ctx.currentTime;
  function saida(vol, comEco){
    const g = ctx.createGain(); g.gain.value = vol; g.connect(mestre);
    if(comEco){ const e = ctx.createGain(); e.gain.value = .5; g.connect(e).connect(eco); }
    return g;
  }
  function env(g, t, a, d, pico){
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(pico, t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
  }
  let ruidoBuf = null;
  function ruido(){
    if(ruidoBuf) return ruidoBuf;
    ruidoBuf = ctx.createBuffer(1, ctx.sampleRate*2, ctx.sampleRate);
    const d = ruidoBuf.getChannelData(0); for(let i=0;i<d.length;i++) d[i] = Math.random()*2-1;
    return ruidoBuf;
  }
  /* sino de metal: parciais inarmônicos, como Zamak batendo */
  function sino(f, t, vol, dur){
    const out = saida(vol, true);
    [[1,1],[2.76,.5],[5.4,.28],[8.93,.12]].forEach(([r,a])=>{
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "sine"; o.frequency.value = f*r; o.connect(g).connect(out);
      env(g, t, .004, dur/(1+r*.35), a); o.start(t); o.stop(t + dur + .05);
    });
  }
  function brilho(t, n, vol){
    const esc = [0,2,4,7,9,12,14,16,19,21,24];
    for(let i=0;i<n;i++){
      const f = 1046.5 * Math.pow(2, esc[Math.floor(Math.random()*esc.length)]/12);
      const o = ctx.createOscillator(), g = ctx.createGain(), out = saida(vol, true);
      o.type = "sine"; o.frequency.value = f; o.connect(g).connect(out);
      const ti = t + i*.055 + Math.random()*.03; env(g, ti, .005, .5, .5); o.start(ti); o.stop(ti+.6);
    }
  }
  function sopro(t, dur, f0, f1, vol, q){
    const s = ctx.createBufferSource(); s.buffer = ruido(); s.loop = true;
    const bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.Q.value = q || 1.2;
    bp.frequency.setValueAtTime(f0, t); bp.frequency.exponentialRampToValueAtTime(f1, t + dur);
    const g = ctx.createGain(); s.connect(bp).connect(g).connect(saida(vol));
    g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(1, t + dur*.35); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    s.start(t); s.stop(t + dur + .05);
  }
  function chiado(t, dur, vol){   // metal derretido: chiado com estalos
    const s = ctx.createBufferSource(); s.buffer = ruido(); s.loop = true;
    const hp = ctx.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 2400;
    const g = ctx.createGain(); s.connect(hp).connect(g).connect(saida(vol));
    g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.6, t + .25);
    for(let k=0;k<14;k++){ const tk = t + .25 + Math.random()*(dur-.4); g.gain.setValueAtTime(.6 + Math.random()*.6, tk); g.gain.setValueAtTime(.55, tk+.02); }
    g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    s.start(t); s.stop(t + dur + .05);
    const o = ctx.createOscillator(), go = ctx.createGain(); o.type = "sine"; o.frequency.setValueAtTime(70, t); o.frequency.linearRampToValueAtTime(110, t+dur);
    o.connect(go).connect(saida(vol*.9)); env(go, t, .3, dur, .5); o.start(t); o.stop(t+dur+.4);
  }
  function laser(t, dur){
    const o = ctx.createOscillator(), o2 = ctx.createOscillator(), g = ctx.createGain(), hp = ctx.createBiquadFilter();
    o.type = "sawtooth"; o.frequency.value = 1320; o2.type = "square"; o2.frequency.value = 1327;
    hp.type = "bandpass"; hp.frequency.value = 2600; hp.Q.value = 3;
    const lfo = ctx.createOscillator(), lg = ctx.createGain(); lfo.frequency.value = 38; lg.gain.value = .35;
    lfo.connect(lg).connect(g.gain);
    o.connect(hp); o2.connect(hp); hp.connect(g).connect(saida(.09));
    g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.6, t+.06); g.gain.setValueAtTime(.6, t+dur-.08); g.gain.exponentialRampToValueAtTime(.0001, t+dur);
    [o,o2,lfo].forEach(x=>{ x.start(t); x.stop(t+dur+.05); });
    chiado(t, dur, .05);
  }
  function acorde(t){
    [523.25, 659.25, 783.99, 1046.5].forEach((f,i)=>sino(f, t + i*.09, .16, 2.6));
    sino(130.81, t, .2, 3);
    brilho(t + .2, 9, .05);
  }
  function toque(f, vol){ if(!ok()) return; const t = agora(); const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = "triangle"; o.frequency.setValueAtTime(f, t); o.frequency.exponentialRampToValueAtTime(f*.6, t+.08); o.connect(g).connect(saida(vol)); env(g, t, .003, .09, .6); o.start(t); o.stop(t+.12); }

  const ok = () => ligado && prepara();

  /* liga o áudio no primeiro gesto e toca o brilho da caixa aberta, se a abertura estiver na tela */
  let primeiro = true;
  const gesto = () => {
    if(!primeiro) return; primeiro = false;
    if(!ok()) return;
    const ab = document.getElementById("abertura");
    if(ab && ab.getBoundingClientRect().bottom > 80 && !document.body.classList.contains("quizzing")){ brilho(agora(), 8, .05); sino(392, agora(), .08, 1.8); }
  };
  addEventListener("pointerdown", gesto, {capture:true}); addEventListener("keydown", gesto, {capture:true});

  /* botão de som */
  function pinta(){
    btn.setAttribute("aria-pressed", String(ligado));
    btn.setAttribute("aria-label", ligado ? "Desligar o som" : "Ligar o som");
    btn.classList.toggle("off", !ligado);
  }
  btn.addEventListener("click", ()=>{
    ligado = !ligado; try{ localStorage.setItem("bd_som", ligado ? "1" : "0"); }catch(e){}
    pinta();
    if(ligado && prepara()){ mestre.gain.setTargetAtTime(.9, agora(), .05); if(trilha) trilha.play().catch(()=>{}); toque(880,.12); }
    else if(ctx){ mestre.gain.setTargetAtTime(0, agora(), .05); if(trilha) trilha.pause(); }
  });
  pinta();

  /* ganchos do quiz */
  addEventListener("quiz:comeca", ()=>{ if(!ok()) return; const t = agora(); sopro(t, .6, 400, 2400, .18, .8); sino(587.33, t+.25, .12, 1.6); brilho(t+.3, 6, .04); });
  addEventListener("quiz:escolhe", ()=>{ toque(660, .1); if(ok()) sopro(agora()+.02, .5, 900, 3200, .07, 2); });
  addEventListener("quiz:pinga", ()=>{ if(!ok()) return; const t = agora(); sino(1180 + Math.random()*260, t, .13, 1.1); sopro(t+.05, .3, 2200, 700, .05, 1.5); });
  addEventListener("quiz:sai", ()=>{ if(ok()) sopro(agora(), .32, 1800, 500, .06, 1); });
  addEventListener("quiz:revela", ()=>{ if(!ok()) return; const t = agora();
    chiado(t, 1.4, .12); sino(196, t, .14, 2.2);
    sopro(t + 1.25, 1.6, 300, 3600, .2, .7);   // o giro
  });
  addEventListener("quiz:brasao", ()=>{ if(!ok()) return; const t = agora(); sino(261.63, t, .22, 3); brilho(t, 12, .06); });
  addEventListener("quiz:laser", e=>{ if(ok()) laser(agora(), (e.detail || 1.5)); });
  addEventListener("quiz:gravado", ()=>{ if(ok()) acorde(agora() + .05); });
  addEventListener("quiz:resultado", e=>{ if(e.detail && !e.detail.gl && ok()) acorde(agora() + .1); });
  document.addEventListener("visibilitychange", ()=>{ if(!ctx) return; if(document.hidden){ ctx.suspend(); if(trilha) trilha.pause(); } else if(ligado){ ctx.resume(); if(trilha) trilha.play().catch(()=>{}); } });
})();
