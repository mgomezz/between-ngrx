import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { User } from "../models/user";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class UsersService {
  apiURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiURL}/users`).pipe(
      map((users) => {
        return users;
      })
    );
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiURL}/users/${id}`).pipe(
      map((user) => {
        return user;
      })
    );
  }

  create(user: User): Observable<User> {
    return this.http
      .post<User>(`${this.apiURL}/users/create`, { user })
      .pipe(
        map((user) => {
          return user;
        })
      );
  }

  update(user: User): Observable<User> {
    return this.http
      .post<User>(`${this.apiURL}/users/update`, { user })
      .pipe(
        map((user) => {
          return user;
        })
      );
  }

  delete(id: string): Observable<User> {
    return this.http.delete<User>(`${this.apiURL}/users/${id}`).pipe(
      map((user) => {
        return user;
      })
    );
  }
}
