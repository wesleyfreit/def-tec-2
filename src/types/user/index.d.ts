interface IUser {
  nome: string;
  email: string;
  senha: string;
  telefones: [
    {
      numero: string;
      ddd: string;
    },
  ];
}

interface IUserLogin {
  email: string;
  senha: string;
}
