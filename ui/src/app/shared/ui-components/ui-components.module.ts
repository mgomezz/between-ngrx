import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { SharedModule } from "../shared.module";
import { RouterModule } from "@angular/router";
import { ShowErrorsComponent } from "./show-errors/show-errors.component";

@NgModule({
  declarations: [HeaderComponent, ShowErrorsComponent],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [HeaderComponent, ShowErrorsComponent],
  entryComponents: [],
})
export class UiComponentsModule {}
