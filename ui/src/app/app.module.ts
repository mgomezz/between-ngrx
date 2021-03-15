import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { environment } from "src/environments/environment";
import { UsersService } from "./shared/services/users.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppHttpInterceptor } from "./shared/interceptors/http.interceptor";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
