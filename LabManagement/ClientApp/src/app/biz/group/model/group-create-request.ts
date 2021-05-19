import { ViewModel } from '../../../../app/util';

/**
 * 班级视图模型
 */
export class GroupCreateRequest extends ViewModel {
  /**
   * 班级标识
   */
  id: string;
  /**
   * 班级名称
   */
  name: string;
  /**
   * 班级编码
   */
  code: string;
  /**
  * 知道老师
  */
  userId: string;
  /**
   * 说明
   */
  remark: string;
  /**
   * 创建时间
   */
  creationTime: Date;
  /**
   * 最后修改人
   */
  creatorId: string;
  /**
   * 版本号
   */
  version: any;
}

