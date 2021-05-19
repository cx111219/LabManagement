import { QueryParameter } from '../../../../app/util';


/**
 * 组查询参数
 */
export class GroupQuery extends QueryParameter {
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
}

