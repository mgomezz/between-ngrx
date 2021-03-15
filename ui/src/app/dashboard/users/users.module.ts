import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";

import { UsersRoutingModule } from "./users-routing.module";
import { UsersComponent } from "./users.component";
import { UserManagementComponent } from "./components/user-management/user-management.component";
import { SharedModule } from "src/app/shared/shared.module";
import { UsersDatatableComponent } from "./components/users-datatable/users-datatable.component";
import { UiComponentsModule } from "src/app/shared/ui-components/ui-components.module";

@NgModule({
  declarations: [
    UsersComponent,
    UserManagementComponent,
    UsersDatatableComponent,
  ],
  imports: [CommonModule, UsersRoutingModule, SharedModule, UiComponentsModule],
  providers: [DatePipe],
})
export class UsersModule {}
