import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UsersService {

  constructor(private http: HttpClient) {
  }

  getUsers() {
    return this.http.get<any>(`api/users`)
      .pipe(map(users => {
        return users;
      }));
  }

  getUserById(id: number) {
    return this.http.get<any>(`api/users/` + id)
      .pipe(map(user => {
        return user;
      }));
  }

  create(user: User) {
    return this.http.post<User>(`api/users/create`, user)
      .pipe(map(user => {
        return user;
      }));
  }

  update(user: User) {
    return this.http.post<User>(`api/users/update`, user)
      .pipe(map(user => {
        return user;
      }));
  }

  delete(id: string) {
    return this.http.delete<User>(`api/users/` + id)
      .pipe(map(user => {
        return user;
      }));
  }

}