GATE: FAIL 18 (taste-skill; a rodada não avança sem mudança de código, os 18 são os mesmos itens de layout do kit listados abaixo, mais o effect-kind, cujo waiver o checador alterna entre "canvas#gl" e "(the page)")

# Alterações pedidas pelo Lopez (2026-11-22)

- O molde do brasão fica vazio durante o quiz: cada resposta só faz um reflexo dourado passar, e a gota que voa é dourada, sem a cor da casa. O resultado é surpresa.
- Não dá para voltar nem recomeçar durante o quiz, e o botão "Fazer de novo" saiu do resultado.
- O produto é chamado de Brasão em todo o texto. O objeto continua sendo o chaveiro com argola.
- Na revelação, uma plaquinha sobe até o brasão e o laser grava o nome da pessoa, com o metal ainda quente perto do feixe. A imagem de compartilhar mostra o brasão com a plaquinha.
- O nome é obrigatório (no mínimo 2 letras), com aviso de erro no campo.
- copy-lint: 0 FAIL. Fluxo testado em 1440 e 390 sem erros de JavaScript.


# Revisão do quiz das casas, versão 3D completa (2026-11-21)

Mudança revisada nesta rodada: o quiz inteiro ficou em 3D. O emblema virou um chaveiro 3D de Zamak em ouro velho, só com o símbolo da casa (especificação do Lopez). Cada resposta vira uma gota de metal na cor da casa, que voa até o molde e derrama uma camada. A pergunta sai inclinando para trás e as opções da próxima entram viradas como cartas. Na revelação, o molde enche de metal derretido, o chaveiro gira, solta faíscas e esfria mostrando o símbolo em relevo. O fundo do resultado ganha a cor da casa, e a imagem de compartilhar usa uma foto do chaveiro 3D. Se o shader falhar, volta o emblema em SVG.

## Rodada anterior: identidade preta e dourada (2026-11-21)

Mudança revisada: o fundo e a identidade passaram a seguir o site becodiagonal.net (preto, dourado, Manrope, botões retos), e a primeira tela ganhou uma abertura 3D (three.js 0.160, embutido): a caixa preta do Beco treme, a tampa sobe e encosta atrás, e os quatro chaveiros com os brasões originais sobem girando com pó dourado. O ponteiro inclina a câmera e um clique gira o chaveiro.

## FAILs abertos da taste-skill

Regras de layout do kit da taste-skill que não batem com a página escolhida:

- container-edges (7): a página não usa `.wrap`, `header.nav` e `footer.closing` do kit. A abertura ocupa a tela inteira e o quiz fica centrado.
- one-heading (3), one-section (2), section-height (1): as seções da landing seguem o conteúdo, não a grade de uma seção por tela.
- no-visual (2): "Como funciona" tem ícones próprios e "As quatro casas" tem os brasões. O checador não os reconhece.
- copy-headings (1): os h3 são os nomes das casas.
- split-pair (1): a seção do brinde não cai nas linhas de divisão do kit.

## Waivers (`.taste-skill/waivers.json`)

- nav: página única. O topo repete o site, só com o logo.
- container: mesmo motivo dos container-edges.
- hero-screen: o checador mede o palco do quiz como herói. O herói de verdade é a abertura, que tem exatamente 100svh.
- effect-kind: o cliente pediu a abertura 3D (escolheu a caixa num cartão de decisão) e depois o quiz inteiro em 3D.
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
