import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

// Ant Design模块
import { AlainThemeModule } from '@delon/theme';

// 图标设置
import { NZ_ICONS } from 'ng-zorro-antd';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
const icons: IconDefinition[] = Object.keys(AllIcons).map(key => AllIcons[key]);

// 框架模块
import { FrameworkModule } from './framework.module';
import { UploadService, createOidcProviders, OidcAuthorizeConfig } from './util';
// 主界面模块
import { HomeModule } from "./home/home.module";
// 启动服务
import { StartupService } from "../app/home/startup/startup.service";
// 授权配置
import { getAuthorizeConfig } from "../app/config/authorize-config";

import { Util as util } from './util/util';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    HomeModule,
    AlainThemeModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    HttpClientModule,
    CommonModule,
    NzPopoverModule,
    FrameworkModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    StartupService,
    { provide: OidcAuthorizeConfig, useFactory: getAuthorizeConfig },
    ...createOidcProviders(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
   /**
   * 初始化应用根模块
   * @param injector 注入器
   */
    constructor( injector: Injector ) {
      util.ioc.injector = injector;
    }
 }
