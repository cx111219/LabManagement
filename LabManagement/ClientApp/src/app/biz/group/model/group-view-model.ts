import { ViewModel } from '../../../../app/util';
/**
 * 组视图模型
 */
export class GroupViewModel extends ViewModel {
  /**
* 班级名称
*/
  name: string;
  /**
   * 班级编号
   */
  code: string;
  /**
   * 指导老师标识
   */
  userId: string;
  /**
   * 指导老师
   */
  teacherName: string;
  /**
   * 说明
   */
  remark: string;
  /**
   * 父标识
   */
  parentId: string;
  /**
   * 层级
   */
  Level: number;
  /**
    * 创建时间
    */
  creationTime: Date;
  /**
   * 创建人
   */
  creatorId: string;
  /**
   * 创建人名称
   */
  creatorName: string
  /**
   * 最后修改时间
   */
  lastModificationTime: Date;
  /**
   * 最后修改人
   */
  lastModifierId: string;
  /**
   * 版本号
   */
  version: any;
  /**
   * 是否删除
   */
  isDeleted: boolean = false;
}

