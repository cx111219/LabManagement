import { DialogEditComponentBase } from '../../util';
import { GroupDetailViewModel } from './model/group-detail-view-model';
import {Component, Injector} from '@angular/core';

/**
 * 组详细
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'group-detail',
    templateUrl: './html/group-detail.component.html'
})
export class GroupDetailComponent extends DialogEditComponentBase<GroupDetailViewModel> {
    usersDatasource: any[] = [];
    coursesDatasource: any[] =[];

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
        return new GroupDetailViewModel();
    }

    /**
     * 获取基地址
     */
    protected getBaseUrl() {
        return "group";
    }

    /**
     * 是否远程加载
     */
    isRequestLoad() {
        return false;
    }

    ngAfterViewInit() {
      this.util.webapi.get<any>( `/api/group/${this.model.id}`).handle( {
        ok: result => {
          this.usersDatasource = result.users ? result.users : [];
          this.coursesDatasource = result.courses ? result.courses : [];
        }
      });
    }

}
