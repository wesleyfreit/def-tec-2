import { User } from '../src/models/User';

const userModel = new User();

const newUser = {
  nome: 'Romulo Silva',
  email: 'emailofwho@gmail.com',
  senha: '123456',
  telefones: [{ numero: '15493189', ddd: '82' }],
};

describe('Serviço de usuários', () => {
  it('Deve ser possível cadastrar um usuário', async () => {
    const usersBefore = await userModel.getAllUsers();

    const userCreated = await userModel.createNewUser(
      newUser.nome,
      newUser.email,
      newUser.senha,
      newUser.telefones,
    );

    const usersAfter = await userModel.getAllUsers();

    expect(usersAfter.length).toBe(usersBefore.length + 1);

    await userModel.removeUser(userCreated.id);
  });
});
