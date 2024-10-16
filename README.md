# Projeto de Formulário

Este projeto é uma aplicação de backend para gerenciar a submissão de formulários, armazenamento de dados e envio de e-mails.

# Estrutura do Projeto
## Arquivos de Configuração
- `.babelrc`
- `.env`
- `.gitignore`
- `project.json`
- `README.txt`
- `jest.config.js`
- `package.json`
- `vercel.json`

## Diretórios
### .idea/
- `vcs.xml`
- `workspace.xml`
### .vercel/
- (conteúdo do diretório)
### server/
- `Database.js`
- `formController.js`
- `formModel.js`
- `index.js`
- `Route.js`
- `Service.js`
- `smtp.js`
### Test/
#### feature/
- `enviarDados.feature`
- `enviarEmail.feature`
- `validacaoTelefone.feature`
#### Testes unitários
- `formController.test.js`
- `formModel.test.js`
- `Service.test.js`
## Instalação
1. Clone o repositório:
    ```sh
    git clone <url-do-repositorio>
    ```
2. Instale as dependências:
    ```sh
    npm install
    ```
3. Configure as variáveis de ambiente no arquivo `.env`:
    ```
    SUPABASE_URL=<sua-url-supabase>
    SUPABASE_KEY=<sua-chave-supabase>
    EMAIL_USER=<seu-email>
    EMAIL_PASS=<sua-senha>
    ```
## Scripts
- Para iniciar o servidor:
    ```sh
    npm start
    ```
- Para rodar os testes:
    ```sh
    npm test
    ```
## Endpoints
### Submeter Formulário
- **URL:** `/api/form/submit`
- **Método:** `POST`
- **Descrição:** Submete os dados do formulário, armazena no banco de dados e envia um e-mail de notificação.
- **Exemplo de corpo da requisição:**
    ```json
    {
      "nome": "João",
      "email": "joao@example.com",
      "telefone": "123456789",
      "empresa": "Empresa XYZ",
      "mensagem": "Descrição da necessidade"
    }
    ```
### Obter Dados do Formulário
- **URL:** `/api/form/data`
- **Método:** `GET`
- **Descrição:** Retorna os dados armazenados no banco de dados.
## Testes
Os testes estão localizados na pasta `server/Test/`. Utilizamos `jest` e `jest-cucumber` para escrever e rodar os testes.
### Exemplo de Teste
- **Arquivo:** `server/Test/formModel.test.js`
- **Descrição:** Testa a validação do campo "Telefone" no formulário.
- **Exemplo de cenário de teste:**
    ```js
    test('Telefone inválido', ({ given, when, then }) => {
      let formData;
      let result;
      given('o usuário preencheu os campos do formulário', () => {
        formData = {
          nome: 'João',
          email: 'joao@example.com',
          telefone: '12345',
          empresa: 'Empresa XYZ',
          mensagem: 'Descrição da necessidade',
          checkbox: true
        };
      });
      when('o usuário submete o formulário com o campo "Telefone" em formato inválido', async () => {
        result = await insertFormData(formData);
      });
      then('o sistema deve exibir uma mensagem de erro indicando que o formato do telefone é inválido', () => {
        expect(result).toEqual({ success: false, message: 'Formato do telefone inválido.' });
      });
    });
    ```
## Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
