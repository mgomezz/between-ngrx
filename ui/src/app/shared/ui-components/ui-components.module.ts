import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { SharedModule } from "../shared.module";
import { RouterModule } from "@angular/router";
import { ShowErrorsComponent } from "./show-errors/show-errors.component";
import { ConfirmModalComponent } from "./confirm-modal/confirm-modal.component";
import { ModalModule } from "ngx-bootstrap";

@NgModule({
  declarations: [HeaderComponent, ShowErrorsComponent, ConfirmModalComponent],
  imports: [CommonModule, SharedModule, RouterModule, ModalModule.forRoot()],
  exports: [HeaderComponent, ShowErrorsComponent, ConfirmModalComponent],
  entryComponents: [ConfirmModalComponent],
})
export class UiComponentsModule {}
