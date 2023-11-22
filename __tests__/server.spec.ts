import request from 'supertest';
import { app } from '../src/server';

describe('Serviço da API', () => {
  it('Deve retornar um JSON com uma mensagem "Conteúdo não encontrado" ao acessar uma rota inexistente', async () => {
    const response = await request(app).get('/rota-inexistente');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      mensagem: 'Conteúdo não encontrado.',
    });
  });
});
