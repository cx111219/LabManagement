import { Component, Injector } from '@angular/core';
import { DialogEditComponentBase } from '../../util';
import { GroupViewModel } from './model/group-view-model';

/**
 * 组编辑
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'group-edit',
    templateUrl: './html/group-edit.component.html',
    styleUrls: ['./css/create.css']
})
export class GroupEditComponent extends DialogEditComponentBase<GroupViewModel> {
    /**
     * 初始化组件
     * @param injector 注入器
     */
    constructor(injector: Injector) {
        super(injector);
    }

    /**
     * 获取基地址
     */
    protected getBaseUrl() {
        return "Group";
    }

}
