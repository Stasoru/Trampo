/* ====== ABERTURA 3D: a caixa preta do Beco abre e solta os quatro brasões ====== */
(function(){
  const sec = document.getElementById("abertura");
  const cv = document.getElementById("gl");
  const reduz = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ORD = ["gri","cor","luf","son"];

  function semGL(){
    sec.classList.add("no-gl");
    const fb = document.getElementById("fallback");
    fb.innerHTML = ORD.map(k=>`<img src="${ESCUDO[k]}" alt="" width="120" height="134">`).join("");
  }
  if(!window.THREE){ semGL(); return; }

  let renderer;
  try{
    renderer = new THREE.WebGLRenderer({canvas:cv, antialias:true, alpha:true, powerPreference:"high-performance"});
  }catch(e){ semGL(); return; }
  if(!renderer.getContext()){ semGL(); return; }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.setClearColor(0x000000, 0);
  renderer.debug.onShaderError = () => { semGL(); cv.style.display = "none"; };

  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(30, 1, .1, 60);

  /* --- ambiente de estúdio para os reflexos do metal --- */
  (function(){
    const env = new THREE.Scene();
    const room = new THREE.Mesh(new THREE.BoxGeometry(20,12,20), new THREE.MeshBasicMaterial({color:0x0b0b0b, side:THREE.BackSide}));
    env.add(room);
    const panel = (w,h,c,x,y,z,ry,rx) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w,h), new THREE.MeshBasicMaterial({color:c, side:THREE.DoubleSide}));
      m.position.set(x,y,z); m.rotation.set(rx||0, ry||0, 0); env.add(m);
    };
    panel(8,1.2,0xffffff, 0,5.9,0, 0, Math.PI/2);        // softbox de cima
    panel(1.4,6,0xffe2b0, -9.9,1,0, Math.PI/2);          // faixa quente à esquerda
    panel(1.4,6,0xf1e6d6, 9.9,1,-2, -Math.PI/2);         // faixa fria à direita
    panel(6,2,0x8a6a3a, 0,0.5,9.9, Math.PI);             // rebatedor na frente
    const pm = new THREE.PMREMGenerator(renderer);
    scene.environment = pm.fromScene(env, .02).texture;
    pm.dispose();
  })();

  /* --- luzes --- */
  const key = new THREE.DirectionalLight(0xfff1dc, 2.2); key.position.set(-3,6,4); scene.add(key);
  const fill = new THREE.DirectionalLight(0xffd9a0, .9); fill.position.set(1.5,1.2,6); scene.add(fill);
  const rim = new THREE.DirectionalLight(0xe9dccb, 1.1); rim.position.set(4,3,-5); scene.add(rim);
  const inside = new THREE.PointLight(0xffb347, 0, 6, 1.6); inside.position.set(0,1.0,0); scene.add(inside);

  /* --- texturas pequenas desenhadas no canvas --- */
  function radial(stops, size){
    const c = document.createElement("canvas"); c.width = c.height = size||128;
    const g = c.getContext("2d"), r = c.width/2, gr = g.createRadialGradient(r,r,0,r,r,r);
    stops.forEach(s=>gr.addColorStop(s[0],s[1])); g.fillStyle = gr; g.fillRect(0,0,c.width,c.width);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  }
  const dotTex = radial([[0,"rgba(255,236,190,1)"],[.25,"rgba(247,194,92,.85)"],[1,"rgba(240,173,51,0)"]], 64);
  const glowTex = radial([[0,"rgba(255,214,140,.95)"],[.35,"rgba(240,173,51,.35)"],[1,"rgba(240,173,51,0)"]], 256);
  const shadowTex = radial([[0,"rgba(0,0,0,.85)"],[.55,"rgba(0,0,0,.45)"],[1,"rgba(0,0,0,0)"]], 128);

  /* --- a caixa --- */
  const W = 2.4, H = 1.15, D = 2.4, T = .05;
  const papel = new THREE.MeshPhysicalMaterial({color:0x121212, roughness:.7, metalness:0, clearcoat:.18, clearcoatRoughness:.55, envMapIntensity:.45, sheen:.5, sheenColor:new THREE.Color(0x3a332a)});
  const forro = new THREE.MeshStandardMaterial({color:0x2a1d08, roughness:.9, metalness:0, emissive:0x3a2406, emissiveIntensity:0});
  const box = new THREE.Group(); scene.add(box);
  const slab = (w,h,d,x,y,z,m) => { const s = new THREE.Mesh(new THREE.BoxGeometry(w,h,d), m); s.position.set(x,y,z); return s; };
  box.add(slab(W,T,D, 0,T/2,0, papel));
  box.add(slab(W,H,T, 0,H/2, D/2-T/2, papel));
  box.add(slab(W,H,T, 0,H/2,-D/2+T/2, papel));
  box.add(slab(T,H,D-2*T, W/2-T/2,H/2,0, papel));
  box.add(slab(T,H,D-2*T,-W/2+T/2,H/2,0, papel));
  const fundoDentro = slab(W-2*T,.01,D-2*T, 0,T+.006,0, forro); box.add(fundoDentro);

  // sombra de contato no chão
  const sh = new THREE.Mesh(new THREE.PlaneGeometry(6,6), new THREE.MeshBasicMaterial({map:shadowTex, transparent:true, depthWrite:false}));
  sh.rotation.x = -Math.PI/2; sh.position.y = .002; scene.add(sh);

  // tampa: um tampo e quatro abas; a origem fica no centro do tampo
  const LW = W+.12, LD = D+.12, LS = .4;
  const lid = new THREE.Group();
  lid.add(slab(LW,T,LD, 0,-T/2,0, papel));
  lid.add(slab(LW,LS,T, 0,-LS/2, LD/2-T/2, papel));
  lid.add(slab(LW,LS,T, 0,-LS/2,-LD/2+T/2, papel));
  lid.add(slab(T,LS,LD-2*T, LW/2-T/2,-LS/2,0, papel));
  lid.add(slab(T,LS,LD-2*T,-LW/2+T/2,-LS/2,0, papel));
  // faixa de cetim dourado no tampo
  const cetim = new THREE.MeshStandardMaterial({color:0xd99a2b, metalness:.85, roughness:.32});
  lid.add(slab(.26,.012,LD+.004, 0,.006,0, cetim));
  lid.add(slab(.26,LS+.01,.012, 0,-LS/2, LD/2+.004, cetim));
  scene.add(lid);
  const LID_FECHADA = new THREE.Vector3(0, H+.05, 0);
  const LID_ABERTA = new THREE.Vector3(1.55, 1.28, -1.75);
  const LID_ROT_A = new THREE.Euler(0,0,0), LID_ROT_B = new THREE.Euler(-1.22, -.42, -.06);
  lid.position.copy(LID_FECHADA);

  // logo em hot stamping dourado na frente da caixa
  const ouro = new THREE.MeshStandardMaterial({color:0xf0ad33, metalness:.75, roughness:.3, emissive:0xb87514, emissiveIntensity:.55, transparent:true, alphaTest:.3});
  const logo = new Image();
  logo.onload = () => {
    const c = document.createElement("canvas"), ar = logo.naturalWidth/logo.naturalHeight || 2.5;
    c.width = 1024; c.height = Math.round(1024/ar);
    const g = c.getContext("2d"); g.drawImage(logo,0,0,c.width,c.height);
    g.globalCompositeOperation = "source-in"; g.fillStyle = "#fff"; g.fillRect(0,0,c.width,c.height);
    const t = new THREE.CanvasTexture(c); ouro.alphaMap = t; ouro.needsUpdate = true;
    const w = 1.5, plano = new THREE.Mesh(new THREE.PlaneGeometry(w, w/ar), ouro);
    plano.position.set(0, H*.5, D/2+.002); box.add(plano);
    pede();
  };
  logo.src = document.querySelector(".top img").src;

  // brilho que sai de dentro
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex, blending:THREE.AdditiveBlending, depthWrite:false, transparent:true, opacity:0}));
  glow.scale.set(4.2,3.2,1); glow.position.set(0,1.35,0); scene.add(glow);

  // pó dourado subindo
  const N = 170, pos = new Float32Array(N*3), vel = new Float32Array(N);
  const semente = i => { const a = Math.random()*Math.PI*2, r = Math.sqrt(Math.random())*1.05;
    pos[i*3] = Math.cos(a)*r; pos[i*3+1] = .9 + Math.random()*3.2; pos[i*3+2] = Math.sin(a)*r; vel[i] = .18 + Math.random()*.4; };
  for(let i=0;i<N;i++) semente(i);
  const pg = new THREE.BufferGeometry(); pg.setAttribute("position", new THREE.BufferAttribute(pos,3));
  const pm = new THREE.PointsMaterial({map:dotTex, size:.07, transparent:true, opacity:0, depthWrite:false, blending:THREE.AdditiveBlending, color:0xffd28a});
  const dust = new THREE.Points(pg, pm); scene.add(dust);

  /* --- os quatro brasões de Zamak, com a arte original --- */
  const ALVO = [[-1.62,2.2,.32,.3],[-.54,2.72,.1,.1],[.54,2.72,.1,-.1],[1.62,2.2,.32,-.3]];
  const chav = [];
  function chaveiro(img, i){
    const ar = img.naturalWidth/img.naturalHeight, h = 1.18, w = h*ar;
    const g = new THREE.Group();
    const z = ZAMAK.material(img);
    const geo = new THREE.PlaneGeometry(w,h);
    const frente = new THREE.Mesh(geo, z.mat); frente.position.z = .036; g.add(frente);
    const verso = new THREE.Mesh(geo, ZAMAK.metal({alphaMap:z.alpha, alphaTest:.5, roughness:.32}));
    verso.rotation.y = Math.PI; verso.position.z = -.036; g.add(verso);
    const borda = ZAMAK.metal({alphaMap:z.alpha, alphaTest:.5, side:THREE.DoubleSide, roughness:.45});
    for(let k=0;k<9;k++){ const s = new THREE.Mesh(geo, borda); s.position.z = -.032 + k*.008; g.add(s); }
    const ouroArg = ZAMAK.argola();
    const argola = new THREE.Mesh(new THREE.TorusGeometry(.075,.02,12,36), ouroArg); argola.position.y = h/2+.05; g.add(argola);
    const anel = new THREE.Mesh(new THREE.TorusGeometry(.17,.016,12,48), ouroArg); anel.rotation.y = Math.PI/2; anel.position.y = h/2+.27; g.add(anel);
    g.visible = false; g.userData.i = i; scene.add(g);
    chav[i] = {g, giro:0, giroAlvo:0, hit:frente};
  }
  let prontos = 0, t0 = 0;
  ORD.forEach((k,i)=>{
    const img = new Image();
    img.onload = () => { chaveiro(img,i); if(++prontos===4) comeca(); };
    img.onerror = () => { if(++prontos===4) comeca(); };
    img.src = ESCUDO[k];
  });

  /* --- enquadramento: no celular a cena fica em cima, no computador à direita --- */
  let VW = 1, VH = 1;
  const MIRA = new THREE.Vector3(.12, 1.62, 0);
  let dist = 12;
  function ajusta(){
    const r = sec.getBoundingClientRect(); VW = Math.max(1, r.width); VH = Math.max(1, r.height);
    renderer.setSize(VW, VH, false);
    cam.aspect = VW/VH;
    const largo = VW >= 900;
    const o = window.ABERTURA_QUADRO || {};   // ajuste opcional, usado só para gerar artes
    const cx = largo ? VW*.7 : VW*.5, cy = largo ? VH*.5 : VH*(o.cy || .34);
    const rw = largo ? VW*.54 : VW*.98, rh = largo ? VH*.86 : VH*(o.rh || .56);
    const t = Math.tan(THREE.MathUtils.degToRad(cam.fov/2));
    const meiaA = 1.95, meiaL = 2.45;
    dist = Math.max(meiaA*VH/(t*rh), meiaL*VH/(t*rw));
    cam.setViewOffset(VW, VH, VW/2-cx, VH/2-cy, VW, VH);
    cam.updateProjectionMatrix();
    pede();
  }

  /* --- interação: o ponteiro inclina a câmera, o toque gira o chaveiro --- */
  const ptr = {x:0,y:0,sx:0,sy:0};
  sec.addEventListener("pointermove", e=>{
    ptr.x = (e.clientX/VW)*2-1; ptr.y = (e.clientY/VH)*2-1;
    if(e.pointerType==="mouse") cv.style.cursor = acerta(e) >= 0 ? "pointer" : "";
    pede();
  }, {passive:true});
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  function acerta(e){
    const r = cv.getBoundingClientRect();
    ndc.set(((e.clientX-r.left)/r.width)*2-1, -((e.clientY-r.top)/r.height)*2+1);
    ray.setFromCamera(ndc, cam);
    const hits = ray.intersectObjects(chav.filter(Boolean).map(c=>c.hit), false);
    return hits.length ? chav.findIndex(c=>c && c.hit===hits[0].object) : -1;
  }
  cv.addEventListener("click", e=>{
    const i = acerta(e); if(i<0) return;
    chav[i].giroAlvo += Math.PI*2; pede();
  });

  /* --- linha do tempo --- */
  const clamp = v => v<0?0:v>1?1:v;
  const outCubic = v => 1-Math.pow(1-v,3);
  const inOut = v => v<.5 ? 4*v*v*v : 1-Math.pow(-2*v+2,3)/2;
  const outBack = (v,s=1.25) => 1+(s+1)*Math.pow(v-1,3)+s*Math.pow(v-1,2);
  const v3 = new THREE.Vector3(), q1 = new THREE.Quaternion(), q2 = new THREE.Quaternion();
  const CTRL = new THREE.Vector3(.7, H+2.1, -.5);

  function pose(t, dt){
    // câmera
    const c = reduz ? 1 : outCubic(clamp(t/2.8));
    ptr.sx += (ptr.x-ptr.sx)*Math.min(1,dt*3); ptr.sy += (ptr.y-ptr.sy)*Math.min(1,dt*3);
    const az = -.18 + .28*(1-c) + ptr.sx*.16, el = THREE.MathUtils.lerp(.5,.2,c) + ptr.sy*.05;
    const d = dist*THREE.MathUtils.lerp(1.28,1,c);
    cam.position.set(MIRA.x + Math.sin(az)*Math.cos(el)*d, MIRA.y + Math.sin(el)*d, MIRA.z + Math.cos(az)*Math.cos(el)*d);
    cam.lookAt(MIRA);

    // tampa: treme um pouco, sobe e vai encostar atrás da caixa
    const lp = reduz ? 1 : inOut(clamp((t-.75)/1.35));
    const treme = reduz ? 0 : Math.sin(t*42)*.014*clamp((t-.2)/.2)*clamp((.75-t)/.15);
    const a = 1-lp;
    lid.position.set(
      a*a*LID_FECHADA.x + 2*a*lp*CTRL.x + lp*lp*LID_ABERTA.x,
      a*a*LID_FECHADA.y + 2*a*lp*CTRL.y + lp*lp*LID_ABERTA.y + treme,
      a*a*LID_FECHADA.z + 2*a*lp*CTRL.z + lp*lp*LID_ABERTA.z);
    q1.setFromEuler(LID_ROT_A); q2.setFromEuler(LID_ROT_B); lid.quaternion.slerpQuaternions(q1,q2,lp);

    // luz de dentro
    const gl = reduz ? 1 : clamp((t-.85)/.9);
    const pulsa = reduz ? 1 : 1 + Math.sin(t*1.7)*.06;
    inside.intensity = 9*gl*pulsa;
    glow.material.opacity = .75*gl*pulsa;
    forro.emissiveIntensity = 1.2*gl;
    pm.opacity = .9*clamp((t-1.2)/1);

    // chaveiros
    chav.forEach((ch,i)=>{
      if(!ch) return;
      const [x,y,z,ry] = ALVO[i];
      const s0 = 1.15 + i*.13, p = reduz ? 1 : clamp((t-s0)/1.25);
      ch.g.visible = p > 0;
      const e = outBack(p), ep = outCubic(p);
      const flut = reduz ? 0 : Math.sin(t*1.1 + i*1.7)*.05*clamp((t-s0-1)/1);
      ch.g.position.set(THREE.MathUtils.lerp(x*.12,x,ep), THREE.MathUtils.lerp(.55,y,e) + flut, THREE.MathUtils.lerp(0,z,ep));
      ch.g.scale.setScalar(THREE.MathUtils.lerp(.45,1,ep));
      ch.giro += (ch.giroAlvo-ch.giro)*Math.min(1,dt*3.2);
      const balanco = reduz ? 0 : Math.sin(t*.62 + i*1.3)*.26*clamp((t-s0-.8)/1.2);
      ch.g.rotation.set(0, ry + (1-ep)*Math.PI*2*(i%2?-1:1) + balanco + ch.giro, reduz ? 0 : Math.sin(t*.8+i)*.035);
    });

    // poeira
    if(!reduz && t > 1){
      for(let i=0;i<N;i++){
        pos[i*3+1] += vel[i]*dt;
        pos[i*3] += Math.sin(t*.7 + i)*.0016;
        if(pos[i*3+1] > 4.4) { semente(i); pos[i*3+1] = .9; }
      }
      pg.attributes.position.needsUpdate = true;
    }
  }

  /* --- laço: só desenha quando a abertura está na tela --- */
  let visivel = true, rodando = false, ultimo = 0, pedido = false;
  function quadro(now){
    rodando = false;
    if(!t0) t0 = now;
    const t = (now - t0)/1000, dt = Math.min(.05, (now-ultimo)/1000 || .016); ultimo = now;
    pose(t, dt);
    renderer.render(scene, cam);
    if(!reduz && visivel && !document.hidden && !document.body.classList.contains("quizzing")) agenda();
    else if(reduz && Math.abs(ptr.x-ptr.sx)+Math.abs(ptr.y-ptr.sy) > .002) agenda();
    else if(reduz && chav.some(c=>c && Math.abs(c.giroAlvo-c.giro) > .002)) agenda();
  }
  function agenda(){ if(!rodando){ rodando = true; requestAnimationFrame(quadro); } }
  function pede(){ if(t0 || reduz) agenda(); }
  function comeca(){ t0 = 0; ultimo = 0; ajusta(); agenda(); }

  new IntersectionObserver(es=>{ visivel = es[0].isIntersecting; if(visivel) pede(); }).observe(sec);
  document.addEventListener("visibilitychange", ()=>{ if(!document.hidden) pede(); });
  addEventListener("resize", ajusta);
  window.cena3d = {acorda: pede};
  ajusta();
})();
