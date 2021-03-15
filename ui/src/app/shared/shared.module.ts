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

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    BootstrapModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    UsersService,
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
  ],
  exports: [
    FormsModule,
    BootstrapModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    HttpClientModule,
    ToastrModule,
  ],
})
export class SharedModule {}
