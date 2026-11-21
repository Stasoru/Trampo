# Trampo

## Divisão de papéis entre as skills de design

Duas skills de frontend estão instaladas. Cada uma tem um papel fixo. Não use as duas na mesma tarefa, a não ser na sequência abaixo.

### impeccable: criar e mudar

Use a `impeccable` para tudo que **cria ou altera** interface:

- páginas, telas e componentes novos (`/impeccable`, `/impeccable shape`);
- redesign e mudanças de identidade visual;
- `init`, `document` e `extract` (PRODUCT.md, DESIGN.md e o design system);
- ajustes pedidos, como `polish`, `bolder`, `quieter`, `layout`, `typeset`, `colorize`, `animate`, `adapt`, `clarify` e `harden`.

O `critique` e o `audit` da impeccable só rodam quando o usuário pedir por eles pelo nome.

### taste-skill (`design-taste-frontend`): revisar

Use a `design-taste-frontend` para **revisões**. Isso vale quando o usuário pedir para revisar, checar, avaliar, validar ou testar uma página, ou disser que ela parece genérica ou "feita por IA". Vale também ao fim de toda página ou tela que a impeccable construir ou alterar, antes de dizer que terminou.

Uma revisão segue o passo 6 ("Check and look") e o passo 7 ("Report") do `SKILL.md` da taste-skill, nesta ordem:

1. `copy-lint.mjs`: a voz do texto e os clichês de IA.
2. `consistency.mjs`: consistência do sistema em 1440, 1024, 820, 768 e 390 px.
3. `assets/layout/check.mjs`: quebras de layout e estouros de conteúdo.
4. `shoot.mjs`: screenshots em 1440, 1024, 820x1180, 768x1024 e 390. Olhe cada uma contra o checklist.
5. `perf.mjs`: desempenho.
6. `gate.mjs`: o portão final. Repita no máximo 3 rodadas até `GATE: PASS` ou `GATE: OPEN`.

Regras da revisão:

- A taste-skill **aponta** os problemas. As correções voltam para a impeccable, que preserva o mundo visual e o DESIGN.md já definidos. Depois a taste-skill revisa de novo.
- Quando a taste-skill e o DESIGN.md do projeto discordarem sobre estética (fontes, paleta, estilo), vale o DESIGN.md. Registre a divergência no relatório como waiver, com o motivo, em `.taste-skill/waivers.json`. Problemas objetivos não viram waiver: estouro, contraste, área de toque, texto quebrado e desempenho são sempre corrigidos.
- O relatório começa pela linha `GATE:` e lista cada FAIL aberto, cada waiver com o motivo e o que não foi possível checar.

### Revisões específicas

- Animação e movimento: `review-animations` (do emilkowalski) depois da taste-skill.
- Casos extremos de dados (nomes longos, listas vazias, números enormes): `break-ui`.
