import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
  HttpEventType,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  sucessMessage: string = "All it's OK!";

  constructor(private toastrService: ToastrService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = req;

    return next.handle(req).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          if (evt.status === 200 && req.method != "GET") {
            if (url.endsWith("/users/create") && method === "POST") {
              this.sucessMessage = "User created successfully!";
            }

            if (url.endsWith("/users/update") && method === "PUT") {
              this.sucessMessage = "User updated successfully!";
            }

            if (
              url.match(
                /\/users\/(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}/
              ) &&
              method === "DELETE"
            ) {
              this.sucessMessage = "User deleted successfully!";
            }

            this.toastrService.success(this.sucessMessage);
          }
        }
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          try {
            this.toastrService.error(err.message);
          } catch (e) {
            this.toastrService.error("An error occurred");
          }
          //log error
        }
        return of(err);
      })
    );
  }
}
