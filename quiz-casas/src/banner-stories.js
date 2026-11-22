const {chromium}=require('playwright');
const S='/tmp/claude-0/-home-user/ea6b3a11-ec6e-58f7-902c-d0ed18ecb106/scratchpad/story/';
require('fs').mkdirSync(S,{recursive:true});
(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const p=await b.newPage({viewport:{width:540,height:960},deviceScaleFactor:2});
await p.addInitScript(()=>{window.ABERTURA_QUADRO={cy:.29,rh:.47}});
await p.goto('file:///home/user/trampo/quiz-casas/index.html');
await p.addStyleTag({content:`
.skip,.cue{display:none!important}
.open{height:960px;min-height:960px;grid-template-rows:auto 1fr auto}
.top{display:none}
.open{grid-template-rows:1fr auto!important}
.open-copy{padding:0 36px 132px;gap:18px;background:linear-gradient(180deg,rgba(13,13,13,0),rgba(13,13,13,.85) 30%,#0D0D0D)}
.mega{font-size:60px;max-width:10ch}
.open-lead{font-size:20px;max-width:26ch;color:#D9D3C8}
.cta{display:none}
.story-tag{display:inline-flex;align-items:center;gap:12px;background:#F0AD33;color:#141005;font:800 18px/1 Manrope,sans-serif;letter-spacing:.16em;text-transform:uppercase;padding:18px 26px;border-radius:2px}
.story-tag svg{width:20px;height:20px}
.story-note{font:600 13px/1.4 Manrope,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#8C877E}
.js .open-copy>*{animation:none!important}
`});
await p.evaluate(()=>{
  document.querySelector('.open-lead').textContent='Responda 10 perguntas e ganhe o brasão da sua casa com o seu nome gravado.';
  const c=document.querySelector('.open-copy');
  const t=document.createElement('div');t.className='story-tag';
  t.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M6 13l6 6 6-6"/></svg>Faça o quiz no link abaixo';
  c.appendChild(t);
  
  dispatchEvent(new Event('resize'));
});
await p.waitForTimeout(6500);
await p.screenshot({path:S+'banner-stories-quiz.png',clip:{x:0,y:0,width:540,height:960}});
await b.close()})();
