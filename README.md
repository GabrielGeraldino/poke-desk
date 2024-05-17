# Projeto Pokémon

[![License](https://img.shields.io/badge/license-XYZ-blue.svg)]()

Este projeto é um aplicativo web que utiliza a API do Pokémon TCG para criar, editar e excluir decks de cartas de Pokémon.

Ele foi desenvolvido usando Angular 17, Tailwind CSS, IGX Angular e Ionic.

## Funcionalidades

- Criação, edição e exclusão de decks de cartas de Pokémon.
- Adição de nome e imagem para cada deck.
- Adição de cartas de Pokémon aos decks, com filtragem por nome, tipos, subtipos, supertipos e raridades.
- Os decks devem conter no mínimo 24 cartas e no máximo 60 cartas.
- Os dados dos decks são salvos localmente usando o LocalStorage do navegador.
- O aplicativo está traduzido para os idiomas português (pt), inglês (en) e espanhol (es) usando o ngx-translate-core.

## Requisitos

Certifique-se de ter as seguintes dependências instaladas antes de executar o projeto:

- Node.js (versão 18)
- Angular CLI (versão 17)
- Tailwind CSS (versão 3)
- IGX Angular (versão 13)
- Ionic (versão 6)

## Instalação

Siga estas etapas para configurar e executar o projeto:

1. Clone o repositório para sua máquina local:

   ```shell
   git clone https://github.com/GabrielGeraldino/poke-desk.git
   ```

2. Navegue até o diretório do projeto:

   ```shell
   cd poke-desk
   ```

3. Instale as dependências do projeto:

   ```shell
   npm install
   ```

4. Compile e execute o projeto:

   ```shell
   ng serve
   ```

5. Abra um navegador da web e acesse http://localhost:4200 para visualizar o aplicativo.

## Estrutura do Projeto

O projeto está estruturado da seguinte forma:

- `src/`: Contém os arquivos-fonte do projeto.
  - `app/`: Contém os componentes, serviços e modelos relacionados ao aplicativo.
  - `assets/`: Contém os arquivos estáticos de imagens.
  - `assets/i18n`: Contém os arquivos de tradução.
  - `styles/`: Contém os arquivos de estilo, incluindo o arquivo principal do Tailwind CSS.
  - `pages/`: Contém as pastas de cada página do projeto.
  - `models/`: Contém os modelos de dados utilizandos no projeto.
  - `components/`: Contém os componentes utilizandos no projeto.
