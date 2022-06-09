import { userInfo } from "os";
import Jwt from "../../helper/Jwt";
import { IUser, IUserCredentials, IUserPublic } from "../../interfaces/IUser";

const User: IUser[] = [
  {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  },
  {
    id: 2,
    username: 'User',
    role: 'user',
    email: 'user@user.com',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
  }
]

const UserPublic: IUserPublic[] = [
  {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
  },
  {
    id: 2,
    username: 'User',
    role: 'user',
    email: 'user@user.com',
  }
]

const UserCredentials: IUserCredentials = {
  email: 'admin@admin.com',
  password: 'secret_adm',
}

export { User, UserPublic, UserCredentials };