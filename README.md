# AtivaMente

Aplicativo de acompanhamento terapêutico infantil para uma clínica de terapias
(fonoaudiologia, psicologia, terapia ocupacional e fisioterapia).

O problema que ele resolve: hoje o pai ou a mãe de uma criança em terapia
descobre como foi a sessão por WhatsApp, por bilhete ou perguntando na recepção.
As evoluções clínicas ficam no papel, a agenda fica na cabeça da coordenação, e
não existe um lugar único onde a família acompanhe o desenvolvimento do filho.

O AtivaMente centraliza isso em dois produtos que conversam entre si.

**Repositório:** <https://github.com/CapMatias/AtivaMente-MVP>

---

## As telas

### O app dos responsáveis

<table>
  <tr>
    <td align="center"><img src="docs/screenshots/01-onboarding.png" width="190"><br><sub><b>Onboarding</b></sub></td>
    <td align="center"><img src="docs/screenshots/02-login.png" width="190"><br><sub><b>Login</b></sub></td>
    <td align="center"><img src="docs/screenshots/03-home.png" width="190"><br><sub><b>Início</b></sub></td>
    <td align="center"><img src="docs/screenshots/04-filhos.png" width="190"><br><sub><b>Meus filhos</b></sub></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/screenshots/05-perfil-crianca.png" width="190"><br><sub><b>Perfil da criança</b></sub></td>
    <td align="center"><img src="docs/screenshots/06-agenda.png" width="190"><br><sub><b>Agenda</b></sub></td>
    <td align="center"><img src="docs/screenshots/07-evolucoes.png" width="190"><br><sub><b>Evoluções</b></sub></td>
    <td align="center"><img src="docs/screenshots/08-perfil.png" width="190"><br><sub><b>Perfil</b></sub></td>
  </tr>
</table>

<sub>Capturas do app rodando de verdade, em viewport de 390&times;844 (tamanho de
celular). Foram feitas pela versão web (`npm run web`), que executa o mesmo
código React Native através do react-native-web — por isso aparece a barra de
rolagem do navegador em algumas telas.</sub>

<sub>Figura 5. Telas do app dos responsáveis. Fonte: elaborado pelos autores (2026).</sub>

### O painel da clínica

<table>
  <tr>
    <td align="center"><img src="docs/screenshots/painel/06-login.png" width="290"><br><sub><b>Login</b></sub></td>
    <td align="center"><img src="docs/screenshots/painel/01-dashboard.png" width="290"><br><sub><b>Dashboard</b></sub></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/screenshots/painel/02-criancas.png" width="290"><br><sub><b>Crianças</b></sub></td>
    <td align="center"><img src="docs/screenshots/painel/03-agenda.png" width="290"><br><sub><b>Agenda</b></sub></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/screenshots/painel/04-evolucoes.png" width="290"><br><sub><b>Evoluções</b></sub></td>
    <td align="center"><img src="docs/screenshots/painel/05-configuracoes.png" width="290"><br><sub><b>Configurações</b></sub></td>
  </tr>
</table>

<sub>Capturas dos componentes Vue deste repositório rodando em viewport de
1280&times;800, e não do protótipo do Figma. Como o Inertia precisa de um
backend, as páginas foram montadas por um harness que fornece o atributo
<code>data-page</code> diretamente — o suficiente para renderizar cada tela com
os dados de demonstração.</sub>

<sub>Figura 6. Telas do painel da clínica. Fonte: elaborado pelos autores (2026).</sub>

---

## As duas partes

### 1. App dos responsáveis (React Native / Expo)

O aplicativo de celular que o pai ou a mãe usa. Permite ver a agenda das
sessões, solicitar novos agendamentos, acompanhar a linha do tempo de evoluções
escritas pelos terapeutas e gerenciar o perfil.

São 12 telas: splash, onboarding, login, cadastro, recuperação de senha, início,
lista de filhos, perfil da criança, agenda, evoluções, notificações e perfil.

### 2. Painel da clínica (Vue 3 + Inertia.js)

A área administrativa que a coordenação e os terapeutas usam no navegador.
Dashboard com indicadores e gráficos, cadastro e prontuário de pacientes, grade
semanal de horários, registro de evoluções clínicas e configurações da clínica
e da equipe.

São 8 telas, portadas de um protótipo feito no Figma Make.

### Uma observação sobre a pasta `resources/`

O app dos responsáveis também foi portado para a web (Vue 3 + Inertia), para
que as duas partes compartilhem a mesma base de código no navegador. Por isso
`resources/js/Pages/` tem 20 páginas: 12 são a versão web do app dos
responsáveis e 8 são o painel da clínica, sob `Pages/Admin/`.

Quem for avaliar o app dos responsáveis deve olhar a versão React Native em
`src/` — é ela que roda com `npm start`.

---

## Estado atual: protótipo de interface

**Importante para avaliar o que está aqui.** Este repositório é o MVP de
*frontend*. As telas estão construídas, navegáveis e com os estados de
interface funcionando (filtros, abas, modais, formulários com validação), mas:

- **não há backend nem banco de dados** — os dados vêm de arquivos de
  demonstração (`src/services/mockData.ts` e
  `resources/js/services/adminMockData.js`);
- **não há autenticação real** — as telas de login existem e validam os campos,
  mas não autenticam contra servidor nenhum;
- ações como excluir um paciente ou confirmar um agendamento ainda não
  persistem nada.

Isso é deliberado: a camada de dados foi desenhada para ser substituída sem
reescrever as telas. Cada página recebe seus dados como propriedades e só cai
nos dados de demonstração quando o servidor ainda não os envia.

---

## Protótipo e validação com usuários

Esta parte corresponde à Seção 9 do documento do projeto. Está aqui no README,
e não em arquivo separado, para que quem abrir o repositório encontre junto o
protótipo e o que foi feito com ele.

Duas advertências de método, antes de tudo:

- **9.1 e 9.3 são artefatos de projeto.** O protótipo existe e roda; o roteiro
  de tarefas é escrito *antes* do teste. Os dois estão completos abaixo.
- **9.2, 9.4 e 9.5 são registro de observação.** Só existem depois que pessoas
  reais sentarem na frente do protótipo. Estão estruturados, com os campos e as
  instruções, mas **em branco** — preencher antes de testar seria fabricar dado
  de pesquisa.

### 9.1 O protótipo

O protótipo é **navegável e executável**: não são telas estáticas montadas em
ferramenta de design, mas o MVP de frontend rodando de verdade. A pessoa
percorre a tarefa inteira tocando na interface — abas trocam, filtros filtram,
modais abrem, formulários validam campo por campo. O que não existe por trás é
servidor: os dados vêm de arquivos de demonstração e nada é gravado.

Para o teste de usabilidade essa distinção pesa pouco, e a favor: o participante
não percebe que o dado é simulado, então o comportamento dele é o mesmo que
seria no sistema pronto. O que ele não pode fazer é voltar no dia seguinte e
encontrar o que digitou.

As telas estão logo acima, na seção **As telas**: a Figura 5 traz as 12 telas
do app dos responsáveis e a Figura 6, as 8 telas do painel da clínica.

#### O caminho que o protótipo cobre

**Responsável (Figura 5).** Abrir o app → passar pelo onboarding → entrar com
e-mail e senha → chegar ao início e ver a próxima sessão do filho → abrir a
lista de filhos → entrar no perfil da criança → ler a última evolução escrita
pelo terapeuta → conferir a agenda da semana → solicitar um novo agendamento →
ver as notificações → editar o próprio perfil. Também estão montadas as telas
de cadastro e de recuperação de senha. São 12 telas ao todo.

**Clínica (Figura 6).** Entrar no painel → ver o dashboard com os indicadores
do mês → abrir a lista de crianças, filtrando por terapia ou por status →
cadastrar uma criança nova → abrir o prontuário de uma criança já cadastrada →
registrar uma evolução da sessão → conferir a grade semanal de horários →
ajustar dados da clínica e da equipe nas configurações. São 8 telas.

#### O que ficou de fora

Fora do protótipo, e portanto fora do que pode ser testado:

- **Persistência.** Nada do que o participante digitar é gravado. Ele consegue
  preencher o formulário inteiro e submeter, mas o registro não aparece na
  lista depois. Isso precisa estar previsto no roteiro (ver 9.3) para não ser
  confundido com erro do participante.
- **Autenticação real.** As telas de login validam formato de e-mail e tamanho
  de senha, mas qualquer combinação válida entra. Não há sessão, nem perfis de
  permissão distintos entre coordenação e terapeuta.
- **Notificação push.** Existe a tela que lista notificações; não existe o
  aviso chegando no celular.
- **Pagamentos, mensalidades e emissão de relatório em PDF.** Aparecem como
  texto nos dados de demonstração, mas não têm tela. Se o participante procurar
  por isso, é achado relevante — anote em 9.4 e não improvise uma resposta.
- **Conversa direta entre família e terapeuta** e **anexo de foto ou vídeo da
  sessão.** Não existem.
- **Integração entre as duas pontas.** O app e o painel ainda não compartilham
  dados: uma evolução registrada no painel não aparece no app. Cada um roda com
  seu próprio arquivo de demonstração.

### 9.2 O que foi testado e com quem

| Campo | Preenchimento |
| --- | --- |
| Objeto do teste | **MVP de frontend navegável** — protótipo executável, sem backend, com dados de demonstração |
| Número de rodadas | *(preencher — ver recomendação abaixo)* |
| Participantes por rodada | *(preencher)* |
| Perfil dos participantes | *(preencher — ver abaixo)* |
| Datas e local | *(preencher)* |

**Recomendação de desenho.** Duas rodadas de 5 participantes, com correção
entre elas. A orientação da disciplina é explícita nesse ponto e ela tem razão:
duas rodadas curtas rendem mais que uma longa, porque a rodada 2 mede se a
correção funcionou — e é isso que preenche a coluna "Rodada" da tabela 9.5.

**Perfil que precisa ser respeitado.** São dois públicos distintos, e não dá
para cobrir os dois com as mesmas pessoas:

- **App:** pai, mãe ou responsável por criança em terapia. O que importa aqui
  não é idade nem escolaridade, é a situação: quem já vive a rotina de levar
  filho a sessão e hoje descobre como foi por WhatsApp ou bilhete.
- **Painel:** coordenação ou terapeuta de clínica (fonoaudiologia, psicologia,
  terapia ocupacional, fisioterapia). Quem já registra evolução em algum lugar,
  nem que seja em papel.

> **Atenção ao erro mais comum.** Testar com colega de turma não conta como
> validação, e essa é a observação que mais derruba esta seção. Quem acompanhou
> o projeto sendo construído não erra onde o usuário real erra — já sabe onde
> fica o botão. Se não houver como chegar ao público final, teste com alguém do
> mesmo perfil (um responsável de fora do curso, um profissional da área) e
> **registre a limitação na Seção 11.2**. Limitação declarada é honestidade
> metodológica; limitação escondida é o que a banca encontra.

### 9.3 Roteiro de tarefas

#### Antes de começar: o que dizer

Leia isto para o participante, sem acrescentar nada:

> "Este é um aplicativo em construção para uma clínica de terapias infantis. Eu
> vou pedir algumas coisas para você fazer nele. Não é você que está sendo
> testado, é o aplicativo — se travar em algum ponto, o problema é nosso.
> Pode falar em voz alta o que estiver pensando. Alguns dados aqui são de
> exemplo, então nada do que você digitar vai ficar salvo de verdade."

Essa última frase precisa ser dita, senão a pessoa cadastra uma criança, não a
vê aparecer na lista e vai achar que errou. Mas ela é dita **uma vez, no
começo** — não repetida no meio da tarefa como socorro.

#### Durante: o que não fazer

Não ajude, não explique, não corrija. Se a pessoa travar, espere. O silêncio é
dado, e o impulso de socorrer é o que mais estraga teste de usabilidade feito
por quem construiu o sistema.

Se ela perguntar "é aqui?", devolva a pergunta: *"o que você acha?"*. Se
perguntar "o que é isso?", devolva: *"o que você imagina que seja?"*. Só
interrompa se passar de 3 minutos travada — e aí anote como **não concluiu**,
não como "concluiu com ajuda".

#### Roteiro A — Responsável (app)

| # | Tarefa | Concluiu sozinho? | Tempo | Onde travou |
| --- | --- | --- | --- | --- |
| A1 | "A clínica te cadastrou e mandou seus dados de acesso. Entre no aplicativo." | sim / com ajuda / não | | |
| A2 | "Descubra em que dia e que horas é a próxima sessão do Lucas." | sim / com ajuda / não | | |
| A3 | "A terapeuta escreveu sobre a última sessão do Lucas. Leia o que ela escreveu." | sim / com ajuda / não | | |
| A4 | "Você não vai poder levar o Lucas no horário marcado. Peça outro horário para a clínica." | sim / com ajuda / não | | |
| A5 | "Seu telefone mudou. Deixe o número novo cadastrado." | sim / com ajuda / não | | |

**O que observar em cada uma:**

- **A2** — o caminho curto é a própria tela de início, que já mostra a próxima
  sessão. Se a pessoa for direto para a aba Agenda, não é erro, mas indica que
  o cartão do início não está sendo lido como resposta.
- **A3** — o caminho previsto passa por *Meus filhos* → perfil da criança →
  evoluções. Existe também a aba Evoluções, que lista tudo. Qual dos dois a
  pessoa escolhe diz onde ela espera encontrar informação sobre o filho: por
  criança ou por ordem de data.
- **A4** — é a tarefa mais provável de travar, porque envolve encontrar a ação
  dentro da agenda. Anote com precisão *onde* o olho dela procurou primeiro.
- **A5** — verifica se "Perfil" é entendido como o perfil do responsável e não
  o da criança. A ambiguidade entre os dois perfis é um risco real desta
  interface.

#### Roteiro B — Clínica (painel)

| # | Tarefa | Concluiu sozinho? | Tempo | Onde travou |
| --- | --- | --- | --- | --- |
| B1 | "Entre no painel da clínica." | sim / com ajuda / não | | |
| B2 | "Registre o atendimento que a senhora fez hoje de manhã com a Sofia." | sim / com ajuda / não | | |
| B3 | "Começou uma criança nova na clínica hoje. Deixe ela cadastrada." | sim / com ajuda / não | | |
| B4 | "Descubra quantas sessões a clínica teve este mês e quantas faltaram." | sim / com ajuda / não | | |
| B5 | "Veja quem está atendendo na quarta-feira às 14h." | sim / com ajuda / não | | |

**O que observar em cada uma:**

- **B2** — é a tarefa central do painel e vale começar por ela. Há dois
  caminhos possíveis: pela tela de Evoluções ou pelo prontuário da criança.
  Anote qual a pessoa tentou primeiro; isso decide onde a ação principal
  deveria estar.
- **B3** — o formulário de cadastro é longo. Observe se ela hesita em algum
  campo, se pergunta se algo é obrigatório, e que vocabulário usa para os
  campos (o termo que ela fala é o rótulo que a tela deveria ter).
- **B4** — o dashboard responde isso em números grandes no topo. Se a pessoa
  não achar, o problema é de hierarquia visual, não de navegação.
- **B5** — testa se a grade semanal é legível. Anote se ela lê a grade por
  coluna (dia) ou por linha (horário).

**Vocabulário.** Em todas as tarefas, anote as palavras que o participante usa
espontaneamente: "evolução", "relatório", "anotação", "prontuário", "ficha".
Se o rótulo da tela não é a palavra que a pessoa usa, o rótulo está errado —
e essa é uma das correções mais baratas que existem.

### 9.4 O que foi observado

*(Preencher depois de cada rodada. Uma subseção por rodada.)*

Descreva o que aconteceu: onde as pessoas hesitaram, o que interpretaram de
outro jeito, que vocabulário usaram para nomear as coisas, o que pediram que
não existia.

Registre também **o que funcionou sem atrito**. Essa parte costuma ser omitida e
faz falta: ela protege decisões que a equipe poderia desfazer sem necessidade
porque uma pessoa reclamou e ninguém anotou que as outras quatro passaram
direto.

Um roteiro do que descrever, para não virar lista de opiniões:

1. **Onde parou.** Em que tela, procurando o quê, por quanto tempo.
2. **O que tentou antes de acertar.** O caminho errado é mais informativo que o
   certo.
3. **Que palavra usou.** "Vou ver o relatório dela" quando a tela diz
   "Evoluções" é um achado, não um detalhe.
4. **O que procurou e não existia.** Especialmente pagamento, falta, anexo de
   foto — coisas que estão fora do protótipo de propósito.
5. **O que passou liso.** Nomeie a tela e a tarefa.

**Rodada 1 —** *(escrever aqui)*

**Rodada 2 —** *(escrever aqui)*

### 9.5 O que mudou no projeto

Esta é a tabela que transforma teste em iteração. Cada problema observado gera
uma decisão, e a decisão aparece em algum lugar do sistema.

Se um problema foi observado e **não** corrigido, registre assim mesmo, com o
motivo. Problema conhecido e adiado é decisão de projeto; problema omitido é
omissão.

| Problema observado | Decisão tomada | Onde foi alterado | Rodada |
| --- | --- | --- | --- |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

**Como preencher a coluna "Onde foi alterado".** Este projeto tem uma vantagem
que um protótipo de Figma não tem: a alteração fica registrada em commit. Vale
citar o arquivo e o commit — por exemplo, *"`src/screens/AgendaScreen.tsx`,
commit `a1b2c3d`"*. Isso liga a Seção 9 ao código e é verificável por quem
avaliar.

> **Se a tabela sair vazia, o problema é o teste, não o protótipo.** Teste que
> não produziu nenhuma mudança costuma indicar uma de duas coisas: o roteiro
> pediu opinião em vez de tarefa, ou alguém da equipe ajudou durante a
> execução. Nos dois casos, vale refazer uma rodada curta antes de escrever
> esta seção.

---

## Como rodar

Você precisa de **Node.js 18 ou superior**.

```bash
git clone https://github.com/CapMatias/AtivaMente-MVP.git
cd AtivaMente-MVP
npm install
npm start
```

O Expo abre um menu no terminal com um QR Code:

- **no celular** — instale o app *Expo Go* ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) /
  [iOS](https://apps.apple.com/app/expo-go/id982107779)) e aponte a câmera para o QR Code;
- **no navegador** — tecle `w` no terminal (ou rode `npm run web`);
- **em emulador** — tecle `a` para Android ou `i` para iOS.

A forma mais rápida de ver o app rodando é pelo navegador com `npm run web`.

O app abre na splash screen, segue para o onboarding e depois para o login.
**Qualquer e-mail válido e qualquer senha com 6 ou mais caracteres entram** — a
autenticação é simulada.

### E o painel da clínica?

O painel é uma aplicação web feita com **Inertia.js**, que não é um roteador de
cliente: ele é a ponte entre um backend que renderiza as respostas (Laravel) e
um frontend Vue. Por isso o código dele está aqui em `resources/`, mas **não
roda sozinho neste repositório** — precisa ser instalado dentro de um projeto
Laravel.

O arquivo [VUE-INERTIA.md](VUE-INERTIA.md) explica o porte em detalhe, e
`routes/web.php` traz as rotas de exemplo do lado do servidor.

---

## Stack

| Parte | Tecnologias |
| --- | --- |
| App dos responsáveis | React Native 0.74, Expo 51, expo-router 3.5, TypeScript |
| Estilização (app) | NativeWind (Tailwind CSS para React Native) |
| Estado e formulários | Zustand, React Hook Form, Zod |
| Painel da clínica | Vue 3 (Composition API), Inertia.js, Tailwind CSS |
| Build do painel | Vite |

Os gráficos do dashboard foram escritos à mão em SVG, sem biblioteca de
gráficos.

---

## Mapa do repositório

```text
app/                      rotas do app (expo-router) — cada arquivo só
                          re-exporta a tela correspondente de src/screens
├── _layout.tsx           pilha de navegação
├── (tabs)/_layout.tsx    barra de abas inferior
└── ...

src/                      o código do app dos responsáveis
├── screens/              as 12 telas
├── components/ui/        botões, card, input, modal, calendário, timeline...
├── services/
│   ├── mockData.ts       DADOS DE DEMONSTRAÇÃO — troque por chamadas reais
│   └── api.ts            camada de serviço (hoje devolve promessas simuladas)
├── store/authStore.ts    estado de autenticação (Zustand)
├── constants/theme.ts    paleta de cores
└── types/index.ts        tipos do domínio (User, Child, Session, Evolution)

resources/                versão web em Vue 3 + Inertia
├── js/Pages/             12 páginas do app dos responsáveis...
├── js/Pages/Admin/       ...e as 8 telas do painel da clínica
├── js/Components/ui/     componentes da versão web do app
├── js/Components/admin/  componentes do painel + gráficos SVG
├── js/Layouts/           sidebar, header e navegação
└── css/app.css           tema

routes/web.php            rotas de exemplo do backend Laravel
```

---

## Por onde começar a ler

Se a ideia é avaliar o código, esta é a ordem que faz mais sentido:

1. **[`src/types/index.ts`](src/types/index.ts)** — o modelo de domínio em 45
   linhas. Entendendo `User`, `Child`, `Session` e `Evolution`, o resto do
   projeto se explica.
2. **[`src/services/mockData.ts`](src/services/mockData.ts)** — os dados que
   alimentam as telas. Mostra na prática como o domínio se preenche.
3. **[`src/screens/HomeScreen.tsx`](src/screens/HomeScreen.tsx)** — a tela
   inicial do app. Dá para ver o padrão usado em todas as outras: composição de
   componentes de `components/ui/` e estilização por classes do NativeWind.
4. **[`src/components/ui/`](src/components/ui/)** — os componentes reutilizáveis.
   `Calendar.tsx` e `Timeline.tsx` são os mais substanciais.
5. **[`resources/js/Pages/Admin/Dashboard.vue`](resources/js/Pages/Admin/Dashboard.vue)**
   — a tela mais densa do painel, com os gráficos.

---

## Contexto adicional

O painel administrativo nasceu como protótipo no Figma Make (React + Tailwind) e
foi portado para Vue 3 + Inertia seguindo as convenções de um ERP em Laravel
desenvolvido pela equipe. O histórico de commits deste repositório registra esse
processo.

### A integração com o ERP da equipe

O painel não vive só aqui. Ele foi entregue como pull request ao repositório do
ERP (privado, por isso sem link), na branch `feat/painel-admin`, e o código
daqui foi adaptado às convenções de lá em vez do contrário:

- **TypeScript convertido para JavaScript**, com `defineProps` em tempo de
  execução e tipos documentados por JSDoc, que é o padrão do projeto deles;
- **Tailwind v4 adaptado para o v3** que o ERP usa, trocando a configuração por
  CSS (`@theme`) pelo `tailwind.config.js`;
- **validação passada para o lado do servidor**, usando `useForm` do Inertia com
  as regras do Laravel, no lugar do Zod.

A entrega foi desenhada para não tocar em nada que já existia. As rotas ficaram
isoladas em um `routes/admin.php` novo, e ativá-las é uma linha só
(`require __DIR__.'/admin.php';`). O único arquivo compartilhado que precisou
mudar foi o `tailwind.config.js`, que varria apenas `*.vue` e por isso não
gerava as classes de cor definidas em `constants/adminTokens.js` — os avatares e
as etiquetas de especialidade saíam sem cor. Foi acrescentado um glob para
`*.js`.

A divisão de trabalho é essa: o frontend é responsabilidade deste repositório,
o backend e o banco ficam com os outros integrantes da equipe. O app dos
responsáveis é etapa seguinte, para quando as duas pontas forem ligadas.

## Licença

MIT — veja [LICENSE](LICENSE).
