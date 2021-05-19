// ============== 用户会话 ========================
// Copyright 2018 何镇汐
// Licensed under the MIT license
// ================================================
import { Injectable } from '@angular/core';
import { uuid } from '../common/helper';

/**
 * 用户会话
 */
@Injectable(
    {
        providedIn:'root'
    }
)
export class Session {
    /**
     * 初始化
     */
    constructor() {
        this.sessionId = uuid();
    }
    /**
     * 会话标识
     */
    sessionId;
    /**
     * 是否认证
     */
    isAuthenticated;
    /**
     * 用户标识
     */
    userId;
    /**
     * 用户名称
     */
    name;
    /**
     * 认证token类型
     */
    token_type;
    /**
     * 认证token
     */
    token;
    /**
     * 当前选择的课程Id
     */
    static curChoosenCourseId:string;
    /**
     * 当前选择的课程Name
     */
    static curChoosenCourseName:string;
    /**
     * 当前选择的菜单套类型
     */
    static curChoosenMenuType:string;
    /**
     * 当前选择的系统主页Url
     */
    static curChoosenCourseHomePageUrl:string;
    /**
     * 当值为true时表示大于一门课程，进入系统后右上角菜单【退出课程】显示，点击后跳转到选课页面
     */
    static isExitCourseVisable:boolean;
    /**
     * 当值为true时表示当前选择的系统有课程主页
     */
    static isHomePageVisable:boolean;
    /**
     * 设置当前选择的课程信息
     * session在页面进行刷新时会调用后台接口重新获取并生成，会导致前端的选课信息丢失
     * 因此，选课信息放在浏览器的SessionStorage中进行存储
     */
    public static setChoosenCourse(choosenCourseId:string,curChoosenCourseName:string,curChoosenCourseHomePageUrl:string,
            isExitCourseVisable:boolean = false,isHomePageVisable:boolean = false){
        sessionStorage.setItem('curChoosenCourseInfo',JSON.stringify({
            curChoosenCourseId:choosenCourseId,
            curChoosenCourseName:curChoosenCourseName,
            curChoosenCourseHomePageUrl:curChoosenCourseHomePageUrl,
            isExitCourseVisable:isExitCourseVisable,
            isHomePageVisable:isHomePageVisable
        }));

        Session.curChoosenCourseId = choosenCourseId,
        Session.curChoosenCourseName = curChoosenCourseName;
        Session.curChoosenCourseHomePageUrl = curChoosenCourseHomePageUrl;
        Session.isExitCourseVisable = isExitCourseVisable;
        Session.isHomePageVisable = isHomePageVisable;
    }

    /**
     * 获取当前选择的课程信息
     */
    public static getChoosenCourse(){
        if(Session.curChoosenCourseId || Session.curChoosenCourseName){
            return {
                curChoosenCourseId:Session.curChoosenCourseId,
                curChoosenCourseName:Session.curChoosenCourseName,
                curChoosenCourseHomePageUrl:Session.curChoosenCourseHomePageUrl,
                isExitCourseVisable:Session.isExitCourseVisable,
                isHomePageVisable:Session.isHomePageVisable
            }
        }
        else{
            return JSON.parse(sessionStorage.getItem('curChoosenCourseInfo'));
        }
    }

    /**
     * 设置当前选择的菜单套
     */
    public static setChoosenMenuType(curChoosenMenuType){
        sessionStorage.setItem('curChoosenMenuType',curChoosenMenuType);
    }

    /**
     * 获取当前选择的菜单套
     */
    public static getChoosenMenuType(){
        let menuType = sessionStorage.getItem('curChoosenMenuType');
        return menuType?Number.parseInt(menuType):0;
    }

}
