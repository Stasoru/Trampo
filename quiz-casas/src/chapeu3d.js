/* ====== CHAPÉU FALANTE 3D: couro preto envelhecido, faixa dourada, rosto formado pelas dobras ====== */
(function(){
  const cv = document.getElementById("cpgl"), box = document.getElementById("chapeu");
  if(!cv || !box || !window.THREE) return;
  let renderer;
  try{ renderer = new THREE.WebGLRenderer({canvas:cv, antialias:true, alpha:true, powerPreference:"high-performance"}); }
  catch(e){ return; }
  renderer.setPixelRatio(Math.min(2, devicePixelRatio||1));
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(28, 300/330, .1, 50);
  cam.position.set(0, 1.35, 8.6); cam.lookAt(.18, .86, 0);

  scene.add(new THREE.HemisphereLight(0xffe7c4, 0x140c05, .5));
  const key = new THREE.DirectionalLight(0xfff0d8, 1.9); key.position.set(-2.5, 4, 4); scene.add(key);
  const rim = new THREE.DirectionalLight(0xF0AD33, 2.2); rim.position.set(3, 2.4, -3); scene.add(rim);
  const rim2 = new THREE.DirectionalLight(0xF7C25C, 1.4); rim2.position.set(-3.4, 1.2, -2); scene.add(rim2);
  const baixo = new THREE.PointLight(0xF0AD33, .35, 6); baixo.position.set(0, -.6, 1.6); scene.add(baixo);

  /* textura de grão do couro (bump) */
  function grao(){
    const c = document.createElement("canvas"); c.width = c.height = 256;
    const g = c.getContext("2d"), d = g.createImageData(256,256);
    for(let i=0;i<d.data.length;i+=4){
      const x = (i/4)%256, y = Math.floor(i/4/256);
      const v = 128 + (Math.random()-.5)*70 + Math.sin(x*.21+y*.07)*14 + Math.sin(y*.33-x*.05)*10;
      d.data[i] = d.data[i+1] = d.data[i+2] = v; d.data[i+3] = 255;
    }
    g.putImageData(d,0,0);
    const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(3,3); return t;
  }
  const bump = grao();
  const couro = new THREE.MeshStandardMaterial({vertexColors:true, roughness:.74, metalness:.06, bumpMap:bump, bumpScale:.35, side:THREE.DoubleSide});

  /* ---------- corpo do chapéu: tubo ao longo de uma espinha torta ---------- */
  const NU = 120, NV = 104, H = 2.15, R0 = .6;
  const n = (NU+1)*(NV+1);
  const pos = new Float32Array(n*3), col = new Float32Array(n*3), uv = new Float32Array(n*2);
  const base = new Float32Array(n*3), dir = new Float32Array(n*3), mBoca = new Float32Array(n), mLabio = new Float32Array(n), mSobr = new Float32Array(n), tom = new Float32Array(n);
  const sm = (a,b,x)=>{ const t = Math.min(1,Math.max(0,(x-a)/(b-a))); return t*t*(3-2*t); };
  const ga = (x,s)=>Math.exp(-(x*x)/s);
  let k = 0;
  for(let i=0;i<=NU;i++){
    const u = i/NU;
    // espinha: sobe, verga para a direita e a ponta cai
    const cx = 1.15*Math.pow(Math.max(0,u-.5),2)*2.4 - .05*Math.sin(u*3);
    const cy = u*H - 1.6*Math.pow(Math.max(0,u-.72),2.2);
    for(let j=0;j<=NV;j++,k++){
      const th = j/NV*Math.PI*2 + Math.PI;   // costura atrás
      let d = th > Math.PI ? th - Math.PI*2 : th; if(d > Math.PI) d -= Math.PI*2;     // 0 = frente
      // raio base com barriga e afinando na ponta
      let r = R0*Math.pow(1-u,1.08)*(1 + .14*Math.sin(Math.PI*Math.min(1,u*1.3))) + .014;
      // dobras horizontais do couro amassado, mais fundas no meio
      const amp = sm(.1,.32,u)*(1-sm(.82,1,u));
      const dob = Math.sin(u*34 + 1.6*Math.sin(th*2+u*5) + .8*Math.sin(th*3.1)) * .05*amp
                + Math.sin(u*71 + th*1.3)*.012*amp + Math.sin(th*7 + u*20)*.008;
      r *= 1 + dob*(1 - .75*ga(d,.35)*ga(u-.22,.006));
      // rosto (só na frente)
      const f = ga(d, .9);
      let face = 0, sob = 0, esc = 0;
      for(const s of [-1,1]){
        face -= .085*ga(d - s*.4, .018)*ga(u-.43, .0022);          // órbitas fundas
        sob += ga(d - s*.42, .05)*ga(u - (.5 + s*0) + Math.abs(d - s*.42)*.06, .0011); // sobrancelha em dobra
        esc += ga(d - s*.4, .018)*ga(u-.43, .0022);
      }
      face += .04*ga(d,.12)*ga(u-.35,.004);                         // "nariz": dobra saltada entre os olhos
      face += .045*ga(d,.22)*ga(u-.27,.003);                        // bochechas/lábio de cima
      r *= 1 + face*f*2.2;
      const x = cx + r*Math.sin(th), y = cy, z = r*Math.cos(th);
      base[k*3] = x; base[k*3+1] = y; base[k*3+2] = z;
      dir[k*3] = Math.sin(th); dir[k*3+1] = 0; dir[k*3+2] = Math.cos(th);
      mBoca[k] = ga(d,.3)*f;                                        // largura da boca
      mBoca[k] *= 1; mLabio[k] = u;                                  // altura guardada para a boca
      mSobr[k] = sob*f;
      // tom: couro quase preto, cristas das dobras gastas e mais claras
      tom[k] = .9 + dob*5 + (Math.random()-.5)*.05 - esc*1.4 + sm(.75,1,u)*.08;
      uv[k*2] = j/NV*4; uv[k*2+1] = u*3;
    }
  }
  const idx = [];
  for(let i=0;i<NU;i++) for(let j=0;j<NV;j++){
    const a = i*(NV+1)+j, b = a+NV+1;
    idx.push(a,b,a+1, b,b+1,a+1);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos,3));
  geo.setAttribute("color", new THREE.BufferAttribute(col,3));
  geo.setAttribute("uv", new THREE.BufferAttribute(uv,2));
  geo.setIndex(idx);
  const COURO = [.05,.038,.028];
  function moldaBoca(abre, sobe){
    const ub = .205;                                   // altura da boca
    const alto = .0012 + abre*.009;
    for(let q=0;q<n;q++){
      const u = mLabio[q], w = mBoca[q];
      const boca = w*ga(u-ub, alto);
      const labio = w*ga(u-(ub+.03+abre*.025), .0005)*.6 + w*ga(u-(ub-.03-abre*.02), .0006)*.4;
      const sob = mSobr[q];
      const off = -(.035 + abre*.3)*boca + .045*labio + (.035 + sobe*.03)*sob;
      pos[q*3] = base[q*3] + dir[q*3]*off;
      pos[q*3+1] = base[q*3+1] + sob*sobe*.03;
      pos[q*3+2] = base[q*3+2] + dir[q*3+2]*off;
      const esc = 1 - Math.min(.92, boca*(.4 + abre*.9));
      const t = tom[q]*esc;
      col[q*3] = COURO[0]*t + boca*abre*.03; col[q*3+1] = COURO[1]*t; col[q*3+2] = COURO[2]*t;
    }
    geo.attributes.position.needsUpdate = true; geo.attributes.color.needsUpdate = true;
    geo.computeVertexNormals();
  }
  moldaBoca(0, 0);
  const corpo = new THREE.Mesh(geo, couro);

  /* ---------- aba ondulada e caída ---------- */
  const NA = 140, NR = 14, W = .9;
  const ap = [], ac = [], au = [], ai = [];
  for(let a=0;a<=NA;a++){
    const th = a/NA*Math.PI*2;
    for(let r=0;r<=NR;r++){
      const t = r/NR;
      const rr = R0*.97 + t*W*(1 + .06*Math.sin(th*5+.7) + .04*Math.sin(th*9));
      const y = .02 - .26*t*t + .07*t*Math.sin(th*3+.4) + .04*t*t*Math.sin(th*7) + (Math.cos(th)>0 ? -.04*t*Math.cos(th) : .03*t);
      ap.push(rr*Math.sin(th), y, rr*Math.cos(th));
      const tt = (.62 + (Math.random()-.5)*.08 + .1*Math.sin(th*11+t*6)) * (1 - .35*sm(.85,1,t));
      ac.push(COURO[0]*tt, COURO[1]*tt, COURO[2]*tt);
      au.push(a/NA*6, t*1.2);
    }
  }
  for(let a=0;a<NA;a++) for(let r=0;r<NR;r++){ const p = a*(NR+1)+r, q = p+NR+1; ai.push(p,q,p+1, q,q+1,p+1); }
  const ageo = new THREE.BufferGeometry();
  ageo.setAttribute("position", new THREE.Float32BufferAttribute(ap,3));
  ageo.setAttribute("color", new THREE.Float32BufferAttribute(ac,3));
  ageo.setAttribute("uv", new THREE.Float32BufferAttribute(au,2));
  ageo.setIndex(ai); ageo.computeVertexNormals();
  const aba = new THREE.Mesh(ageo, couro);

  /* ---------- faixa dourada gasta ---------- */
  const faixa = new THREE.Mesh(
    new THREE.CylinderGeometry(R0*1.02, R0*1.08, .16, 96, 1, true),
    new THREE.MeshStandardMaterial({color:0xC79A4E, metalness:.95, roughness:.42, bumpMap:bump, bumpScale:.6, side:THREE.DoubleSide})
  );
  faixa.position.y = .11;

  /* ---------- boca: a cavidade escura aparece quando o couro abre ---------- */
  const kb = Math.round(.205*NU)*(NV+1) + NV/2;
  const boca = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16), new THREE.MeshStandardMaterial({color:0x080403, roughness:1, metalness:0}));
  boca.position.set(base[kb*3], base[kb*3+1], base[kb*3+2] - .05);
  boca.visible = false;
  const chapeu = new THREE.Group(); chapeu.add(corpo, aba, faixa, boca);
  chapeu.rotation.x = .04;
  scene.add(chapeu);

  /* ---------- laço ---------- */
  let rodando = false, alvo = 0, abre = 0, sobe = 0, t0 = 0, grito = -1;
  function ajusta(){
    const w = cv.clientWidth || 280, h = cv.clientHeight || 308;
    renderer.setSize(w, h, false); cam.aspect = w/h; cam.updateProjectionMatrix();
  }
  function quadro(now){
    if(!rodando) return;
    if(!t0) t0 = now;
    const t = (now - t0)/1000;
    abre += (alvo - abre)*.45; sobe += (alvo - sobe)*.12;
    moldaBoca(abre, sobe);
    boca.visible = abre > .04; boca.scale.set(.2 + abre*.03, .02 + abre*.1, .07);
    let s = 1;
    if(grito >= 0){ const g = (now - grito)/500; if(g < 1){ s = 1 + .07*Math.sin(g*Math.PI); chapeu.position.y = .12*Math.sin(g*Math.PI); } else { grito = -1; chapeu.position.y = 0; } }
    chapeu.rotation.y = Math.sin(t*.8)*.22 - .05;
    chapeu.rotation.z = Math.sin(t*1.15)*.035;
    chapeu.scale.set(s*(1+abre*.025), s*(1-abre*.03), s*(1+abre*.025));
    renderer.render(scene, cam);
    requestAnimationFrame(quadro);
  }
  let ok = true;
  try{ ajusta(); renderer.compile(scene, cam); }catch(e){ ok = false; }
  window.chapeu3d = {
    inicia(){ if(!ok) return false; box.classList.add("cp-3d"); ajusta(); rodando = true; t0 = 0; requestAnimationFrame(quadro); return true; },
    boca(v){ alvo = Math.max(0, Math.min(1, v)); },
    grita(){ grito = performance.now(); },
    para(){ rodando = false; alvo = abre = sobe = 0; }
  };
  addEventListener("resize", ()=>{ if(rodando) ajusta(); });
})();
