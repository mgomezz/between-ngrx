import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgSelectModule } from "@ng-select/ng-select";
import { BootstrapModule } from "./bootstrap.module";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";
import { AppHttpInterceptor } from "./interceptors/http.interceptor";
import { UsersService } from "./services/users.service";
import { BsDatepickerModule } from "ngx-bootstrap";
import { LoaderService } from "./services/loader.service";
import { LoaderInterceptor } from "./interceptors/loader.interceptor";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    BootstrapModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    LoaderService,
    UsersService,
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  exports: [
    FormsModule,
    BootstrapModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    BsDatepickerModule,
    HttpClientModule,
    ToastrModule,
  ],
})
export class SharedModule {}
