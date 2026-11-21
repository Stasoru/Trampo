---
name: Quiz das Casas · Beco Diagonal Personalizados
description: Cartela de chaveiro esmaltado em que o quiz fabrica o emblema da sua casa.
colors:
  peg-board: "#141C5E"
  peg-hole: "#0B1142"
  ultramarine-card: "#22309A"
  ultramarine-well: "#1B277F"
  card-line: "rgba(243,238,226,.22)"
  print-cream: "#F3EEE2"
  print-lilac: "#C9CBEA"
  fine-print: "#B4B8E4"
  ink-navy: "#14193F"
  stamp-gold: "#EEA534"
  stamp-gold-light: "#F7C46C"
  gold-ink: "#2A1A02"
  pewter-light: "#D2D0CF"
  pewter-mid: "#8A8989"
  pewter-dark: "#5F5E5E"
  engrave: "#2E2D2D"
  enamel-gri: "#C2362B"
  enamel-gri-deep: "#8E2219"
  on-gri: "#FFF5EE"
  enamel-cor: "#3C8BE6"
  enamel-cor-deep: "#1D4E9E"
  on-cor: "#F2F7FF"
  enamel-luf: "#E9B730"
  on-luf: "#2A1E05"
  enamel-son: "#1E8A55"
  enamel-son-deep: "#145C39"
  on-son: "#EEFBF3"
typography:
  display:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "clamp(42px, 11.5vw, 84px)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.01em"
  display-result:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "clamp(60px, 17vw, 112px)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "clamp(42px, 10vw, 60px)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.01em"
  question:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "clamp(32px, 8vw, 48px)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "0em"
  title:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "26px"
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: "0.01em"
  button:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "22px"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "0.04em"
  stamp-label:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "18px"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "0.04em"
  body:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
  lead:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.55
  fine:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "12.5px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.01em"
rounded:
  tag: "8px"
  field: "12px"
  option: "14px"
  band: "16px"
  card: "22px"
  pill: "999px"
spacing:
  tight: "10px"
  sm: "12px"
  md: "18px"
  lg: "22px"
  section: "34px"
  gutter-mobile: "20px"
  gutter-desktop: "56px"
components:
  button-primary:
    backgroundColor: "{colors.stamp-gold}"
    textColor: "{colors.gold-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "14px 22px"
    height: "56px"
  button-primary-hover:
    backgroundColor: "{colors.stamp-gold-light}"
    textColor: "{colors.gold-ink}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.print-cream}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "14px 22px"
    height: "56px"
  field-input:
    backgroundColor: "{colors.ultramarine-well}"
    textColor: "{colors.print-cream}"
    typography: "{typography.lead}"
    rounded: "{rounded.field}"
    padding: "14px 16px"
  answer-option:
    backgroundColor: "{colors.ultramarine-well}"
    textColor: "{colors.print-cream}"
    typography: "{typography.body}"
    rounded: "{rounded.option}"
    padding: "12px 16px"
    height: "58px"
  answer-option-picked:
    backgroundColor: "{colors.stamp-gold}"
    textColor: "{colors.gold-ink}"
  trait-tag:
    backgroundColor: "transparent"
    typography: "{typography.stamp-label}"
    rounded: "{rounded.tag}"
    padding: "8px 12px"
  result-band-cor:
    backgroundColor: "{colors.enamel-cor-deep}"
    textColor: "{colors.on-cor}"
    typography: "{typography.body}"
    rounded: "{rounded.band}"
    padding: "22px 20px"
---

# Design System: Quiz das Casas

## Overview

**Creative North Star: "A Cartela do Chaveiro"**

A página inteira é a cartela de papelão de uma embalagem de chaveiro: um retângulo azul ultramar chapado, com o furo de pendurar (euro slot) no topo, impressão em dourado e creme, picote entre as seções e letras miúdas de lote no rodapé. No celular a cartela ocupa a tela de ponta a ponta; a partir de 800px ela vira um objeto pendurado num painel perfurado (pegboard) azul-noite, com cantos arredondados e sombra de objeto. Tudo o que é interface está impresso nessa cartela; o único objeto em relevo é o emblema de estanho.

O emblema é o herói e o indicador de progresso ao mesmo tempo. Começa vazio, em metal fosco, com a plaqueta "SEU NOME"; cada resposta despeja uma faixa de esmalte duro na cor da casa favorecida; no resultado o esmalte fecha, o brasão da casa aparece dentro da moldura e o nome sai gravado na plaqueta. Os quatro brasões são arte do usuário, em raster, e são intocáveis. A moldura de estanho vazia e a máscara do campo foram derivadas do brasão da Grifinória, não desenhadas.

A densidade é de embalagem: poucos blocos, texto curto, tipografia condensada estampada em caixa-alta para títulos e botões, grotesca legível para tudo que se lê. O movimento é só o do esmalte (encher, assentar) e a entrada de cada pergunta; o resto fica quieto. A recusa confirmada na direção: nada de salão escuro com velas e brasões, nada de tela de quiz genérica de pergunta e botões.

**Key Characteristics:**
- Uma superfície só: a cartela ultramar sobre o pegboard azul-noite.
- Impressão em duas tintas: creme para texto, dourado para ação e ênfase.
- Esmalte nas quatro cores das casas, usado só onde há "metal" ou resultado.
- Display condensado 900 em caixa-alta, corpo Hanken Grotesk 17px.
- Detalhes de embalagem: furo de pendurar, picote, número de cartela e lote.
- Brasões raster do usuário, nunca redesenhados.

## Colors

Azul ultramar chapado impresso em creme e dourado, com as quatro cores de esmalte das casas reservadas para o emblema e para o resultado.

### Primary
- **Dourado de Estampa** (`stamp-gold`): a tinta dourada do logo da loja. Botão primário, palavra de ênfase do título ("chaveiro?"), lema da casa no resultado, rebites de progresso acesos, opção escolhida, cursor do campo e borda de foco do campo. Hover clareia para `stamp-gold-light`; texto sobre dourado é sempre `gold-ink` (contraste 8:1).

### Secondary
- **Esmalte das casas**: Vermelho-Tijolo (`enamel-gri`), Azul-Cobalto (`enamel-cor`), Amarelo-Mostarda (`enamel-luf`), Verde-Garrafa (`enamel-son`). Pingam no emblema durante o quiz e preenchem as barras de "A sua mistura". Cada casa tem uma variante funda (`-deep`) que vira o fundo da faixa de resultado, com seu texto próprio (`on-*`). A Lufa-Lufa não tem variante funda: a faixa usa o próprio mostarda com texto escuro `on-luf`.

### Tertiary
- **Estanho** (`pewter-light`, `pewter-mid`, `pewter-dark`): o metal do emblema, em gradiente diagonal claro-escuro-claro-escuro, com o poço do campo em gradiente vertical `pewter-dark` → cinza. A gravação da plaqueta usa `engrave` com um realce claro deslocado 1px abaixo.

### Neutral
- **Ultramar da Cartela** (`ultramarine-card`): a superfície única de toda a página, com um leve brilho branco de 5% nos primeiros 240px.
- **Poço Ultramar** (`ultramarine-well`): o tom rebaixado para campos, opções, botões de desempate e trilhos das barras.
- **Pegboard** (`peg-board`) e **Furo** (`peg-hole`): o painel atrás da cartela, com furos de 3px a cada 28px; o furo também pinta o euro slot, o picote e o fundo dos rebites. `theme-color` do navegador é o pegboard.
- **Creme de Impressão** (`print-cream`): títulos, texto de opções e valores (9.3:1 sobre a cartela).
- **Lilás de Impressão** (`print-lilac`): texto de apoio, legendas, contador e links (6.8:1).
- **Letra Miúda** (`fine-print`): só o rodapé de lote.
- **Fio da Cartela** (`card-line`): bordas de 1.5px de campos, opções e botão de contorno, e as linhas da lista de casas.
- **Tinta Marinho** (`ink-navy`): texto sobre creme no toast e no link de pular.

### Named Rules
**The Esmalte Só no Metal Rule.** As cores das casas aparecem apenas como esmalte: no emblema, nas barras de mistura e na faixa de resultado. Nunca em bordas, botões, títulos ou fundo de seção.

**The Duas Tintas Rule.** A cartela é impressa em duas tintas, creme e dourado. O dourado marca ação ou ênfase; se não é clicável nem a palavra-chave, é creme ou lilás.

## Typography

**Display Font:** Big Shoulders Display (com Arial Narrow), embutida em woff2.
**Body Font:** Hanken Grotesk (com system-ui), embutida em woff2.

**Character:** Display condensado peso 900, como carimbo de embalagem, contra uma grotesca larga e calma para leitura. As duas fontes vão embutidas no arquivo, porque a página precisa funcionar offline.

### Hierarchy
- **Display** (900, clamp 42–84px; 96px a partir de 900px; 0.95): título do primeiro viewport, máx. 11ch, caixa-alta, palavra final em dourado.
- **Display Result** (900, clamp 60–112px, 0.95): nome da casa no resultado.
- **Headline** (900, clamp 42–60px, 0.95): títulos das seções da landing.
- **Question** (900, clamp 32–48px, 1, sem tracking): texto da pergunta, em caixa normal.
- **Title** (900, 24–28px, 1.05): nome da casa na lista, passos do "Como funciona", lema dourado (26px), "A sua mistura".
- **Button** (900, 22px, 1, +0.04em, caixa-alta): todos os botões cheios e de contorno.
- **Stamp Label** (900, 18–20px, +0.04–0.06em, caixa-alta): etiquetas de traço e contador "3 / 10" (com algarismos tabulares).
- **Body** (400, 17px, 1.55): opções, faixa de resultado (máx. 56ch), texto de seção (máx. 52ch).
- **Lead** (400, 18px): frase de abertura (máx. 36ch) e texto do campo.
- **Label** (600, 14px): rótulo do campo, links de navegação do quiz (15px), memória da última rodada.
- **Fine** (400, 12.5px, 1.5): rodapé de lote, máx. 68ch.

### Named Rules
**The Carimbo Rule.** Display é sempre peso 900 em caixa-alta, com `text-wrap: balance`. A única exceção é a pergunta do quiz, que fica em caixa normal porque é frase pra ler, não etiqueta.

**The Grotesca Pra Ler Rule.** Todo texto com mais de uma linha é Hanken Grotesk. Display nunca carrega parágrafo.

## Layout

Coluna única centralizada no celular, com calha lateral de 20px (`gutter-mobile`), cartela a 100% da largura. A partir de 800px a cartela ganha 40px de respiro sobre o pegboard, calha de 56px (`gutter-desktop`) e largura máx. de 760px; a partir de 900px a largura máx. sobe para 1080px e o palco vira duas colunas (5fr emblema, 6fr conteúdo, 64px entre elas), alinhado à esquerda.

O primeiro viewport, no celular de 390x844, cabe inteiro: furo, logo (140px; 178px no desktop), emblema vazio (~60% da largura, máx. 300px), título, campo de nome e botão primário. Durante o quiz o emblema encolhe para 36% da largura (máx. 168px) e, no desktop, fica `sticky` no topo da coluna esquerda; no resultado volta a 58% (máx. 260px). Blocos de ação e formulário têm largura máx. de 420px; a caixa de pergunta, 560px.

Ritmo: 10px entre opções e entre botões empilhados, 12–14px dentro de grupos, 18–22px entre blocos, 34px de topo de seção. As seções da landing são separadas pelo picote, que vaza até as bordas da cartela. Nenhuma rolagem horizontal; todos os alvos de toque têm 44px ou mais (botões 56px, opções 58px).

## Elevation & Depth

Profundidade física, não de interface. A cartela é chapada; o que tem relevo é objeto (o emblema e a própria cartela pendurada no desktop) e o que é furo afunda. Sombras são escuras e azuladas, nunca pretas puras sobre o azul.

### Shadow Vocabulary
- **Objeto pendurado** (`box-shadow: 0 30px 60px -20px rgba(3,6,30,.7), 0 6px 14px rgba(3,6,30,.35)`): a cartela no desktop.
- **Metal em relevo** (`filter: drop-shadow(0 14px 18px rgba(5,8,40,.55)) drop-shadow(0 2px 3px rgba(5,8,40,.5))`): o emblema; versão menor (`drop-shadow(0 4px 6px rgba(5,8,40,.45))`) nos brasões em miniatura.
- **Lábio do botão** (`box-shadow: inset 0 -3px 0 rgba(120,70,0,.28), 0 8px 18px -6px rgba(5,8,40,.6)`): botão primário; no `:active` o lábio inverte para o topo e a sombra encurta.
- **Furo** (`box-shadow: inset 0 2px 3px rgba(0,0,0,.5)`): euro slot, rebites apagados e trilhos das barras.
- **Toast** (`box-shadow: 0 10px 24px -8px rgba(0,0,0,.55)`).

### Named Rules
**The Furo Afunda, Metal Sobe Rule.** Sombra externa só em objeto físico (cartela, emblema, brasão, botão). Furo, poço e trilho levam sombra interna. Cartões de texto e opções ficam chapados.

## Shapes

Cantos médios e macios de papelão cortado: 8px nas etiquetas, 12px nos campos, 14px nas opções, 16px na faixa de resultado, 22px na cartela (só no desktop; no celular ela é sangrada). Botões são pílula completa. Formas circulares carregam o mundo da embalagem: o furo de pendurar (pílula de 76x18px com círculo de 26px), os furos do pegboard, o picote de pontos de 2.4px a cada 14px, os rebites de progresso de 12px e o número de atalho da opção dentro de um círculo de 30px. Bordas são de 1.5px. A silhueta do emblema é a moldura de estanho do brasão, com argola no topo e plaqueta de nome embaixo.

## Components

### Botões
Estampa dourada, gorda e com um lábio embaixo, como botão de plástico de embalagem.
- **Shape:** pílula (999px), altura mínima 56px, largura total até o limite do bloco.
- **Primary:** dourado com texto `gold-ink`, display 22px caixa-alta; ícone SVG de traço 2.4 a 22px quando há.
- **Hover / Active / Focus:** hover clareia para `stamp-gold-light`; active desce 1px e inverte o lábio; foco é contorno de 3px em creme com 3px de afastamento.
- **Line (contorno):** transparente, texto creme, anel interno de 1.5px em `card-line`; no hover o anel vira creme e o fundo ganha 4% de branco.
- **Link de texto:** lilás, 15px/600, sublinhado de 1.5px a 4px; "Voltar uma pergunta" e "Recomeçar".

### Opções de resposta
Botões largos rebaixados no poço ultramar.
- **Style:** `ultramarine-well`, borda de 1.5px `card-line`, raio 14px, altura mín. 58px, número 1–4 em círculo de 30px à esquerda (atalho de teclado).
- **States:** hover (só em ponteiro fino) dá borda dourada e número dourado; active encolhe para 98.5%; escolhida fica dourada inteira com texto `gold-ink`, e todas travam até a próxima pergunta entrar.

### Campo de nome
- **Style:** poço ultramar, borda de 1.5px `card-line`, raio 12px, texto 18px creme, cursor dourado.
- **Focus:** borda dourada com halo de 3px em dourado a 28%. Cada tecla regrava o nome na plaqueta do emblema.

### Progresso (rebites)
Uma fileira de rebites de 12px, um por pergunta. Apagados são furos (`ultramarine-well` com sombra interna); acesos são metal dourado em gradiente radial. Ao lado, o contador "3 / 10" em display.

### Faixa de resultado e etiquetas
A faixa é esmalte: fundo na cor funda da casa, texto `on-*`, raio 16px, preenchimento 22x20px (28x32px no desktop), entra subindo de baixo (`scaleY`). As etiquetas de traço são display 18px caixa-alta, contorno de 1.5px na cor do texto, raio 8px.

### Barras de mistura
Trilho de 14px em poço ultramar com sombra interna; preenchimento na cor de esmalte da casa, com brilho branco de 35% no topo, crescendo da esquerda em 1s. Nome à esquerda (104px), percentual tabular à direita.

### Emblema de estanho (assinatura)
SVG de 240x310: argola, moldura de estanho raster derivada do brasão, campo mascarado onde o esmalte empilha em faixas de 1/10 da altura, gloss branco diagonal, plaqueta de nome com borda dupla e texto gravado (display 900, 19 unidades, comprime acima de 11 caracteres; nomes acima de 14 viram só o primeiro nome). No resultado, o esmalte da casa inunda de baixo pra cima (1.3s), o corpo some e o brasão raster entra com fade e um leve encolhimento. A imagem compartilhável (1080x1350) recompõe a mesma cartela, emblema, brasão e nome em canvas.

### Picote e rodapé de lote
Linha de pontos `peg-hole` sangrada até a borda da cartela entre seções. O rodapé é letra miúda: nome da loja em negrito, "cartela nº", "Lote" e o aviso de página de fã.

### Movimento
Easing único de saída `cubic-bezier(.16,1,.3,1)`. Pergunta entra em 0.24s (sobe 6px e aparece); faixa de esmalte cai em 0.5s; inundação final em 1.3s com `cubic-bezier(.45,0,.2,1)`. Com `prefers-reduced-motion: reduce`, todas as transições e animações somem e os tempos do quiz encurtam.

## Do's and Don'ts

### Do:
- **Do** usar os quatro brasões raster do usuário (`img1`–`img4.webp`) exatamente como estão, em qualquer tamanho, e derivar molduras ou máscaras só a partir deles.
- **Do** manter a cartela `ultramarine-card` como a única superfície, com `ultramarine-well` para o que é rebaixado.
- **Do** reservar o dourado para ação, ênfase e estado escolhido, sempre com `gold-ink` por cima.
- **Do** escrever títulos, botões e etiquetas em Big Shoulders Display 900 caixa-alta, e todo texto corrido em Hanken Grotesk 17px/1.55.
- **Do** separar seções com o picote e manter os detalhes de embalagem (furo, lote, número de cartela).
- **Do** manter alvos de toque com 44px ou mais (botões 56px, opções 58px) e o primeiro viewport completo em 390x844.
- **Do** desligar todo movimento com `prefers-reduced-motion: reduce`.

### Don't:
- **Don't** redesenhar, vetorizar, recolorir, recortar ou trocar os brasões das casas, nem gerar brasões novos.
- **Don't** usar as cores das casas fora do esmalte (emblema, barras, faixa de resultado).
- **Don't** usar o salão escuro de velas e brasões nem o layout genérico de quiz com pergunta e botões soltos.
- **Don't** usar logotipos, fontes ou música oficiais dos filmes; o único logo é o da Beco Diagonal Personalizados, em dourado.
- **Don't** pôr sombra externa em cartões de texto ou opções; sombra externa é de objeto físico.
- **Don't** usar o display em parágrafo nem em peso menor que 900.
