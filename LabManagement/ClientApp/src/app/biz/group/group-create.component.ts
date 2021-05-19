import { Component, Injector } from '@angular/core';
import { DialogEditComponentBase } from '../../util';
import { GroupCreateRequest } from './model/group-create-request';

/**
 * 组编辑
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'group-create',
    templateUrl: './html/group-create.component.html',
    styleUrls: ['./css/create.css']
})
export class GroupCreateComponent extends DialogEditComponentBase<GroupCreateRequest> {
    /**
     * 初始化组件
     * @param injector 注入器
     */
    constructor(injector: Injector) {
        super(injector);
    }

    /**
     * 创建视图模型
     */
    protected createModel() {
        return new GroupCreateRequest;
    }

    /**
     * 获取基地址
     */
    protected getBaseUrl() {
        return "Group";
    }
}
