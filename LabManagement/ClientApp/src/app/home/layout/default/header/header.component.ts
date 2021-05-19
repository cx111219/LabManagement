import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SettingsService } from '@delon/theme';
import { SelectItem, Session, OidcAuthorizeService } from 'src/app/util';
import { Util as util } from 'src/app/util/util';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  searchToggleStatus: boolean;
  courseList : SelectItem[] = []; // 课程
  courseId = null;
  courseName:string = null; // 课程名称
  homePageUrl:string = null;
  isExitCourseVisable:boolean = false;
  isHomePageVisable:boolean = false;

  constructor(public settings: SettingsService,private session:Session, private service: OidcAuthorizeService) {

  }

  ngOnInit(){
    var courseInfo = Session.getChoosenCourse();
    this.courseName = courseInfo?courseInfo.curChoosenCourseName:'';
    this.homePageUrl = courseInfo?courseInfo.curChoosenCourseHomePageUrl:'';
    this.isExitCourseVisable = courseInfo?courseInfo.isExitCourseVisable:false;
    this.isHomePageVisable = courseInfo?courseInfo.isHomePageVisable:false;
  }

  // 课程更改
  changeCourse(){
    util.router.navigate( ['/chooseCourse'] );
  }

  //回到课程主页
  redirectToHomePage(){
    util.router.navigate([`/courseHomePage`],{
      queryParams:{
        homePageUrl:`${this.homePageUrl}`
      }
     });
  }

  toggleCollapsedSidebar() {
    this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
  }

  searchToggleChange() {
    this.searchToggleStatus = !this.searchToggleStatus;
  }


  /**
   * 退出系统
   */
  logout() {
    this.service.logout();
    this.clearSession();
  }

  clearSession(){
    sessionStorage.removeItem('curChoosenCourseInfo');
    sessionStorage.removeItem('curChoosenMenuType');
    sessionStorage.removeItem('roleCode');
    sessionStorage.removeItem('userHomeUri');
  }

  changeUserInfo(){
    util.dialog.open({
      // title:'更改用户信息',
      component: null,
      width: "32%",
      disableClose: true,
      showFooter:false
    });
  }

}
