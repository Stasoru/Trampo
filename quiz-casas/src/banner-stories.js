/* Story do Instagram (1080x1920) com a caixa aberta e os brasões: `node src/banner-stories.js <saida.png>` a partir de quiz-casas/ */
const {chromium}=require('playwright');
const path=require('path');
const out=process.argv[2]||'banner-stories-quiz.png';
(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const p=await b.newPage({viewport:{width:540,height:960},deviceScaleFactor:2});
await p.addInitScript(()=>{window.ABERTURA_QUADRO={cy:.27,rh:.46}});
await p.goto('file://'+path.resolve(__dirname,'../index.html'));
await p.addStyleTag({content:`
.skip,.cue,.som,#portal,.top{display:none!important}
.open{height:960px;min-height:960px;grid-template-rows:1fr auto!important}
.open-copy{padding:0 34px 112px;gap:16px;background:linear-gradient(180deg,rgba(13,13,13,0),rgba(13,13,13,.86) 26%,#0D0D0D)}
.story-eye{font:800 12px/1 Manrope,sans-serif;letter-spacing:.26em;text-transform:uppercase;color:#F0AD33}
.mega{font-size:52px;max-width:10ch}
.open-lead{font-size:19px;max-width:27ch;color:#D9D3C8}
.cta{display:none}
.story-tag{display:inline-flex;align-items:center;gap:12px;background:#F0AD33;color:#141005;font:800 17px/1 Manrope,sans-serif;letter-spacing:.16em;text-transform:uppercase;padding:18px 26px;border-radius:2px}
.story-tag svg{width:20px;height:20px}
.story-logo{position:absolute;top:40px;left:50%;transform:translateX(-50%);width:132px;z-index:5}
.js .open-copy>*{animation:none!important}
`});
await p.evaluate(()=>{
  document.documentElement.classList.remove('portal-on');
  const c=document.querySelector('.open-copy');
  const e=document.createElement('p');e.className='story-eye';e.textContent='Quiz das casas';c.prepend(e);
  document.querySelector('.open-lead').textContent='Responda 10 perguntas e ganhe o brasão da sua casa com o seu nome gravado a laser.';
  const t=document.createElement('div');t.className='story-tag';
  t.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M6 13l6 6 6-6"/></svg>Faça o quiz no link';
  c.appendChild(t);
  dispatchEvent(new CustomEvent('quiz:entra'));dispatchEvent(new Event('resize'));
});
await p.waitForTimeout(6500);
await p.screenshot({path:out,clip:{x:0,y:0,width:540,height:960}});
await b.close()})();
