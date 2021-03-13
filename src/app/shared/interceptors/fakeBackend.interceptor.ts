import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from '../models/user';
import * as moment from 'moment';
import { defaultUsers } from './users.data';

let users: Array<User> = JSON.parse(localStorage.getItem('users')) || defaultUsers;

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/users/create') && method === 'POST':
          return createUser();
        case url.endsWith('/users/update') && method === 'POST':
          return updateUser();
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        case url.match(/\/users\/(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}/) && method === 'GET':
          return getUserById();
        case url.match(/\/users\/(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}/) && method === 'DELETE':
          return deleteUser();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function authenticate() {
      const { username, password } = body;
      const user = users.find(x => x.username === username && x.password === password);
      if (!user) return error('Username or password is incorrect');
      return ok({
        id: user.id,
        username: user.username,
        firstName: user.firstname,
        lastName: user.lastname,
        token: 'fake-jwt-token'
      })
    }

    function createUser() {
      try {
        const user = body;
        if (users.find(x => x.username === user.username)) {
          return error("User exist");
        }
        users = [...users, user];
        localStorage.setItem('users', JSON.stringify(users));
        return ok();
      } catch (err) {
        return error(err);
      }
    }

    function updateUser() {
      let user = body;
      users = users.map(u => {
        if (u.id == user.id) {
          u = user;
        }
        return u;
      });
      localStorage.setItem('users', JSON.stringify(users));

      return ok();
    }

    function getUsers() {
      //if (!isLoggedIn()) return unauthorized();
      return ok(users);
    }

    function getUserById() {
      //if (!isLoggedIn()) return unauthorized();
      let user = users.find(x => x.id === idFromUrl());
      return !!user ? ok(user) : error("User not found");
    }

    function deleteUser() {
      //if (!isLoggedIn()) return unauthorized();

      users = users.filter(x => x.id !== idFromUrl());
      localStorage.setItem('users', JSON.stringify(users));
      return ok();
    }

    // helper functions

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }))
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function conflict() {
      return of(new HttpResponse({ status: 409, body: { message: 'User exist' } }))
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return urlParts[urlParts.length - 1];
    }

  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};