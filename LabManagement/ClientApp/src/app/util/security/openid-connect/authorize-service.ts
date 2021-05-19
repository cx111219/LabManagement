// ============== OpenId Connect授权服务 ==========
// Copyright 2019 何镇汐
// Licensed under the MIT license
// ================================================
import { Injectable } from '@angular/core';
import { User, UserManager } from 'oidc-client';
// import { HttpMethod } from '../../index';
import { Util as util} from 'src/app/util/util';
import { AuthorizeConfig } from './authorize-config';
import {UserInfo} from '../userInfo';
import { HttpMethod } from '../../angular/http-helper';

/**
 * OpenId Connect授权服务
 */
@Injectable()
export class AuthorizeService {
    /**
     * 用户服务
     */
    private manager: UserManager;

    /**
     * 初始化
     * @param config 授权配置
     */
    constructor( private config: AuthorizeConfig) {
        this.manager = new UserManager( this.getConfig() );
    }

    /**
     * 获取配置
     */
    private getConfig() {
        this.config.validate();
        let authConfig = {
            authority: this.config.authority,
            client_id: this.config.clientId,
            response_type: this.config.responseType,
            scope: this.config.scope,
            redirect_uri: this.config.getRedirectUri(),
            post_logout_redirect_uri: this.config.getPostLogoutRedirectUri()
        }
        return authConfig;
    }

    /**
     * 是否认证成功
     * @param user 用户
     */
    isAuthenticated( user: User ) {
        return user && user.profile && user.profile["sub"];
    }

    /**
     * 登录，重定向到认证服务进行登录操作
     */
    login( url?) {
        this.manager.signinRedirect( { state: url } );
    }

  /**
   * 登录回调
   * @param options OpenId Connect认证登录回调配置
   */
  async loginCallback( options: IOidcLoginCallbackOptions = null ) {
    options = options || {};
    let user = await this.manager.signinRedirectCallback();

    if ( this.isAuthenticated( user ) ) {
      await this.setTenantUser(options,user);
    } else {
      this.loginFail( options );
    }
  }

   async setTenantUser(options: IOidcLoginCallbackOptions, user: User) {
      const postData = { code: user.profile["name"],name: user.profile["name"] };
      util.webapi.send<UserInfo>( "/api/user/info",HttpMethod.Post,postData).handle( {
        ok: (result) => {
          this.loginSuccess(options,user,result);
        }
      } );
    }

  /**
   * 登录成功处理
   */
  private loginSuccess( options: IOidcLoginCallbackOptions, user: User,userInfo: UserInfo ) {
    if ( options.ok ) {
      options.ok( user );
    }
    let redirectUrl = "/";

    sessionStorage.setItem('userHomeUri',userInfo&&userInfo.homeUri?userInfo.homeUri:'');
    sessionStorage.setItem('roleCode',userInfo&&userInfo.roleCode?userInfo.roleCode:'');

    if (userInfo && !!userInfo.roleId&& !!userInfo.homeUri) {
      //redirectUrl = userInfo.homeUri;
    } else if(!!user.state) {
      redirectUrl = user.state;
    }
    
    if(user.state == '/xblockdemopackage'){
      util.router.navigate( ['/xblockdemopackage'] );
      return;
    }

   // util.router.navigate( [redirectUrl] );

      if(userInfo&&userInfo.roleCode&& userInfo.roleCode =='admin')
        util.router.navigate( [userInfo.homeUri] );
      else
        util.router.navigate( ['/chooseCourse'] );
  }

    /**
     * 登录失败处理
     */
    private loginFail( options: IOidcLoginCallbackOptions ) {
        options.fail && options.fail();
        if ( options.failRedirectUrl )
            util.router.navigate( [options.failRedirectUrl] );
    }

    /**
     * 获取用户信息
     */
    getUser() {
        return this.manager.getUser();
    }

    /**
     * 注销，重定向到认证服务进行登出操作
     */
    logout() {
        this.manager.signoutRedirect();
    }
}

/**
 * OpenId Connect认证登录回调配置
 */
export interface IOidcLoginCallbackOptions {
    /**
     * 登录成功跳转地址,默认值： /
     */
    redirectUrl?: string;
    /**
     * 登录失败跳转地址
     */
    failRedirectUrl?: string;
    /**
     * 登录成功处理函数
     * @param user 用户信息
     */
    ok?: ( user: User ) => void;
    /**
     * 提交失败处理函数
     */
    fail?: () => void;
}
