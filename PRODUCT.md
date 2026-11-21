# Product

<!-- impeccable:product-schema 1 -->

> Inferido do pedido de Lopez (2026-11-21) e do quiz anterior "Seleção das Casas" (artifact de 2026-11-19). Itens marcados **[inferido]** ainda não foram confirmados pelo usuário.

## Platform

web

## Stack

static HTML/CSS/JS em um único arquivo autocontido, sem build e sem domínio próprio ("loading page que roda sem domínio"). Publicado como Artifact do claude.ai e também abrível direto do arquivo.

## Users

Clientes e seguidores da Beco Diagonal Personalizados, loja de produtos personalizados com tema de bruxaria e escola de magia. Abrem o quiz pelo celular a partir de um link (Instagram, WhatsApp, QR code no balcão) **[inferido]**, em poucos minutos livres. Fãs da saga, falam português do Brasil.

## Product Purpose

Um quiz curto que diz em qual das quatro casas da escola de magia a pessoa ficaria, a partir de perguntas de situação e de escolhas simbólicas. O resultado vira conversa: a pessoa compartilha e, pela loja, pode pedir o brinde ou um produto da casa dela. Sucesso: a pessoa termina o quiz, compartilha o resultado e chama a loja.

## Positioning

É o quiz da loja, não um quiz genérico: o resultado termina num brinde concreto (chaveiro de metal da casa) e em produtos personalizados com o nome da pessoa.

## Capabilities and Constraints

- Banco de 20 perguntas originais (12 simbólicas, 8 dilemas), 10 por rodada, sorteadas e embaralhadas; pontuação ponderada por casa; desempate escolhido pela própria pessoa.
- Nome opcional da pessoa personaliza o resultado.
- Configuração da loja no topo do script: WhatsApp e link de produtos (vazios até o usuário preencher).
- Sem backend; o último resultado fica só no navegador.
- Página de fã, sem vínculo com Warner Bros. ou Wizarding World. Não usar logotipos, fontes ou música oficiais dos filmes.
- Os quatro brasões das casas do quiz anterior ficam: decisão do usuário em 2026-11-21, depois de avisado de que parecem arte oficial. Não redesenhar nem trocar.

## Brand Commitments

- Logo "Beco Diagonal Personalizados" (SVG em dourado #EEA534, chapéu de bruxo e varinha) é do usuário e fica.
- Nomes das casas em português: Grifinória, Corvinal, Lufa-Lufa, Sonserina.
- Voz: português do Brasil, direto, caloroso, segunda pessoa ("você").

## Evidence on Hand

- Textos das casas, lemas e perguntas do quiz anterior (originais da loja).
- Sem depoimentos, preços ou números de participantes: não inventar.
- Brasões das casas: `quiz-casas/assets/img1.webp` (Grifinória), `img2.webp` (Corvinal), `img3.webp` (Lufa-Lufa), `img4.webp` (Sonserina), extraídos do quiz anterior do usuário e mantidos a pedido dele. `frame.webp` e `field-mask.png` são derivados de `img1.webp` (moldura de estanho e área do campo).
- Logo: `quiz-casas/assets/img0.svg`, do quiz anterior.

## Product Principles

1. O quiz começa em um toque; nada de cadastro.
2. O resultado precisa ser bonito o bastante pra virar print.
3. Toda tela leva de volta à loja sem empurrar.
4. Funciona offline e num link qualquer, sem servidor.


## Identidade (atualizado em 2026-11-21)

Lopez pediu para copiar a identidade do site becodiagonal.net: fundo preto, dourado #F0AD33, texto off-white, fonte geométrica pesada (Manrope), botões retos dourados ou com contorno. A direção "cartela de chaveiro esmaltado" em azul foi substituída. A abertura do quiz é uma cena 3D: a caixa preta do Beco abre e solta os quatro chaveiros (escolhida num cartão de decisão). Referência: `quiz-casas/ref-becodiagonal-site.jpg`.
