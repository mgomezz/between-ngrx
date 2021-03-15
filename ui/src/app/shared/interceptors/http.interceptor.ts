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
  constructor(private toastrService: ToastrService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = req;

    return next.handle(req).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          //TODO: handle different success scenarios
          if (evt.status === 200 && req.method != "GET") {
            this.toastrService.success("OK");
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
