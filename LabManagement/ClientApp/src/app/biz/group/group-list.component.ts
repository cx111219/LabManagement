import { Component, Injector } from '@angular/core';
import { TableQueryComponentBase } from '../../util';
import { GroupQuery } from './model/group-query';
import { GroupViewModel } from './model/group-view-model';
import { GroupEditComponent } from './group-edit.component';
import { GroupCreateComponent } from './group-create.component';
import { GroupDetailComponent } from './group-detail.component';

/**
 * 组首页
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'group-list',
    templateUrl: './html/group-list.component.html',
    styleUrls: ['./css/groupList.css']
})
export class GroupListComponent extends TableQueryComponentBase<GroupViewModel, GroupQuery>  {
  /**
   * 初始化组首页
   * @param injector 注入器
   */
  constructor(injector: Injector) {
      super(injector);
  }

  expand: boolean= false;
  /**
   * 获取创建弹出框组件
   */
  getCreateDialogComponent() {
    return GroupCreateComponent;
  }

  /**
   * 获取详情弹出框组件
   */
  getDetailDialogComponent() {
    return GroupDetailComponent;
  }
  /**
   * 获取修改弹出框组件
   */
  getEditDialogComponent(){
    return GroupEditComponent;
  }

  /**
   * 创建查询参数
   */
  protected createQuery() {
    return new GroupQuery();
  }

  protected getBaseUrl() {
    return "group";
  }

  getCreateDialogWidth() {
    return '32%';
  }

  getEditDialogWidth() {
    return '32%';
  }

  getDetailDialogWidth() {
    return '40%';
  }

  /**
   * 打开学生设置弹出框
   */
  openUserDialog( group ) {
   
  }

}
