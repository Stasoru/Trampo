/* ====== BRASÃO 3D DO QUIZ: o molde fica vazio até o fim (surpresa); na revelação o Zamak derrete, esfria, mostra o símbolo e a plaquinha recebe o nome a laser ====== */
(function(){
  const box = document.getElementById("kc"), cv = document.getElementById("kcgl");
  const svg = document.getElementById("emblemSvg");
  const reduz = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(!window.THREE || !box || !cv) return;
  let renderer;
  try{ renderer = new THREE.WebGLRenderer({canvas:cv, antialias:true, alpha:true}); }catch(e){ return; }
  if(!renderer.getContext()) return;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.setClearColor(0x000000, 0);
  /* se o shader não compilar, volta para o emblema em SVG */
  let falhou = false;
  renderer.debug.onShaderError = () => { falhou = true; box.classList.remove("gl-on"); };

  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(26, 240/310, .1, 30);
  cam.position.set(0, .02, 3.55); cam.lookAt(0, .02, 0);

  /* estúdio para os reflexos */
  (function(){
    const env = new THREE.Scene();
    env.add(new THREE.Mesh(new THREE.BoxGeometry(20,12,20), new THREE.MeshBasicMaterial({color:0x0c0c0c, side:THREE.BackSide})));
    const panel = (w,h,c,x,y,z,ry,rx) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w,h), new THREE.MeshBasicMaterial({color:c, side:THREE.DoubleSide})); m.position.set(x,y,z); m.rotation.set(rx||0,ry||0,0); env.add(m); };
    panel(8,1.4,0xffffff, 0,5.9,0, 0, Math.PI/2);
    panel(5,3,0xfff0d8, 0,1.5,9.9, Math.PI);
    panel(1.6,6,0xffe2b0, -9.9,1,1, Math.PI/2);
    panel(1.6,6,0xf3ece2, 9.9,1,-1, -Math.PI/2);
    panel(7,2.4,0x6a5232, 0,0,9.9, Math.PI);
    const pm = new THREE.PMREMGenerator(renderer); scene.environment = pm.fromScene(env,.02).texture; pm.dispose();
  })();
  const key = new THREE.DirectionalLight(0xfff3e0, 2.6); key.position.set(-2,3,4); scene.add(key);
  const fill = new THREE.DirectionalLight(0xffe0b0, 1.2); fill.position.set(2.5,-.5,3); scene.add(fill);
  scene.add(new THREE.HemisphereLight(0xfff1dd, 0x2a1d0c, .9));
  const flash = new THREE.PointLight(0xffc766, 0, 6, 1.5); flash.position.set(0,0,1.4); scene.add(flash);

  /* peças */
  const H = 1, Wd = 320/358;           // proporção do aro derivado dos brasões
  const kc = new THREE.Group(); scene.add(kc);
  const BASE_Y = -.06;
  const corpo = new THREE.Group(); kc.add(corpo);
  const geo = new THREE.PlaneGeometry(Wd*H, H);

  const FC = document.createElement("canvas"); FC.width = 320; FC.height = 358;
  const fg = FC.getContext("2d");
  const fieldTex = new THREE.CanvasTexture(FC); fieldTex.colorSpace = THREE.SRGBColorSpace;
  const campoMat = new THREE.MeshPhysicalMaterial({map:fieldTex, emissiveMap:fieldTex, emissive:0xffffff, emissiveIntensity:.16, transparent:true, alphaTest:.4, roughness:.18, metalness:0, clearcoat:1, clearcoatRoughness:.06});
  const campo = new THREE.Mesh(geo, campoMat);
  campo.position.z = .012; corpo.add(campo);
  const aroMat = new THREE.MeshStandardMaterial({color:0xE2B465, transparent:true, alphaTest:.45, metalness:.9, roughness:.34});
  const aro = new THREE.Mesh(geo, aroMat); aro.position.z = .03; corpo.add(aro);

  let crestMat = new THREE.MeshStandardMaterial({transparent:true, opacity:0});
  const crest = new THREE.Mesh(new THREE.PlaneGeometry(1,1), crestMat); crest.position.z = .036; crest.visible = false; kc.add(crest);

  // verso e espessura do metal, com a silhueta do aro somada ao campo
  const verso = ZAMAK.metal({roughness:.32, alphaTest:.5});
  const bordaM = ZAMAK.metal({roughness:.45, alphaTest:.5, side:THREE.DoubleSide});
  const back = new THREE.Mesh(geo, verso); back.rotation.y = Math.PI; back.position.z = -.034; kc.add(back);
  for(let k=0;k<8;k++){ const s = new THREE.Mesh(geo, bordaM); s.position.z = -.03 + k*.0045; kc.add(s); }


  const ouroArg = ZAMAK.argola();
  const argola = new THREE.Mesh(new THREE.TorusGeometry(.06,.017,12,36), ouroArg); argola.position.y = H/2+.035; kc.add(argola);
  const anel = new THREE.Mesh(new THREE.TorusGeometry(.13,.014,12,48), ouroArg); anel.rotation.y = Math.PI/2; anel.position.y = H/2+.2; kc.add(anel);

  /* plaquinha com o nome gravado a laser */
  const PW = .78, PH = .17;
  const placa = new THREE.Group(); placa.visible = false; kc.add(placa);
  const PLACA_Y = -H/2 - .17;
  const chapa = new THREE.Mesh(new THREE.BoxGeometry(PW, PH, .03), new THREE.MeshStandardMaterial({color:0xD3A75C, metalness:.92, roughness:.3}));
  placa.add(chapa);
  const friso = new THREE.Mesh(new THREE.BoxGeometry(PW-.035, PH-.035, .002), new THREE.MeshStandardMaterial({color:0xB88A42, metalness:.95, roughness:.5}));
  friso.position.z = .0155; placa.add(friso);
  const NC = document.createElement("canvas"); NC.width = 1024; NC.height = 224;
  const ng = NC.getContext("2d");
  const nomeTex = new THREE.CanvasTexture(NC); nomeTex.colorSpace = THREE.SRGBColorSpace; nomeTex.anisotropy = 8;
  const gravura = new THREE.Mesh(new THREE.PlaneGeometry(PW-.04, (PW-.04)*224/1024), new THREE.MeshStandardMaterial({map:nomeTex, transparent:true, metalness:.3, roughness:.7, emissiveMap:nomeTex, emissive:0xffffff, emissiveIntensity:0}));
  gravura.position.z = .0172; placa.add(gravura);
  const laser = new THREE.Sprite(new THREE.SpriteMaterial({map:null, color:0xffe6b0, blending:THREE.AdditiveBlending, transparent:true, depthWrite:false, opacity:0}));
  laser.scale.set(.09,.09,1); laser.position.z = .03; placa.add(laser);
  let grava = null, nomePlaca = "";
  function textoPlaca(){
    let n = (st.nome || "").toUpperCase().replace(/\s+/g," ").trim();
    if(n.length > 20){ const p = n.split(" "); n = p.length > 1 ? p[0] + " " + p[p.length-1] : n.slice(0,20); }
    return n;
  }
  function desenhaNome(prog){
    const W = 1024, Hn = 224; ng.clearRect(0,0,W,Hn);
    let fs = 120; ng.font = `800 ${fs}px Manrope, system-ui, sans-serif`;
    try{ ng.letterSpacing = "5px"; }catch(e){}
    while(ng.measureText(nomePlaca).width > 940 && fs > 48){ fs -= 4; ng.font = `800 ${fs}px Manrope, system-ui, sans-serif`; }
    ng.textAlign = "center"; ng.textBaseline = "middle";
    const largura = ng.measureText(nomePlaca).width, x0 = W/2 - largura/2 - 12, corte = x0 + (largura + 24)*prog;
    ng.save(); ng.beginPath(); ng.rect(0,0,corte,Hn); ng.clip();
    ng.fillStyle = "rgba(255,240,205,.55)"; ng.fillText(nomePlaca, W/2, Hn/2 + 4);   // luz na borda de baixo do sulco
    ng.fillStyle = "#2b1a07"; ng.fillText(nomePlaca, W/2, Hn/2);
    if(prog < 1){   // metal ainda quente perto do laser
      ng.globalCompositeOperation = "source-atop";
      const gr = ng.createLinearGradient(corte-90,0,corte,0); gr.addColorStop(0,"rgba(255,120,20,0)"); gr.addColorStop(1,"rgba(255,170,60,1)");
      ng.fillStyle = gr; ng.fillRect(corte-90,0,90,Hn);
    }
    ng.restore();
    nomeTex.needsUpdate = true;
    return (corte/W - .5)*(PW-.04);
  }
  // faíscas da revelação
  const NP = 120, pp = new Float32Array(NP*3), pv = new Float32Array(NP*3);
  const pgeo = new THREE.BufferGeometry(); pgeo.setAttribute("position", new THREE.BufferAttribute(pp,3));
  const dot = (()=>{ const c = document.createElement("canvas"); c.width = c.height = 64; const g = c.getContext("2d"), gr = g.createRadialGradient(32,32,0,32,32,32);
    gr.addColorStop(0,"rgba(255,245,220,1)"); gr.addColorStop(.3,"rgba(255,210,120,.8)"); gr.addColorStop(1,"rgba(255,180,60,0)"); g.fillStyle = gr; g.fillRect(0,0,64,64);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; })();
  const pmat = new THREE.PointsMaterial({map:dot, size:.06, transparent:true, opacity:0, depthWrite:false, blending:THREE.AdditiveBlending, color:0xffffff});
  const sparks = new THREE.Points(pgeo, pmat); scene.add(sparks);
  let sparkT = -1;
  function explode(cor){
    pmat.color.set(cor).lerp(new THREE.Color(0xffd28a), .35);
    for(let i=0;i<NP;i++){ const a = Math.random()*Math.PI*2, b = Math.acos(2*Math.random()-1), v = .9 + Math.random()*1.6;
      pp[i*3]=pp[i*3+1]=pp[i*3+2]=0; pv[i*3]=Math.sin(b)*Math.cos(a)*v; pv[i*3+1]=Math.sin(b)*Math.sin(a)*v*.9; pv[i*3+2]=Math.abs(Math.cos(b))*v*.6; }
    pgeo.attributes.position.needsUpdate = true; sparkT = 0;
  }

  /* imagens do aro e do campo, lidas do próprio SVG */
  const carrega = src => new Promise(ok=>{ const i = new Image(); i.onload = ()=>ok(i); i.onerror = ()=>ok(null); i.src = src; });
  let mask = null, pronto = false, silhueta = null;
  Promise.all([
    carrega(svg.querySelector("#shieldBody > image").getAttribute("href")),
    carrega(svg.querySelector("#fieldMask image").getAttribute("href"))
  ]).then(([frame, m])=>{
    if(!frame || !m) return;
    mask = m;
    const ft = new THREE.Texture(frame); ft.colorSpace = THREE.SRGBColorSpace; ft.needsUpdate = true; aroMat.map = ft; aroMat.needsUpdate = true;
    // silhueta: aro + campo, no canal verde para o alphaMap
    const c = document.createElement("canvas"); c.width = 320; c.height = 358; const g = c.getContext("2d");
    g.drawImage(frame,0,0); g.drawImage(m,0,0);
    const d = g.getImageData(0,0,320,358), p = d.data;
    for(let i=0;i<p.length;i+=4){ const a = p[i+3]; p[i]=p[i+1]=p[i+2]=a; p[i+3]=255; }
    g.putImageData(d,0,0);
    laser.material.map = dot; laser.material.needsUpdate = true;
    const sil = silhueta = new THREE.CanvasTexture(c); verso.alphaMap = sil; bordaM.alphaMap = sil; verso.needsUpdate = bordaM.needsUpdate = true;
    pronto = true; renderer.compile(scene, cam); if(!falhou) box.classList.add("gl-on");
    desenhaCampo(); ajusta(); pede();
  });

  /* o molde: fica vazio durante o quiz (a casa é surpresa); cada resposta só faz um reflexo dourado passar */
  const FUNDO = (245-36)/223.75;
  let reluz = null, cheia = null;
  function desenhaCampo(t){
    if(!mask) return;
    const Wc = 320, Hc = 358;
    fg.globalCompositeOperation = "source-over"; fg.clearRect(0,0,Wc,Hc);
    const gr = fg.createLinearGradient(0,0,0,Hc); gr.addColorStop(0,"#2a2419"); gr.addColorStop(1,"#4a3d27");
    fg.fillStyle = gr; fg.fillRect(0,0,Wc,Hc);
    if(reluz){
      const p = Math.min(1, (t - reluz.t0)/.7), x = -Wc*.6 + p*Wc*2.2;
      const b = fg.createLinearGradient(x-90,0,x+90,Hc*.4); b.addColorStop(0,"rgba(255,214,140,0)"); b.addColorStop(.5,"rgba(255,214,140,.55)"); b.addColorStop(1,"rgba(255,214,140,0)");
      fg.fillStyle = b; fg.fillRect(0,0,Wc,Hc);
      if(p >= 1) reluz = null;
    }
    if(cheia){
      const p = Math.min(1, (t - cheia.t0)/(reduz ? .01 : 1.25)), e = p<.5 ? 4*p*p*p : 1-Math.pow(-2*p+2,3)/2;
      const topo = FUNDO - (FUNDO + .02)*e;
      fg.fillStyle = cheia.cor; fg.beginPath(); fg.moveTo(0,Hc);
      for(let x=0;x<=Wc;x+=8) fg.lineTo(x, (topo + Math.sin(x*.05 + t*8)*.015*(1-p))*Hc);
      fg.lineTo(Wc,Hc); fg.closePath(); fg.fill();
    }
    const gl = fg.createLinearGradient(0,0,Wc*.8,Hc); gl.addColorStop(0,"rgba(255,255,255,.2)"); gl.addColorStop(.42,"rgba(255,255,255,0)");
    fg.fillStyle = gl; fg.fillRect(0,0,Wc,Hc);
    fg.globalCompositeOperation = "destination-in"; fg.drawImage(mask,0,0);
    fieldTex.needsUpdate = true;
  }

  /* movimento */
  const mov = {giro:0, giroAlvo:0, vel:0, pulso:0, revela:-1, casa:null, arrasta:null, inercia:0};
  function ajusta(){
    const r = box.getBoundingClientRect(); if(!r.width) return;
    renderer.setSize(r.width, r.height, false); cam.aspect = r.width/r.height; cam.updateProjectionMatrix();
  }
  addEventListener("resize", ()=>{ ajusta(); pede(); });
  new ResizeObserver(()=>{ ajusta(); pede(); }).observe(box);

  // arrastar para girar o brasão
  cv.addEventListener("pointerdown", e=>{ mov.arrasta = {x:e.clientX, g:mov.giro}; cv.setPointerCapture(e.pointerId); mov.inercia = 0; pede(); });
  cv.addEventListener("pointermove", e=>{ if(!mov.arrasta) return; const dx = e.clientX - mov.arrasta.x;
    const novo = mov.arrasta.g + dx*.012; mov.inercia = (novo - mov.giro)*60; mov.giro = mov.giroAlvo = novo; pede(); });
  const solta = ()=>{ if(!mov.arrasta) return; mov.arrasta = null; mov.giroAlvo = Math.round((mov.giro + mov.inercia*.25)/(Math.PI*2))*Math.PI*2; pede(); };
  cv.addEventListener("pointerup", solta); cv.addEventListener("pointercancel", solta);

  let t0 = 0, ult = 0, rodando = false, visivel = true, alvoY = 0;
  function quadro(now){
    rodando = false;
    if(!t0) t0 = now; const t = (now-t0)/1000, dt = Math.min(.05,(now-ult)/1000 || .016); ult = now;
    if(reluz || cheia) desenhaCampo(t);

    // revelação: gira rápido, troca para o brasão no auge e assenta de frente
    let extra = 0;
    if(mov.revela >= 0){
      const r = t - mov.revela;
      if(cheia && r > 1.3){ cheia.fim = true; }
      if(r > 1.25 && !crest.visible){ /* espera o esmalte encher */ }
      const s = r - 1.25;
      if(s > 0 && !reduz){
        const dur = 1.6, p = Math.min(1, s/dur);
        const e = p<.5 ? 2*p*p : 1-Math.pow(-2*p+2,2)/2;
        extra = e * Math.PI*6;
        if(p > .42 && !crest.visible) mostraBrasao();
        flash.intensity = 10*Math.max(0, 1-Math.abs(p-.45)*4);
        if(p >= 1){ mov.revela = -1; mov.giro = mov.giroAlvo = Math.round(mov.giro/(Math.PI*2))*Math.PI*2; extra = 0; iniciaGravura(t); }
      } else if(s > 0 && reduz && !crest.visible){ mostraBrasao(); mov.revela = -1; iniciaGravura(t); }
    }
    if(crest.visible && crestMat.opacity < 1){ crestMat.opacity = Math.min(1, crestMat.opacity + dt*(reduz?60:4)); campoMat.opacity = aroMat.opacity = 1 - crestMat.opacity; }
    // o metal da revelação brilha quente e esfria
    if(cheia){ const r = t - cheia.t0; campoMat.emissiveIntensity = reduz ? .3 : .16 + Math.min(1, r/1.1)*.5 - Math.max(0, r-1.4)*.6; }
    if(crest.visible && crestMat.emissive){ crestMat.emissiveIntensity = Math.max(0, crestMat.emissiveIntensity - dt*.55); }
    corpo.visible = crestMat.opacity < 1;

    // plaquinha: sobe até o brasão e o laser escreve o nome
    let subida = placa.visible ? 1 : 0;
    if(grava){
      const r = t - grava.t0;
      subida = reduz ? 1 : Math.min(1, r/.45); const es = 1-Math.pow(1-subida,3);
      placa.position.y = PLACA_Y - .25*(1-es); placa.scale.setScalar(.85 + .15*es);
      const g = reduz ? 1 : Math.min(1, Math.max(0, (r-.5)/1.5));
      const lx = desenhaNome(g);
      laser.position.x = lx; laser.material.opacity = g > 0 && g < 1 ? .9 + Math.sin(t*60)*.1 : 0;
      gravura.material.emissiveIntensity = g < 1 ? .35 : Math.max(0, .35 - (r-2)*.4);
      if(g >= 1 && !grava.avisou){ grava.avisou = true; dispatchEvent(new CustomEvent("quiz:gravado")); }
      if(g >= 1 && r > 2.9){ grava = null; gravura.material.emissiveIntensity = 0; }
    }
    alvoY += ((placa.visible ? .08 : 0) - alvoY)*Math.min(1, dt*3);
    cam.position.z += ((placa.visible ? 4.15 : 3.55) - cam.position.z)*Math.min(1, dt*3);

    if(!mov.arrasta){ mov.giro += (mov.giroAlvo - mov.giro)*Math.min(1, dt*4); }
    mov.pulso *= Math.pow(.02, dt);
    const balanco = reduz ? 0 : Math.sin(t*.7)*.32;
    kc.rotation.y = mov.giro + extra + (mov.revela >= 0 ? 0 : balanco);
    kc.rotation.z = reduz ? 0 : Math.sin(t*1.9)*.02*mov.pulso*4 + Math.sin(t*.9)*.015;
    kc.rotation.x = reduz ? 0 : Math.sin(t*.55)*.05;
    kc.position.y = BASE_Y + alvoY + (reduz ? 0 : Math.sin(t*1.2)*.02);
    const sc = 1 + mov.pulso*.06; kc.scale.setScalar(sc);

    if(sparkT >= 0){ sparkT += dt; const p = sparkT/1.4;
      for(let i=0;i<NP;i++){ pp[i*3]+=pv[i*3]*dt; pp[i*3+1]+=pv[i*3+1]*dt - .4*sparkT*dt; pp[i*3+2]+=pv[i*3+2]*dt; pv[i*3]*=.97; pv[i*3+1]*=.97; pv[i*3+2]*=.97; }
      pgeo.attributes.position.needsUpdate = true; pmat.opacity = Math.max(0, 1-p); if(p>=1) sparkT = -1; }

    renderer.render(scene, cam);
    const anima = !reduz || reluz || cheia || grava || mov.revela>=0 || sparkT>=0 || Math.abs(mov.giroAlvo-mov.giro)>.001 || (crest.visible && crestMat.opacity<1);
    if(visivel && !document.hidden && anima) agenda();
  }
  function agenda(){ if(!rodando){ rodando = true; requestAnimationFrame(quadro); } }
  function pede(){ if(pronto && !falhou) agenda(); }
  new IntersectionObserver(es=>{ visivel = es[0].isIntersecting; if(visivel) pede(); }).observe(box);
  document.addEventListener("visibilitychange", ()=>{ if(!document.hidden) pede(); });

  function iniciaGravura(t){
    nomePlaca = textoPlaca(); if(!nomePlaca) return;
    desenhaNome(0); placa.visible = true; placa.position.y = PLACA_Y; grava = {t0:t, avisou:false}; pede();
    setTimeout(()=>dispatchEvent(new CustomEvent("quiz:laser",{detail: reduz ? .4 : 1.5})), reduz ? 0 : 500);
  }
  function mostraBrasao(){
    const c = mov.casa; if(!c) return;
    const img = new Image();
    img.onload = ()=>{
      const z = ZAMAK.material(img, {transparent:true, opacity:crestMat.opacity, emissive:0xff8a1e, emissiveIntensity:1.1, metalness:.75, roughness:.42});
      crestMat.dispose(); crestMat = z.mat; crest.material = crestMat;
      const ar = img.naturalWidth/img.naturalHeight; crest.scale.set(H*ar*1.002, H*1.002, 1);
      verso.alphaMap = bordaM.alphaMap = z.alpha; verso.needsUpdate = bordaM.needsUpdate = true;
      pede();
    };
    img.src = ESCUDO[c];
    crest.visible = true; crestMat.opacity = .001;
    dispatchEvent(new CustomEvent("quiz:brasao"));
    explode("#F0AD33"); pede();
  }
  /* ganchos do quiz */
  addEventListener("quiz:zera", ()=>{
    reluz = null; cheia = null; grava = null; mov.revela = -1; mov.casa = null; placa.visible = false; laser.material.opacity = 0;
    crest.visible = false; crestMat.opacity = 0; campoMat.opacity = aroMat.opacity = 1; campoMat.emissiveIntensity = .16; corpo.visible = true;
    if(silhueta){ verso.alphaMap = bordaM.alphaMap = silhueta; verso.needsUpdate = bordaM.needsUpdate = true; }
    desenhaCampo(0); pede();
  });
  addEventListener("quiz:comeca", ()=>{ mov.giroAlvo += Math.PI*2; mov.pulso = 1; pede(); });
  addEventListener("quiz:pinga", ()=>{ reluz = {t0: t0 ? (performance.now()-t0)/1000 : 0}; mov.pulso = 1; pede(); });
  addEventListener("quiz:revela", e=>{
    mov.casa = e.detail; const now = t0 ? (performance.now()-t0)/1000 : 0;
    cheia = {cor:"#E3921F", t0:now}; mov.revela = now; pede();
  });
  window.quiz3d = {foto: ()=>{ if(!pronto) return null; renderer.render(scene, cam); return cv.toDataURL("image/png"); }};
})();
