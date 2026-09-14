# Pesquisa aplicada: avatar 3D da NX2Y no Spline

Atualizado em 25 de agosto de 2026.

Este documento registra as decisões técnicas e visuais que vamos usar para continuar o avatar da Naomy. O objetivo não é criar um personagem de jogo completo. É construir uma personagem estilizada, leve e expressiva para a seção sobre do portfólio, com aparência de brinquedo 3D ou emoji, proporção de cabeça maior, corpo compacto, cabelo cacheado simplificado e moletom roxo.

## Conclusão principal

Para esta primeira versão, a melhor solução é terminar o personagem inteiramente no Spline como um conjunto de peças agrupadas. Cabeça, olhos, cabelo, tronco, braços e pernas continuam separados e organizados dentro de um grupo principal. Isso permite animar cada parte com movimentos pequenos sem criar agora um esqueleto complexo.

Um esqueleto importado de Blender ou Mixamo só passa a valer a pena se futuramente quisermos caminhada, corrida, dança, troca de poses complexas ou uma biblioteca grande de movimentos corporais. Para a apresentação atual, ele adicionaria trabalho, peso e dificuldade de personalização sem uma vantagem proporcional.

## Estrutura recomendada do boneco

```text
Avatar Rig Master
├── Corpo e respiração
├── Cabeça
│   ├── Olhos
│   ├── Sobrancelhas
│   ├── Nariz
│   ├── Boca
│   ├── Orelhas e brincos
│   └── Cachos em caminhos 3D
├── Braço esquerdo
├── Braço direito e aceno
├── Pernas
├── Sapatos
└── Sombra
```

Cada grupo deve ter seu ponto de rotação próximo da articulação correspondente. Assim, o braço gira pelo ombro, a cabeça gira pelo pescoço e a mão pode fazer um aceno sem deformar o resto do corpo.

## Como aprimorar a modelagem

### Rosto e corpo

- Usar **Shape Blend** para unir formas simples e obter volumes mais orgânicos no rosto, capuz, mangas e mãos.
- Usar **Smooth & Edit** apenas nos volumes que realmente precisam de acabamento. A subdivisão em toda a personagem aumentaria o peso sem melhorar partes pequenas.
- Manter o rosto simples: olhos expressivos, nariz pequeno, boca escura e sem bochechas rosadas. A semelhança deve vir principalmente do cabelo, formato geral do rosto, brincos e paleta, não de muitos detalhes faciais.
- Trabalhar com materiais foscos, de leve rugosidade, para aproximar o resultado de um brinquedo ou emoji 3D e afastá-lo do realismo.

### Cabelo

O recurso mais adequado para os cachos é **3D Paths**, não dezenas de toros e nem o Hair System.

Cada cacho pode ser um caminho tubular curto, arredondado e curvado, com poucas variações reutilizadas ao redor da cabeça. Os caminhos aceitam profundidade, torção, escala inicial e final e pontas arredondadas. Isso permite fazer os cachos juntinhos em formato de pequenas mechas, como a referência aprovada, mas com controle e menos objetos.

O Hair System é interessante para fios numerosos e simulados, porém depende de WebGPU. Em navegadores que recorrem ao WebGL, os fios podem não aparecer. Para um portfólio que precisa funcionar de maneira previsível em aparelhos diferentes, os caminhos 3D são mais seguros.

## Animação adequada para o portfólio

O personagem deve parecer vivo sem competir com os textos. A sequência recomendada é:

1. Entrada curta, subindo alguns pixels e recuperando a escala.
2. Respiração contínua e muito sutil no grupo do tronco.
3. Pequena inclinação da cabeça, em ritmo diferente da respiração.
4. Piscar ocasional, não em repetição mecânica constante.
5. Um aceno curto ao entrar na seção ou ao clicar na personagem.
6. Olhos e cabeça acompanhando o cursor com movimento limitado e amortecido.

No Spline, isso pode ser feito com estados, eventos e transições. A curva **Spring** pode ser útil para a entrada e o aceno, desde que com pouca elasticidade. Para a respiração e a inclinação, curvas suaves de entrada e saída serão mais discretas.

O evento **Look At** tem controles de plano, distância, direção, amortecimento e retorno. Ele deve ser aplicado primeiro ao grupo dos olhos e, com intensidade menor, à cabeça. Isso evita a aparência rígida de todo o corpo girando para seguir o mouse.

## Integração com a página

A exportação indicada é o **Spline Viewer**, um componente web nativo. Diferentemente de um iframe comum, ele consegue receber movimentos do cursor da janela inteira. Assim, o avatar pode acompanhar o visitante mesmo quando o mouse está sobre os textos vizinhos, e não apenas quando está dentro do retângulo do Spline.

Configuração recomendada:

- Look At global para os olhos.
- Look At global mais limitado e amortecido para a cabeça.
- Retorno suave quando o cursor sair da janela, ou retorno desativado se o resultado ficar mais natural.
- Carregamento preguiçoso para não atrasar o início da página.
- Renderizador em modo automático, permitindo WebGPU com fallback para WebGL.
- Respeitar a preferência de movimento reduzido do visitante; nesse caso, manter somente a pose e, no máximo, o acompanhamento leve dos olhos.

## Desempenho

- Manter no máximo duas fontes principais de luz: ambiente e uma luz direcional ou spot.
- Reutilizar os materiais já criados para pele, roxo, cabelo, branco e carvão.
- Reduzir segmentos de esferas, toros e caminhos onde a diferença não for visível.
- Reutilizar cachos como componentes ou instâncias, com pequenas mudanças de posição, rotação e escala.
- Evitar texturas grandes; o personagem pode depender principalmente de cor, material e luz.
- Usar compressão de geometria na exportação.
- Testar desktop e celular reais, porque a cena precisa continuar legível em tamanho pequeno.

## Quando usar Blender ou Mixamo

O Spline importa arquivos FBX e GLB/GLTF com animação esquelética. O Mixamo permite aplicar movimentos prontos a uma personagem preparada externamente. Esse caminho é indicado se a NX2Y vier a precisar de:

- caminhar, correr, pular ou dançar;
- várias poses corporais complexas;
- movimentos com flexão natural de cotovelos e joelhos;
- reutilização da personagem em um pequeno jogo.

Para troca constante de cabelo, roupa e acessórios, um personagem modular nativo do Spline é mais simples de editar. Relatos da comunidade também indicam que personalizar partes de um modelo já animado externamente pode ficar mais trabalhoso. Esta observação é experiência comunitária, não uma limitação oficial absoluta.

## Plano prático para a próxima sessão

1. Substituir os toros atuais do cabelo por uma pequena biblioteca de cachos feitos com 3D Paths.
2. Ajustar os pontos de rotação dos grupos da cabeça e dos braços.
3. Polir cabeça, capuz e mãos sem aumentar demais a quantidade de polígonos.
4. Criar os estados `Entrada`, `Respiração`, `Piscar`, `Aceno` e `Olhar`.
5. Testar a cena no Spline Viewer dentro da seção sobre.
6. Medir carregamento e fluidez antes de adicionar novas expressões.

## Fontes principais

- [Shape Blend, documentação do Spline](https://docs.spline.design/designing-in-3-d/modeling/shape-blend)
- [Ferramentas de modelagem 3D](https://docs.spline.design/designing-in-3-d/modeling/3d-modeling-tools)
- [Escultura 3D](https://docs.spline.design/designing-in-3-d/modeling/3d-sculpting)
- [Caminhos 3D](https://docs.spline.design/designing-in-3-d/objects/3d-paths)
- [Hair Systems](https://docs.spline.design/designing-in-3-d/animation/hair-systems)
- [Materiais PBR](https://docs.spline.design/materials-shading/basics/pbr-materials)
- [Estados e animação](https://docs.spline.design/interaction-states-events-and-actions/how-state-based-animation-works)
- [Evento Look At](https://docs.spline.design/interaction-states-events-and-actions/events/look-at-event)
- [Ação de transição](https://docs.spline.design/interaction-states-events-and-actions/actions/transition-action)
- [Importação de objetos animados](https://docs.spline.design/importing-content/import-animated-objects)
- [Morph Targets](https://docs.spline.design/importing-content/morph-targets)
- [Game Controls](https://docs.spline.design/interaction-states-events-and-actions/events/game-controls-event)
- [Otimização de cenas](https://docs.spline.design/exporting-your-scene/how-to-optimize-your-scene)
- [Exportação com Spline Viewer](https://docs.spline.design/exporting-your-scene/web/exporting-as-spline-viewer)
- [Configurações de reprodução e renderização](https://docs.spline.design/exporting-your-scene/play-settings)
- [Plataforma da comunidade Spline](https://community.spline.design/)
- [Tutorial oficial de personagem com caminhada](https://www.youtube.com/watch?v=6g4XnfmD0tg)
- [Adobe Mixamo: animação de personagens](https://helpx.adobe.com/uk/creative-cloud/help/animate-characters-mixamo.html)

## Exemplos comunitários consultados

Estes links servem como referência de fluxo de trabalho e devem ser tratados como relatos práticos, não como documentação oficial:

- [Personagem modelado no Spline com animações do Mixamo](https://www.reddit.com/r/Spline3D/comments/1lardu2)
- [Discussão sobre personagem personalizável por grupos](https://www.reddit.com/r/Spline3D/comments/1fm2mdl)
- [Discussão sobre cabelo e sapatos em modelos animados importados](https://www.reddit.com/r/Spline3D/comments/1en4h8q)
- [Exemplo de personagem interativo e remixável](https://www.reddit.com/r/Spline3D/comments/1fcsjyg)
