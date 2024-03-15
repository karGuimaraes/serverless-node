# Projeto de Compressão de Imagens para AWS S3

Este projeto consiste em uma função lambda que é acionada por eventos S3 e comprime as imagens adicionadas a um bucket S3 da AWS. Ele utiliza as bibliotecas `aws-sdk` e `sharp` para manipulação e compressão de imagens.

## Requisitos

- Node.js
- AWS SDK
- Sharp

## Instalação

1. Clone este repositório:

    ```bash
    git clone https://github.com/seu-usuario/nome-do-repositorio.git
    ```

2. Instale as dependências:

    ```bash
    cd nome-do-repositorio
    npm install
    ```

3. Configure suas credenciais da AWS no arquivo `~/.aws/credentials`.
   
   ```bash
   serverless config credentials -o --provider aws--key=CHAVEAWS --secret SECRETAWS
   ```

5. Para fazer deploy na AWS execute:

  ```bash
    npm run deploy
    ```

## Configuração

Antes de implantar, certifique-se de configurar as variáveis de ambiente necessárias:

- `bucket`: Nome do bucket S3 onde as imagens estão localizadas e para onde as imagens comprimidas serão enviadas.

## Funcionamento

A função lambda é acionada por eventos S3. Quando uma nova imagem é adicionada ao bucket S3 configurado, a função é executada. Ela realiza as seguintes etapas:

1. Recupera a imagem original do bucket S3.
2. Comprime a imagem para um formato JPEG com uma qualidade de 50% e dimensões de 1280x720 pixels.
3. Armazena a imagem comprimida no mesmo bucket S3, em uma pasta chamada "compressed", mantendo o nome original da imagem com a extensão ".jpg".
