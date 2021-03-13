import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { BootstrapModule } from './bootstrap.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

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
    ToastrModule.forRoot()
  ],
  exports: [
    FormsModule,
    BootstrapModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    HttpClientModule,
    ToastrModule
  ]
})
export class SharedModule { }
