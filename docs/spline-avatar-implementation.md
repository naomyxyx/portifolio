# Registro da reconstrução do avatar NX2Y

Atualizado em 25 de agosto de 2026.

## Estado atual

O avatar foi reconstruído diretamente na cena conectada do Spline. A versão anterior foi preservada durante a validação e os elementos substituídos foram removidos somente depois que a nova versão foi testada.

## Implementação realizada

- 22 cachos tubulares em geometria personalizada, com mais segmentos e variações de comprimento, fase e profundidade.
- Cabelo agrupado com o rosto dentro do grupo `NX2Y Head Rig`.
- Braços renomeados e organizados como `NX2Y Left Arm Rig` e `NX2Y Wave Arm Rig`.
- Olhos e brilhos identificados individualmente para permitir acompanhamento do cursor e piscar.
- Moletom reconstruído com uma Shape Blend formada por corpo e ombros.
- Materiais de pele, cabelo e moletom atualizados para acabamento físico fosco.
- Entrada, respiração, inclinação de cabeça, piscar, aceno e acompanhamento do cursor implementados em uma camada de movimento sem interface visível.
- Comportamento alternativo para visitantes que utilizam a preferência de movimento reduzido.
- Câmera de publicação reposicionada e validada com o personagem inteiro no enquadramento.
- Elementos antigos e invisíveis removidos depois da validação.

## Desempenho verificado

- 65 objetos renderizáveis.
- 60.638 polígonos.
- Uma luz direcional.
- Nenhuma textura, efeito de pós-processamento, clone ou operação booleana.
- Contagem de objetos, polígonos e luzes classificada como boa pelo analisador do Spline.

## Próxima etapa recomendada

Publicar a cena como Spline Viewer e integrar o endereço gerado à seção sobre do portfólio. Depois da incorporação, testar o acompanhamento do cursor, o carregamento e a proporção do avatar dentro do layout real.

## Reconstrução baseada na imagem final

Após uma comparação direta com a última imagem-conceito, a primeira versão foi mantida como um grupo oculto de segurança e uma nova anatomia foi criada.

- Cabeça oval e proporcionalmente menor.
- Volume de cabelo separado atrás da cabeça e coberto por camadas de cachos grossos.
- Olhos menores, sobrancelhas simples, nariz discreto e boca reduzida.
- Mão de aceno transferida para o lado correspondente à referência, com palma frontal e dedos separados.
- Tronco, ombros e braços construídos com sobreposição nas articulações.
- Quadril criado para conectar o moletom às pernas.
- Pernas mais compridas e largas, com barras de calça.
- Tênis reconstruídos com sola, painel frontal e cadarços.
- Brincos metálicos pequenos.
- A hierarquia nova reutiliza os nomes esperados pela animação existente.

A versão nova foi validada no enquadramento de publicação. A versão anterior continua oculta como `Avatar Rig Master Backup` e pode ser removida depois da aprovação visual definitiva.
