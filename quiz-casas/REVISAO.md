GATE: OPEN 19 (taste-skill, 3 rodadas usadas)

# Revisão do quiz das casas, versão Beco preto e dourado (2026-11-21)

Mudança revisada: o fundo e a identidade passaram a seguir o site becodiagonal.net (preto, dourado, Manrope, botões retos), e a primeira tela ganhou uma abertura 3D (three.js 0.160, embutido): a caixa preta do Beco treme, a tampa sobe e encosta atrás, e os quatro chaveiros com os brasões originais sobem girando com pó dourado. O ponteiro inclina a câmera e um clique gira o chaveiro.

## FAILs abertos da taste-skill

Regras de layout do kit da taste-skill que não batem com a página escolhida:

- container-edges (8): a página não usa `.wrap`, `header.nav` e `footer.closing` do kit. A abertura ocupa a tela inteira e o quiz fica centrado.
- one-heading (3), one-section (2), section-height (1): as seções da landing seguem o conteúdo, não a grade de uma seção por tela.
- no-visual (2): "Como funciona" tem ícones próprios e "As quatro casas" tem os brasões. O checador não os reconhece.
- copy-headings (1): os h3 são os nomes das casas.
- split-pair (1): a seção do brinde não cai nas linhas de divisão do kit.

## Waivers (`.taste-skill/waivers.json`)

- nav: página única. O topo repete o site, só com o logo.
- container: mesmo motivo dos container-edges.
- hero-screen: o checador mede o palco do quiz como herói. O herói de verdade é a abertura, que tem exatamente 100svh.
- effect-kind: o cliente pediu a abertura 3D e escolheu a caixa num cartão de decisão.
- moment-none: o momento da página é a abertura 3D.

## Corrigido nesta revisão

Linhas divisórias viraram bordas das seções (sem seções vazias de 1px), split do brinde alinhado pelo topo, fato concreto na primeira tela ("10 perguntas, uns 3 minutos"), espaçamento do palco no desktop.

## Checado

- copy-lint: 0 FAIL.
- Contraste, área de toque, foco visível, nomes acessíveis, alt, lang: PASS.
- Movimento reduzido: a cena abre direto na pose final, parada, e o texto aparece sem animação.
- Sem WebGL: aparecem os quatro brasões em leque, no lugar da cena.
- A cena para de desenhar quando sai da tela, quando a aba fica oculta e durante o quiz.
- perf: 700 KiB transferidos. 2 FAIL de "imagem maior que o tamanho mostrado" (logo e brasões embutidos uma vez e reaproveitados grandes). Ficam assim.

## O que não deu para checar

- `assets/layout/check.mjs` quebra nesta página (a estrutura de seções do kit não existe aqui).
- `review-animations` não está instalada neste ambiente. O movimento foi conferido quadro a quadro em capturas (0,4 s, 1,3 s, 2,2 s e 4,2 s) e com movimento reduzido.
- A cena foi vista num WebGL por software (SwiftShader). Num celular real ela deve rodar mais rápida e mais lisa, mas não foi testada num aparelho.
