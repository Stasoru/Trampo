/* Story do Instagram (1080x1920) com o chapéu 3D: `node src/banner-chapeu-stories.js <saida.png>` a partir de quiz-casas/ */
const {chromium}=require('playwright');
const fs=require('fs'), path=require('path'), os=require('os');
const A=path.resolve(__dirname,'../assets'), out=process.argv[2]||'banner-stories-chapeu.png';
const b64=f=>fs.readFileSync(path.join(A,f)).toString('base64');
const crest=i=>`<img src="data:image/webp;base64,${b64('img'+i+'.webp')}" alt="">`;
const html=`<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Manrope;font-weight:200 800;src:url(data:font/woff2;base64,${b64('manrope-latin.woff2')}) format("woff2")}
*{box-sizing:border-box;margin:0}
body{width:540px;height:960px;overflow:hidden;background:#0D0D0D;color:#F4EFE6;font-family:Manrope,sans-serif;position:relative}
.luz{position:absolute;inset:0;background:radial-gradient(55% 30% at 50% 28%,rgba(240,173,51,.16),rgba(240,173,51,0) 70%),radial-gradient(80% 40% at 50% 100%,#000,rgba(0,0,0,0) 70%)}
.logo{position:absolute;top:40px;left:50%;transform:translateX(-50%);width:132px}
#chapeu{position:absolute;top:44px;left:50%;transform:translateX(-50%);width:400px}
#cpgl{width:400px;height:440px;display:block}
.txt{position:absolute;left:0;right:0;bottom:112px;display:grid;justify-items:center;gap:16px;text-align:center;padding:0 34px}
.eye{font-weight:800;font-size:12px;letter-spacing:.26em;text-transform:uppercase;color:#F0AD33}
h1{font-weight:800;font-size:50px;line-height:.94;letter-spacing:-.04em;text-transform:uppercase;max-width:10ch}
h1 em{font-style:normal;color:#F0AD33}
p{font-weight:300;font-size:19px;line-height:1.45;color:#D9D3C8;max-width:27ch}
.casas{display:flex;gap:14px;margin:4px 0 6px}
.casas img{width:52px;height:auto;filter:drop-shadow(0 6px 8px rgba(0,0,0,.7))}
.tag{display:inline-flex;align-items:center;gap:12px;background:#F0AD33;color:#141005;font-weight:800;font-size:17px;letter-spacing:.16em;text-transform:uppercase;padding:18px 26px;border-radius:2px}
.tag svg{width:20px;height:20px}
</style></head><body>
<div class="luz"></div>
<img class="logo" src="data:image/svg+xml;base64,${b64('img0.svg')}" alt="">
<div id="chapeu"><canvas id="cpgl"></canvas></div>
<div class="txt">
  <p class="eye">Quiz das casas</p>
  <h1>O chapéu já sabe a sua <em>casa</em></h1>
  <p>Responda 10 perguntas e ganhe o brasão da sua casa com o seu nome gravado a laser.</p>
  <div class="casas">${[1,2,3,4].map(crest).join('')}</div>
  <div class="tag"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M6 13l6 6 6-6"/></svg>Faça o quiz no link</div>
</div>
<script>${fs.readFileSync(path.join(A,'three-0.160.0.min.js'),'utf8')}</script>
<script>${fs.readFileSync(path.join(__dirname,'chapeu3d.js'),'utf8')}</script>
</body></html>`;
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'story-'));const f=path.join(tmp,'s.html');fs.writeFileSync(f,html);
(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const p=await b.newPage({viewport:{width:540,height:960},deviceScaleFactor:2});
await p.goto('file://'+f);
await p.evaluate(()=>{chapeu3d.inicia();chapeu3d.boca(.3)});
await p.waitForTimeout(2600);
await p.screenshot({path:out});
await b.close()})();
