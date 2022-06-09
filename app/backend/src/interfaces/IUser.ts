interface IUser {
  id:number,
  username: string,
  role: string,
  email: string,
  password: string,
}

interface IUserPublic {
  id?:number,
  username: string,
  role: string,
  email: string,
}

interface IUserCredentials {
  email: string,
  password: string,
}

interface ILoggedUser {
  user: {
    id: number,
    username: string,
    role: string,
    email: string,
  },
  token: string;
}

export { IUser, IUserPublic, IUserCredentials, ILoggedUser };
