# Projeto: Aplicação web com persistência de dados do lado do servidor

![alt text](gif-login-1.gif) ![alt text](gif-homeetc-1.gif)

## [Deply frontend](https://project3-2025a-andriel-joao.vercel.app)
## [Deploy backend](https://divide-ai-backend-1.onrender.com)

### [Repositório Backend](https://github.com/apfmota/divide-ai-backend)🔗 (commits a partir de 11/06 se referem ao projeto atual)

### Desenvolvedores
- Andriel Prieto (Ciência da computação)
- João Pedro (Sistemas de Informação)

### Nosso produto

Foi desenvolvida uma ferramenta que tem como objetivo possibilitar e tornar mais prática à divisão de itens de compra entre várias pessoas a partir do escaneamento da nota fiscal.


### Desenvolvimento

O projeto iniciou inspirado em projeto já existente realizado para outra disciplina. Do projeto original foi reutilizado apenas o scrip python (com adaptações) utilzado para realizar o web scrapping, obtendo os dados da compra a partir da url da nota fiscal. Como o projeto original não tinha qualquer tipo de persistência de dados, a ideia foi construir um backend que permitisse ao usuário manter um registro das suas notas escaneadas assim como permitir alterar dados de notas passadas.

Com a ideia já definida e tecnologias decididas foi necessário pensar no layout, com uma ideia previa do que seria o conteudo da aplicação, foi decido focar na visualização mobile. Com utilização de menus laterais foi possivel criar a navegação do site, um protótipo do layout foi desenhado à mão:

![rascunho do site desenhado à mão](rascunho-divide-ai.jpg)


#### Tecnologias

- Spring Boot
- Maven
- Docker
- Vite
- H2 (banco de dados)
- Selenium (web scrapping)

#### Ambiente de desenvolvimento

- Visual Studio Code

#### Referências e créditos

- Chat GPT (principalmente com o deploy)
- [Guia Spring Boot](https://spring.io/guides/gs/spring-boot)
- [Material UI](https://mui.com/material-ui)
-
-
---
Projeto entregue para a disciplina de [Desenvolvimento de Software para a Web](http://github.com/andreainfufsm/elc1090-2025a) em 2025a