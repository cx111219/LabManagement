import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//业务功能组件
import { GroupListComponent } from "./group/group-list.component";

// 路由配置
const routes: Routes = [
    {
      path: '',
      children: [
        { path : '' , component : GroupListComponent}
      ]
    }
  ];
  
  /**
   * systems路由模块
   */
  @NgModule({
    imports: [RouterModule.forChild(routes)]
  })
  export class BizRoutingModule { }
  