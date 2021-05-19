import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OidcAuthorize as Authorize } from "./util";
import { LoginCallbackComponent } from "./login-callback.component";
import { LayoutDefaultComponent } from './home/layout/default/default.component';

// 功能模块
import { GroupListComponent } from "../app/biz/group/group-list.component"

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    canActivate: [Authorize],
    canActivateChild: [Authorize],
    children: [
      { path: '', component : GroupListComponent},
    ]
  },
  { path: 'callback', component: LoginCallbackComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
