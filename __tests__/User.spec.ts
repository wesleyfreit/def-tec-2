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

  it('Deve ser possível recuperar um usuário pelo email', async () => {
    const userCreated = await userModel.createNewUser(
      newUser.nome,
      newUser.email,
      newUser.senha,
      newUser.telefones,
    );

    const userExisting = await userModel.getUserByEmail(userCreated.email);

    expect(userExisting?.email).toBe(userCreated.email);

    await userModel.removeUser(userCreated.id);
  });

  it('Deve ser possível validar se a senha fornecida corresponde à senha do usuário', async () => {
    const userCreated = await userModel.createNewUser(
      newUser.nome,
      newUser.email,
      newUser.senha,
      newUser.telefones,
    );

    const userExisting = await userModel.getUserByEmail(userCreated.email);

    const checkPassword = await userModel.compareUserPassword(
      newUser.senha,
      userExisting?.senha as string,
    );

    expect(checkPassword).toBe(true);

    await userModel.removeUser(userCreated.id);
  });

  it('Deve ser possível recuperar o usuário através do id dele', async () => {
    const userCreated = await userModel.createNewUser(
      newUser.nome,
      newUser.email,
      newUser.senha,
      newUser.telefones,
    );

    const userExisting = await userModel.getUser(userCreated.id);

    expect(userExisting?.id).toBe(userCreated.id);

    await userModel.removeUser(userCreated.id);
  });

  it('Deve ser possível atualizar o último login do usuário', async () => {
    const userCreatedAndFirstLogin = await userModel.createNewUser(
      newUser.nome,
      newUser.email,
      newUser.senha,
      newUser.telefones,
    );
    await userModel.updateLastUserLogin(userCreatedAndFirstLogin.id);

    const userSecondLogin = await userModel.getUser(userCreatedAndFirstLogin.id);

    expect(userCreatedAndFirstLogin.ultimo_login).toBeNull();
    expect(userSecondLogin?.ultimo_login).toBeInstanceOf(Date);

    await userModel.removeUser(userCreatedAndFirstLogin.id);
  });
});
