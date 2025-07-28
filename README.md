# Projeto Winfor - Desafio para Desenvolvedores

Este documento descreve as características arquiteturais e o processo
de desenvolvimento da aplicação.

## tl;dr

**Requisitos:**

- `git`

- `docker` (foi utilizada a versão 28.3.2, mas qualquer versão a
  partir da integração do docker composer V2, i.e., que suporte o
  comando `docker compose`, deve funcionar corretamente)

- `GNU make` ou equivalente: opcional, mas altamente recomendado

**Inicialização do sistema:**

1. Navegue até a raiz do projeto `winfor`

1. Execute `make run`

**Utilização:**

- A aplicação web estará disponível em `http://localhost:4200/`

- O servidor Keycloak, em `http://localhost:8090/`

Os contêineres já contêm alguns dados pré-inseridos, entre eles, as
seguintes contas de usuário (os nomes das contas denotam seus
respectivos perfis):

- `admin1`;

- `coordenador1`;

- `professor1`;

- `aluno1`;

`"password"`, sem as aspas, é a senha para todas as contas;

Como administrador do servidor Keycloak, mantivemos a conta temporária
padrão: usuário `admin` e senha `change_me`;

## Mensagens aos Avaliadores

**2025-07-28:** Este projeto foi bastante instrutivo. Grato pela
oportunidade. Por favor, verifiquem a seção
["Limitações"](#limitacoes) deste documento, pois não implementei
todos os requisitos sugeridos na especificação.

Ainda pretendo utilizar este projeto como plataforma para a realização
de estudos diversos. Caso venham a me considerar para a vaga anunciada
mas sintam a necessidade de um "critério de desempate", convido-os a
visitar novamente este repositório, pois é possível que eu tenha feito
alguns acréscimos até lá.

## Características

Discutimos abaixo algumas características do projeto.

### Contêineres de Desenvolvimento

Os contêineres Docker foram utilizados seguindo um arranjo que, até
onde vai nosso conhecimento, é comumente chamado de "Contêiner de
Desenvolvimento". Basicamente, o Docker é utilizado não apenas para
encapsular as aplicações para o deployment posterior, mas também para
abrigar e executar a maior parte das ferramentas utilizadas no
desenvolvimento, como compiladores, linters, entre outros.

Tivemos a oportunidade de utilizar esse método com grande sucesso
alguns anos atrás, num projeto Python + Typescript. Embora houvesse
grande heterogeneidade nos ambientes de cada desenvolvedor (Windows,
iOS e diferentes distribuições Linux), não houve um caso sequer de
incompatibilidade provocada por disparidades entre os ambientes.

O emprego desse método neste projeto apresentou certos desafios
([vide](#licoes)), para os quais ainda não encontramos soluções
satisfatórias.

### Liberdades na aplicação de princípios SOLID

O autor gostaria de declarar que tem plena ciência dos princípios
SOLID mas, devido a limitações de tempo, lançou mão de certos
atalhos que não adotaria em um projeto de produção. Por exemplo, em
algumas classes `Resource` da API REST, lidamos não apenas com a
construção de Responses HTTP mas também com a preparação de estruturas
de dados a serem consumidas pelo front-end (algo que deveria, talvez,
ser realizado por uma classe Service ou equivalente).

### Estilo de organização do código

O código nos projetos `winfor-api` e `winfor-web` segue uma
organização baseada em funcionalidades. Tal método difere da
organização baseada em camadas comumente utilizada na maioria dos
projetos.

A esse respeito, o autor declara que não possui preferências ou
opiniões fortes contra ou a favor de nenhum dos estilos, estando
totalmente aberto à adoção de qualquer convenção adotada na Empresa.

## <a name="licoes"></a>Lições Aprendidas

O método de Contêiner de Desenvolvimento, que nos prestou bons
serviços em projetos Python alguns anos atrás, não funcionou a
contento neste projeto em Java. Em diferentes ocasiões, as
dependências do projeto se tornaram inacessíveis à IDE, gerando grande
ruído na forma de dezenas de falsos erros de compilação. A desativação
das validações em tempo real poderia atenuar esse problema, porém
algumas facilidades, como as sugestões do auto-completar, ficaram
indisponíveis. Isso representou um inconveniente, tendo em vista que
utilizávamos APIs com as quais não possuíamos qualquer familiaridade.

A depuração do código também foi prejudicada, embora esse empecilho
tenha sido contornável por meio do uso de depuração remota via porta
5005.

As ferramentas de desenvolvimento em execução no contêiner realizam
modificações no projeto. Dado que, por padrão, os processos no
contêiner rodam como `root` e assumem a posse de alguns arquivos, é
possível que isso tenha impedido o acesso dos arquivos pelos processos
rodando no host e, com isso, provocado ao menos parte dos problemas
observados. Configurar a imagem Docker de modo a não usar contas
privilegiadas pode resolver o problema, mas ainda não realizamos esse
teste.

## <a name="limitacoes"></a>Limitações

1. Até o momento da redação deste documento (28.jul.2025, 16h15), as
   telas da aplicação web ainda não são responsivas. A estratégia para
   tal já foi delineada, mas não aplicada;
   
1. No projeto, há 3 aplicações web, sendo: `winfor-api`, implementando a
   API REST, `winfor-web`, implementando o front-end, e o servidor
   Keycloak. Cada uma dessas aplicações foi exposta em uma porta
   diferente (respectivamente, 8080, 4200, e 8090). A ideia inicial
   era a de expô-las todas na porta padrão 80, em diferentes context
   paths operando por trás de um proxy reverso, como um contêiner
   Nginx. Por falta de tempo, essa medida não foi testada, mas é uma
   estratégia que gostaríamos de experimentar.
   
1. As telas de administração de cursos não foram implementadas. Demos
   menor prioridade a elas por entendermos que, ao menos em nossa
   concepção, elas se tratariam de simples formulários CRUD e não
   imporiam desafios técnicos mais expressivos. Ao fim, acabamos
   ficando sem tempo de implementá-las. (Para compensar a ausência
   dessas telas, importamos os dados de cursos e matrizes curriculares
   do site da [UFMS](https://graduacao.ufms.br/cursos))

1. Até o momento da redação deste documento, a tela de exibição de
   matrizes curriculares não está totalmente implementada. Porém, as
   funcionalidades no back-end estão presentes. As estruturas de dados
   contendo os dados das matrizes, já num formato conveniente para a
   interpretação e construção de tabelas HTML, estão sendo exibidas na
   tela por meio de tags `<pre>`.

1. Inicialmente, pretendíamos avaliar este sistema em um cluster
   Kubernetes. Acreditamos que tal medida não demandaria grandes
   esforços, mas tais testes não foram realizados. Até o momento, a
   aplicação somente foi testada sob o docker composer, com os
   contêineres acessando os diretórios do repositório de
   desenvolvimento.

1. Devido a dificuldades na execução do Eclipse em conjunto com os
   contêineres de desenvolvimento ([vide](#licoes)), a maior parte do
   código Java foi escrito num editor de texto puro
   (Vim). Pretendíamos executar um linter sobre o código Java para
   detectar eventuais inconsistências que teriam sido facilmente
   identificadas por uma IDE Java qualquer. Entretanto, devido às
   restrições de tempo, um linter não foi utilizado e,
   consequentemente, pode haver falhas como classes importadas e não
   utilizadas, variáveis declaradas e não utilizadas, entre outras.

1. Credenciais foram mantidas em texto simples nos arquivos de
configuração. O autor tem ciência de que essa não é uma boa prática
tendo-a adotado apenas para fins de simplicidade e economia de tempo.
