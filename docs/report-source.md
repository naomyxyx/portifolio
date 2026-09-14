# Relatório-fonte: pesquisa de personagem 3D para a NX2Y

**Público:** Naomy e continuidade do desenvolvimento do portfólio  
**Data:** 25 de agosto de 2026  
**Escopo:** modelagem, animação, interação e publicação de uma personagem estilizada no Spline  
**Fora do escopo:** construção imediata do modelo, animação facial realista, jogo completo e rig esquelético profissional

## Premissas

- A personagem será usada prioritariamente na seção sobre do portfólio NX2Y.
- A direção visual já aprovada é um meio-termo entre emoji 3D e personagem infantil estilizada: cabeça maior, corpo reduzido, cabelo cacheado simplificado, moletom roxo, brincos e expressão simpática.
- Compatibilidade, leveza e facilidade de ajuste são mais importantes do que realismo anatômico.
- A cena existente é um bloqueio manual com partes separadas e materiais reutilizados.

## Resposta direta

A abordagem de menor risco é uma personagem modular nativa do Spline, com hierarquia de grupos e animações por estados. Cabelo em 3D Paths, olhos e cabeça com Look At, microanimações com Start e Transition e incorporação pelo Spline Viewer formam o conjunto mais adequado. Rig esquelético externo deve ser reservado para movimentos corporais complexos.

## Análise

### Modelagem

O Spline dispõe de Shape Blend para volumes orgânicos, Smooth & Edit para superfícies subdivididas e escultura para correções localizadas. Esses recursos bastam para polir um avatar estilizado sem exigir outro programa. 3D Paths oferecem controle tubular e são adequados aos cachos compactos. O Hair System oferece simulação avançada, mas depende de WebGPU e não aparece no fallback WebGL, criando risco de incompatibilidade.

### Animação

Estados, eventos e ações permitem animar transformações e materiais. Transition oferece duração, atraso, ciclos e curvas, inclusive Spring. Start inicia entrada e idle no carregamento. Look At oferece amortecimento, limites e comportamento de retorno. A documentação oficial ensina animação esquelética como conteúdo importado, enquanto os recursos nativos atendem bem a movimentos por grupos. A conclusão de reservar rig externo para locomoção complexa é uma inferência apoiada por essa divisão de recursos e por relatos comunitários.

### Integração

Spline Viewer é superior ao iframe para esta seção porque recebe Look At e Follow de maneira global, considerando a janela inteira. Também oferece carregamento preguiçoso. O renderizador automático preserva WebGPU quando disponível e WebGL como alternativa.

### Jogo versus portfólio

Game Controls inclui locomoção, collider, câmera, navmesh e estados de comportamento. Esses recursos são úteis a um jogo, mas desnecessários para uma personagem decorativa e interativa. Um avatar de portfólio deve se limitar a entrada, idle, piscar, aceno e acompanhamento do cursor.

## Limitações e incertezas

- O resultado de Shape Blend e Smooth & Edit precisa ser testado visualmente na cena existente; a quantidade ideal de geometria não pode ser definida apenas pela documentação.
- O desempenho final depende do computador, navegador, tamanho da incorporação e quantidade total de animações na página.
- Relatos do Reddit são evidência anedótica. Eles ajudam a antecipar dificuldades com personalização de rigs importados, mas não provam uma limitação absoluta do Spline.
- A experiência de acompanhamento global precisa ser testada no layout real, inclusive junto ao sistema de partículas já presente na página.

## Recomendações priorizadas

1. Refazer o cabelo em 3D Paths e validar a linguagem visual.
2. Organizar grupos e articulações antes de polir volumes.
3. Criar apenas cinco comportamentos: entrada, respiração, inclinação, piscar e aceno.
4. Aplicar Look At primeiro aos olhos e depois à cabeça, com intensidades diferentes.
5. Publicar pelo Viewer e testar global tracking, fallback e movimento reduzido.
6. Só estudar Blender/Mixamo se o escopo evoluir para caminhada, dança ou jogo.

## Registro de afirmações e fontes

| Afirmação | Tipo | Fonte |
|---|---|---|
| Shape Blend combina formas primitivas de maneira orgânica | Oficial | [Spline: Shape Blend](https://docs.spline.design/designing-in-3-d/modeling/shape-blend) |
| Smooth & Edit e escultura permitem polir volumes | Oficial | [Modeling Tools](https://docs.spline.design/designing-in-3-d/modeling/3d-modeling-tools), [3D Sculpting](https://docs.spline.design/designing-in-3-d/modeling/3d-sculpting) |
| 3D Paths criam formas tubulares animáveis | Oficial | [Spline: 3D Paths](https://docs.spline.design/designing-in-3-d/objects/3d-paths) |
| Hair Systems dependem de WebGPU e não aparecem em WebGL | Oficial | [Spline: Hair Systems](https://docs.spline.design/designing-in-3-d/animation/hair-systems) |
| Look At oferece alvo, plano, distância, direção, damping e reset | Oficial | [Spline: Look At Event](https://docs.spline.design/interaction-states-events-and-actions/events/look-at-event) |
| Transition inclui curvas Ease, Bezier e Spring | Oficial | [Spline: Transition Action](https://docs.spline.design/interaction-states-events-and-actions/actions/transition-action) |
| Viewer captura Look At e Follow na janela inteira | Oficial | [Spline Viewer](https://docs.spline.design/exporting-your-scene/web/exporting-as-spline-viewer) |
| FBX e GLB/GLTF podem importar animação esquelética | Oficial | [Import Animated Objects](https://docs.spline.design/importing-content/import-animated-objects) |
| Game Controls inclui locomoção e comportamentos | Oficial | [Game Controls](https://docs.spline.design/interaction-states-events-and-actions/events/game-controls-event) |
| Modelos com rig importado podem ser mais difíceis de personalizar | Comunitário, anedótico | [Discussão sobre customização](https://www.reddit.com/r/Spline3D/comments/1fm2mdl), [Discussão sobre acessórios](https://www.reddit.com/r/Spline3D/comments/1en4h8q) |
| Spline + Mixamo é usado por criadores para combinar modelagem e clips prontos | Comunitário, anedótico | [Exemplo Motion Visual](https://www.reddit.com/r/Spline3D/comments/1lardu2), [Adobe Mixamo](https://helpx.adobe.com/uk/creative-cloud/help/animate-characters-mixamo.html) |

## Artefato derivado

A síntese orientada à implementação está em [spline-avatar-research.md](./spline-avatar-research.md).
