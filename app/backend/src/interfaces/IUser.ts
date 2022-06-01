interface IUser {
  id:number,
  username: string,
  role: string,
  email: string,
  password: string,
}

interface IUserPlublic {
  id?:number,
  username: string,
  role: string,
  email: string,
}

interface IUserCredentials {
  email: string,
  password: string,
}

export { IUser, IUserPlublic, IUserCredentials };
