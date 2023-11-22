import request from 'supertest';

import { User } from '../src/models/User';
import { app } from '../src/server';
import { verifyTokenJwt } from '../src/utils/jwtFunctions';

const userModel = new User();

describe('Serviço das rotas de usuário e UserController da API', () => {
  it('Deve exibir um JSON com os dados do novo usuário criado ao tentar criar uma nova conta pela rota /api/v1/users/signup', async () => {
    const response = await request(app)
      .post('/api/v1/users/signup')
      .send({
        nome: 'Vaderlania Alves',
        email: 'vadnav@gmail.com',
        senha: '55a@czlkaa',
        telefones: [{ numero: '48522464', ddd: '88' }],
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('data_criacao');
    expect(response.body).toHaveProperty('data_atualizacao');
    expect(response.body).toHaveProperty('ultimo_login');
    expect(response.body).toHaveProperty('token');

    await userModel.removeUser(response.body.id);
  });

  it('Deve rejeitar a requisição e exibir um JSON com erro de validação ao tentar criar uma conta sem inserir todos os atributos requisitados na rota /api/v1/users/signup', async () => {
    const response = await request(app)
      .post('/api/v1/users/signup')
      .send({
        nome: 'Vaderlania Alves',
        senha: '55a@czlkaa',
        telefones: [{ numero: '48522464', ddd: '88' }],
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      mensagem: 'Validation failed: email é obrigatório',
    });
  });

  it('Deve rejeitar a requisição e exibir um JSON com erro de validação ao tentar criar uma conta com um email já cadastrado na rota /api/v1/users/signup', async () => {
    const response1 = await request(app)
      .post('/api/v1/users/signup')
      .send({
        nome: 'Francisco José',
        email: 'franjz@gmai.com',
        senha: '@jszkdfz',
        telefones: [{ numero: '48522464', ddd: '88' }],
      });

    const response2 = await request(app)
      .post('/api/v1/users/signup')
      .send({
        nome: 'Francisco José',
        email: 'franjz@gmai.com',
        senha: '@jszkdfz',
        telefones: [{ numero: '48522464', ddd: '88' }],
      });

    expect(response2.status).toBe(400);
    expect(response2.body).toEqual({
      mensagem: 'E-mail já existente.',
    });

    await userModel.removeUser(response1.body.id);
  });

  it('Deve exibir um JSON com os dados do usuário ao tentar fazer login na conta pela rota /api/v1/users/signin', async () => {
    await request(app)
      .post('/api/v1/users/signup')
      .send({
        nome: 'Carla Souza',
        email: 'szcarl@gmail.com',
        senha: '@545z54%$',
        telefones: [{ numero: '81211978', ddd: '11' }],
      });

    const response = await request(app).post('/api/v1/users/signin').send({
      email: 'szcarl@gmail.com',
      senha: '@545z54%$',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('data_criacao');
    expect(response.body).toHaveProperty('data_atualizacao');
    expect(response.body).toHaveProperty('ultimo_login');
    expect(response.body).toHaveProperty('token');

    await userModel.removeUser(response.body.id);
  });

  it('Deve exibir um token jwt válido no JSON ao tentar fazer login na conta pela rota /api/v1/users/signin', async () => {
    await request(app)
      .post('/api/v1/users/signup')
      .send({
        nome: 'Ricardo Barros',
        email: 'ricdbros@gmail.com',
        senha: 'ad48abcs$',
        telefones: [{ numero: '81211978', ddd: '11' }],
      });

    const response = await request(app).post('/api/v1/users/signin').send({
      email: 'ricdbros@gmail.com',
      senha: 'ad48abcs$',
    });

    expect(response.status).toBe(200);

    const result = verifyTokenJwt(response.body.token);

    expect(result).toBeTruthy();
    expect(result).toEqual(response.body.id);

    await userModel.removeUser(response.body.id);
  });

  it('Deve exibir os dados do usuário ao buscá-lo pela rota /api/v1/users/:id a partir do token jwt e id do usuário', async () => {
    const response = await request(app)
      .post('/api/v1/users/signup')
      .send({
        nome: 'Roberto Carlos',
        email: 'rbtcarl@gmail.com',
        senha: 'tad@287p$',
        telefones: [{ numero: '978982145', ddd: '85' }],
      });

    const responseUser = await request(app)
      .get(`/api/v1/users/${response.body.id}`)
      .set('Authorization', `Bearer ${response.body.token}`);

    expect(responseUser.status).toBe(200);
    expect(responseUser.body).toHaveProperty('id');
    expect(responseUser.body).toHaveProperty('nome');
    expect(responseUser.body).toHaveProperty('email');
    expect(responseUser.body).toHaveProperty('telefones');

    await userModel.removeUser(response.body.id);
  });
});
