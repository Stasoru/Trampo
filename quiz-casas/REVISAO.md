GATE: OPEN 16 (taste-skill, 3 rodadas usadas)

# Revisão do quiz das casas (2026-11-21)

## FAILs abertos da taste-skill (divergência com o DESIGN.md)

Todos vêm do sistema de layout da própria taste-skill (`.wrap`, uma seção por tela, barra de navegação). O contrato de direção e o DESIGN.md pedem uma cartela de chaveiro centrada, então o DESIGN.md vale:

- container-edges (7): blocos centrados na cartela, picote de borda a borda, sem `.wrap`.
- section-height (2) e one-section (2): as seções seguem o conteúdo da cartela, não a grade de telas.
- one-heading (1): os três h2 da landing ficam dentro de um `div.land`.
- no-visual (2): "Como funciona" tem ícones próprios e "As quatro casas" tem os brasões; o checador não reconhece.
- copy-headings (1): os h3 são os nomes das casas.
- split-pair (1): grade da seção do brinde no desktop.

## Waivers (`.taste-skill/waivers.json`)

nav, product-shown, moment-none, container, hero-screen. Os motivos estão no arquivo.

## Problemas objetivos corrigidos

Foco visível nos botões, link de pular, meta tags de compartilhamento, contraste, áreas de toque, alinhamento do split, sobra de 5px na dobra do celular, nomes longos e emoji na plaqueta, imagem de compartilhamento.

## O que não deu para checar

- `assets/layout/check.mjs` quebrou (TypeError em `r.sections`): a página não usa a estrutura de seções do kit.
- perf.mjs: 2 FAIL de "imagem maior que o tamanho mostrado". São os brasões e o logo embutidos uma vez só e reaproveitados em tamanho grande no resultado e na imagem de compartilhar. Ficam assim.

## Outras revisões

- Revisão final da impeccable: refez o emblema (rebuild) e depois aprovou as 4 correções (ship).
- Animação (review-animations): tirada a transição de largura do emblema, entrada da pergunta 240ms, camada de esmalte 500ms.
- Casos extremos (break-ui): nome de 24 letras em 320px, emoji, sem nome, sem estouro.
