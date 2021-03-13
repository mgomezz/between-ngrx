import { Guid } from '../helpers/Guid';
import { Skill } from './skill';

export class User {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  birthday: any;
  password: string;
  role: string;
  skills: Array<Skill>;
}