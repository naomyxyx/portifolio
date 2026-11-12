# Rastreamento NX2Y

## Estado e escopo

Next.js App Router / React. Integração direta, sem GTM e sem dependências novas. A Hero abre o WhatsApp existente, 5511912280890, com a mensagem aprovada. Os textos e destinos dos demais contatos permanecem disponíveis. Não houve publicação.

Os IDs não foram fornecidos. Nenhum script é carregado se o respectivo ID estiver vazio ou inválido. Os testes locais validam o envio às filas dos SDKs, não a recepção em contas reais. A confirmação final nos painéis precisa dos IDs e acesso da proprietária.

## Configuração

Copie `.env.example` para `.env.local` e preencha:

```dotenv
NEXT_PUBLIC_GA4_MEASUREMENT_ID=
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_ANALYTICS_DEBUG=false
```

São identificadores públicos, não tokens de acesso. Nunca coloque uma chave secreta nessas variáveis. Reinicie o servidor após alterar variáveis. Para uma sessão de teste, use `NEXT_PUBLIC_ANALYTICS_DEBUG=true`; mantenha false em produção.

### Google

No Google Analytics, crie ou selecione a propriedade GA4. Em Administrador > Fluxos de dados > Web, selecione ou cadastre o domínio NX2Y. Copie o ID de medição que começa com `G-`.

IMPORTANTE: neste fluxo, desligue a Medição otimizada (incluindo mudanças de histórico, cliques externos e interações com formulários). O código é responsável pelos pageviews e cliques. `send_page_view: false` sozinho não desativa os pageviews por histórico da medição otimizada. Não instale uma segunda tag pelo GTM, plugin ou Vercel. Desative Google Signals e coleta de dados fornecidos pelo usuário; mantenha a retenção de dados de eventos em 2 meses inicialmente. Não habilite reconhecimento automático de informações pessoais.

Crie dimensões personalizadas de evento para `button_location` e, se quiser relatórios específicos, os parâmetros UTM. Use os relatórios de aquisição para origem/mídia/campanha. Marcar `quote_click` como evento principal é opcional, mas ele deve continuar identificado como intenção, não lead confirmado.

### Meta

No Gerenciador de Eventos da Meta, conecte uma fonte de dados Web, crie ou escolha o Pixel/conjunto de dados do site e copie seu ID numérico. Os nomes de menus podem variar entre contas. Escolha instalação manual; este projeto já fornece o código.

Desative correspondência avançada automática e eventos automáticos sem código. Remova regras antigas da ferramenta de configuração de eventos, especialmente regras que transformem cliques em Lead. Não adicione outro snippet ou integração paralela. O código usa `autoConfig: false`, mas configurações da conta também precisam ser verificadas.

## Eventos

| Ação | GA4 | Meta | Localizações |
| --- | --- | --- | --- |
| Página carregada ou troca de rota | page_view | PageView | URL de página |
| CTA de orçamento | quote_click | personalizado quote_click | hero, investment, nav_desktop, nav_mobile |
| WhatsApp no contato | whatsapp_click | personalizado whatsapp_click | contact |
| Instagram | instagram_click | personalizado instagram_click | contact, footer |
| E-mail | email_click | personalizado email_click | contact |

A Hero gera só `quote_click`, embora abra WhatsApp. Não gera também `whatsapp_click`, evitando contar a mesma ação duas vezes. Navegação por âncoras da mesma página não gera pageview adicional. Voltar de /projetos para / é uma nova visualização legítima. Não há formulário nem evento Lead/generate_lead implementado. Quando houver um formulário real, adicione Lead apenas na confirmação de sucesso do servidor, com deduplicação pelo identificador da submissão. Nunca no botão enviar ou no WhatsApp.

## Consentimento e dados

Antes da escolha: nenhum SDK, pixel de imagem, preconnect ou evento de GA/Meta. Recusar mantém isso. Análise e publicidade são independentes, inicialmente desmarcadas. Google Ads permanece negado mesmo quando Meta está autorizado.

A escolha versionada fica no localStorage por 180 dias, inclusive recusas. É possível reabrir o painel em qualquer página. Mudanças em outras abas são sincronizadas. Se o armazenamento falhar, a escolha só vale na página atual. Revogar bloqueia os próximos eventos e tenta remover os cookies próprios acessíveis. Não apaga dados já enviados aos fornecedores. Os SDKs já carregados recebem desativação; requisições já iniciadas não podem ser recuperadas.

UTMs de entrada são mantidas em memória; só depois do consentimento são guardadas no sessionStorage para navegações completas na mesma aba. Sem consentimento não se conserva atribuição entre documentos. As UTMs aceitas são utm_source, utm_medium, utm_campaign, utm_id, utm_content e utm_term: slugs de até 80 caracteres, começando por letra, com letras, números, hífen e sublinhado. Valores contendo sequências de 7 dígitos são descartados. Use nomes como `instagram`, `paid_social`, `sites_outubro`. Nunca use nomes, telefones, e-mails ou identificadores de clientes como campanhas.

GA recebe URL higienizada sem parâmetros arbitrários, e apenas a origem do referenciador. Meta lê a URL do documento: após consentimento publicitário, o código retira parâmetros não autorizados do endereço, preservando UTMs válidas, âncoras simples e fbclid válido para atribuição. Não coloque dados pessoais em URLs, títulos ou caminhos de campanhas. Não há envio personalizado de mensagens, e-mail, número de telefone ou texto clicado. Os fornecedores ainda recebem metadados técnicos da conexão, como IP, conforme explicado na política.

A política /privacidade identifica Naomy e o e-mail existente. Antes da ativação comercial, a proprietária deve conferir identificação do responsável, retenção nos painéis, contratos e política. A implementação é uma base técnica, não certificação jurídica de conformidade.

## Testes locais e de homologação

`npm test` e `npm run build` verificam consentimento, expiração, categorias independentes, URLs filtradas, atribuição, revogação, IDs ausentes, ausência de Lead, repetição de pageviews e listener único em StrictMode.

Com IDs reais em ambiente de teste:

1. Abra uma sessão privada com `/?utm_source=instagram&utm_medium=paid_social&utm_campaign=teste_nx2y`. Na aba Network, sem aceitar, não deve haver gtag/js, fbevents.js, google-analytics/g/collect nem facebook.com/tr. Recuse e confirme o mesmo.
2. Abra preferências e autorize apenas análise. Só Google deve carregar. Com debug true, abra Administrador > DebugView no GA4 e confira um page_view, seguido dos eventos de cada botão. O relatório Realtime ajuda a conferir visitas. Não use nomes pessoais nos parâmetros de teste.
3. Autorize só publicidade. No Gerenciador de Eventos > Testar eventos, abra a URL de teste indicada pelo painel e confira PageView e os eventos personalizados. Meta Pixel Helper também ajuda. Não deve aparecer Lead. A documentação da Meta não pôde ser consultada integralmente nesta sessão (HTTP 429); confirme os rótulos atuais no painel.
4. Visite /projetos, volte e use âncoras. Rotas novas geram visualização; âncoras não. Confirme os parâmetros e a campanha preservada. Cada clique deve gerar exatamente um evento por fornecedor autorizado.
5. Revogue ambos. Novos cliques e navegações não devem criar eventos. Recarregue: os scripts não devem carregar. Teste também categorias separadas e outra aba.
6. Repita em viewport de 390px e desktop, mouse, toque e teclado. Confira a mensagem de WhatsApp antes de enviar; não é necessário enviar mensagem. O teste automatizado confirma a URL, mas não substitui a abertura no aplicativo do telefone.
7. Faça o teste com bloqueadores desativados em homologação. Bloqueadores podem impedir entregas mesmo com consentimento. Não tente contorná-los.

## Publicação na Vercel

Somente após autorização: projeto portifolio > Settings > Environment Variables, configure os dois IDs e debug=false em Production (use propriedade/pixel de teste em Preview). Rode testes e build, publique pelo fluxo habitual Git ou `vercel deploy --prod`, e repita o roteiro no domínio https://nx2y.vercel.app. Variáveis NEXT_PUBLIC são incorporadas no build: alterar IDs exige nova publicação. Nenhuma publicação foi executada nesta tarefa.

## Fontes

- https://developers.google.com/analytics/devguides/collection/ga4/views
- https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications
- https://developers.google.com/tag-platform/security/guides/consent
- https://developers.facebook.com/docs/meta-pixel/implementation/conversion-tracking/
- https://developers.facebook.com/docs/meta-pixel/implementation/gdpr/
- https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_orientativo_cookies_e_protecao_de_dados_pessoais
