import { User } from '../models/user';
import * as moment from 'moment';
import { Guid } from '../helpers/Guid';

export const defaultUsers: Array<User> = [
  {
    id: Guid.newGuid(),
    firstname: 'test1',
    lastname: 'test1',
    username: 'test1',
    password: '123456test',
    email: 'test1@gmail.com',
    birthday: moment().subtract(19, 'year'),
    role: 'admin',
    skills: []
  },
  {
    id: Guid.newGuid(),
    firstname: 'test2',
    lastname: 'test2',
    username: 'test2',
    password: '123456test',
    email: 'test2@gmail.com',
    birthday: moment().subtract(19, 'year'),
    role: 'admin',
    skills: []
  },
  {
    id: Guid.newGuid(),
    firstname: 'test3',
    lastname: 'test3',
    username: 'test3',
    password: '123456test',
    email: 'test3@gmail.com',
    birthday: moment().subtract(19, 'year'),
    role: 'admin',
    skills: []
  },
  {
    id: Guid.newGuid(),
    firstname: 'test4',
    lastname: 'test4',
    username: 'test4',
    password: '123456test',
    email: 'test4@gmail.com',
    birthday: moment().subtract(19, 'year'),
    role: 'admin',
    skills: []
  },
  {
    id: Guid.newGuid(),
    firstname: 'test5',
    lastname: 'test5',
    username: 'test5',
    password: '123456test',
    email: 'test5@gmail.com',
    birthday: moment().subtract(19, 'year'),
    role: 'admin',
    skills: []
  },
  {
    id: Guid.newGuid(),
    firstname: 'test6',
    lastname: 'test6',
    username: 'test6',
    password: '123456test',
    email: 'test6@gmail.com',
    birthday: moment().subtract(19, 'year'),
    role: 'admin',
    skills: []
  },
  {
    id: Guid.newGuid(),
    firstname: 'test7',
    lastname: 'test7',
    username: 'test7',
    password: '123456test',
    email: 'test7@gmail.com',
    birthday: moment().subtract(19, 'year'),
    role: 'admin',
    skills: []
  },
  {
    id: Guid.newGuid(),
    firstname: 'test8',
    lastname: 'test8',
    username: 'test8',
    password: '123456test',
    email: 'test8@gmail.com',
    birthday: moment().subtract(19, 'year'),
    role: 'admin',
    skills: []
  },
  {
    id: Guid.newGuid(),
    firstname: 'test9',
    lastname: 'test9',
    username: 'test9',
    password: '123456test',
    email: 'test9@gmail.com',
    birthday: moment().subtract(19, 'year'),
    role: 'admin',
    skills: []
  },
  {
    id: Guid.newGuid(),
    firstname: 'test10',
    lastname: 'test10',
    username: 'test10',
    password: '123456test',
    email: 'test10@gmail.com',
    birthday: moment().subtract(19, 'year'),
    role: 'admin',
    skills: []
  }
]