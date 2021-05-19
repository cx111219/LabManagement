import { NgModule } from '@angular/core';
import { BizRoutingModule } from './biz-routing.module';
import { FrameworkModule } from 'src/app/framework.module';

// 路由组件
import { GroupListComponent } from "./group/group-list.component";
// 非路由组件 类似选择组件 

@NgModule({
    declarations: [
        GroupListComponent
    ],
    imports: [
        BizRoutingModule
    ],
    entryComponents: [
    ],
    exports: [
    ],
    providers: []
})
export class BizModule {
}