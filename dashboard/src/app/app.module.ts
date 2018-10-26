import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { AppLayoutComponent } from './layout/layout.component';
import { ChartsComponent } from './charts/charts.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { StackOrdersComponent } from './stack-orders/stack-orders.component';
import { TimeOrdersComponent } from './time-orders/time-orders.component';
import { VolumeOrdersComponent } from './volume-orders/volume-orders.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    ChartsComponent,
    StackOrdersComponent,
    TimeOrdersComponent,
    VolumeOrdersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    NgxChartsModule,
    ReactiveFormsModule

  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
