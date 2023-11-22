## Início rápido

#### Requisitos: Node, NPM.

---

**1.** Instalar as depedências do projeto pelo do terminal com o comando:

```bash
npm i
```

---

**2.** Criar um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```bash
JWT_SECRET = 'digitos_aleatorios'
DATABASE_URL = 'postgresql://user:password@localhost:5432/mydatabasename'
```

- **_A variável JWT_SECRET serve como secret na geração dos tokens JWT._**

- **_A variável DATABASE_URL serve para fazer a conexão com o banco de dados PostgresSQL._**

---

**3.** Gerar o banco de dados pelo terminal com o comando:

```bash
npm run prisma
```

---

**4.** Rodar o servidor em ambiente de desenvolvimento pelo do terminal com o comando:

```bash
npm run dev
```

---

**5.** Fazer o build da aplicação pelo do terminal com o comando:

```bash
npm run build
```

---

**6.** Rodar o servidor após o build pelo do terminal com o comando:

```bash
npm run start
```

---

**6.** Utilizar o link [http://localhost:8080](http://localhost:8080) para usar os endpoints API no ambiente local.


## Observações

#### Os endpoints da API no ambiente local são:

- **POST**

[http://localhost:8080/api/v1/users/signup](http://localhost:8080/api/v1/users/signup)

[http://localhost:8080/api/v1/users/signin](http://localhost:8080/api/v1/users/signin)

- **GET**

[http://localhost:8080/api/v1/users/:id](http://localhost:8080/api/v1/users/:id)

- Esses endpoints possuem um esquema de validação na requisição que foi feito utilizando o __celebrate__ com o __Joi__. Desta forma a requisição só pode ser aceita se atender ao esquema estipulado, caso contrário ela é rejeitada.

- A criptografia da senha do usuário é feita utilizando o __bcrypt__, enquanto que a criptografia do token é feita utilizando o __JWT__.

---

#### Para executar os testes automatizados no ambiente de desenvolvimento, utilize este comando no terminal:

```bash
npm run test
```
- Os testes estão na raiz do projeto na pasta \_\___tests____ e são executados com o __Jest__.

- Foram feitos testes unitários nos métodos de manipulação de usuários e testes de integração nos endpoints para verificar o comportamento.

---

#### Foram utilizados o EsLint e o Prettier para padronizar o estilo do código, eles podem ser utilizados através deste comando pelo terminal: 

```bash
npm run lint
```

- O __EsLint__ se encarrega de verificar a sintaxe e encontrar problemas no código, enquanto que o __Prettier__ se encarrega de padronizar estilo.
- Também foi automatizado um git hook para fazer a padronização, verificação de erros e testes no código sempre que um commit for feito. Para isso foi utilizado o __husky__ e o __lint-stage__.