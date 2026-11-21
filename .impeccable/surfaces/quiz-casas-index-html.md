---
version: 1
slug: "quiz-casas-index-html"
primary_target: "quiz-casas/index.html"
related_targets: []
---

# Quiz das casas: landing page

Scope: página única autocontida (quiz-casas/index.html), mode Persuade. Público: clientes da Beco Diagonal no celular, vindos de um link. Ação: começar o quiz, terminar, compartilhar o resultado e chamar a loja pelo brinde. Prova: o próprio quiz funcionando e o chaveiro sendo "fabricado" ao vivo. Restrições: os brasões originais do usuário ficam; logo da loja fica; funciona offline e sem domínio.

## Direction contract

THESIS: O quiz é a fabricação do seu chaveiro. Recusa o salão escuro de velas com brasões e a tela de quiz genérica de pergunta-e-botões.

OWN-WORLD: Cartela de papelão de embalagem de chaveiro, azul ultramar chapado, com furo de pendurar (euro slot) no topo e impressão em dourado (o ouro do logo). Emblema em metal (prata polida, linhas em relevo) com poços de esmalte duro nas quatro cores das casas: vermelho-tijolo, azul-cobalto, amarelo-mostarda, verde-garrafa. Tipografia de embalagem: display condensado estampado, corpo grotesco legível. Detalhes de cartela: picote, código de lote, letras miúdas impressas.

STORY: A pessoa entende em um olhar que vai descobrir a casa e que o resultado vira um chaveiro de verdade na loja. Responde 10 perguntas, vê o esmalte encher, recebe o emblema gravado com o nome, compartilha a imagem e chama a loja.

FIRST VIEWPORT: Cartela ultramar ocupando a tela; furo de pendurar centrado no topo, logo dourado logo abaixo. Centro: emblema-escudo de metal vazio (sem esmalte), grande (~60% da largura no celular). Abaixo: título condensado "Qual casa vai no seu chaveiro?", campo de nome opcional e botão primário "Começar o quiz" dentro da primeira dobra no celular 390x844.

FORM: candidate 7 of 7 (cartela de chaveiro esmaltado); seed:b1f8e69f06433669. Sinal: a cada resposta o esmalte da casa pontuada escorre para os poços do emblema; no resultado o emblema inteiro fecha na cor da casa e o nome aparece gravado. Movimento: enchimento de esmalte (clip/mask) e estampagem do nome; resto quieto.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Adaptations recorded at finish

- First viewport on 390x844: the frame is ~58% of the width, not 60%; 60% pushed the CTA 5px past the fold.
- The user kept the original house crests; the blank keychain frame is derived from the Grifinória crest so blank and result are one casting. Enamel is poured as one stratum per answer.
