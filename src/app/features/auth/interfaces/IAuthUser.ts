import {AuthRole } from "../enums/authRole";

export interface IAuthUser {
  id: number;
  role: AuthRole;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}