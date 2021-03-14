import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { User } from "../models/user";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`api/users`).pipe(
      map((users) => {
        return users;
      })
    );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`api/users/` + id).pipe(
      map((user) => {
        return user;
      })
    );
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(`api/users/create`, user).pipe(
      map((user) => {
        return user;
      })
    );
  }

  update(user: User): Observable<User> {
    return this.http.post<User>(`api/users/update`, user).pipe(
      map((user) => {
        return user;
      })
    );
  }

  delete(id: string): Observable<User> {
    return this.http.delete<User>(`api/users/` + id).pipe(
      map((user) => {
        return user;
      })
    );
  }
}
