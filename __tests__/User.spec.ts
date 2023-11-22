import { User } from '../src/models/User';

const userModel = new User();

describe('Serviço de usuários', () => {
  it('Deve ser possível cadastrar um usuário', async () => {
    const usersBefore = await userModel.getAllUsers();

    const newUser = {
      nome: 'Romulo Silva',
      email: 'rmdslv@gmail.com',
      senha: '$12341dsa556%',
      telefones: [{ numero: '15493189', ddd: '82' }],
    };

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
    const newUser = {
      nome: 'Ronaldo Ferreira',
      email: 'rondlfr@gmail.com',
      senha: '54@9zd24714',
      telefones: [{ numero: '45415479', ddd: '22' }],
    };

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
    const newUser = {
      nome: 'Maria Santana',
      email: 'mrast@gmail.com',
      senha: '54926gfg814',
      telefones: [{ numero: '45924792', ddd: '15' }],
    };

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
    const newUser = {
      nome: 'Ana Dias',
      email: 'andias@gmail.com',
      senha: '14acz989245',
      telefones: [{ numero: '45415479', ddd: '35' }],
    };

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
    const newUser = {
      nome: 'João Gonçalves',
      email: 'jrgca@gmail.com',
      senha: 'dsa445d5s',
      telefones: [{ numero: '54148192', ddd: '83' }],
    };

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
