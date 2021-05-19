import { OidcAuthorizeConfig } from '../util';
import { Config as DevConfig } from "./config.dev";
import { Config as ProdConfig } from "./config.prod";
// import { env } from '../../env';

/**
 * 获取授权配置
 */
export function getAuthorizeConfig() {
    let result = new OidcAuthorizeConfig();
    result.authority = getAuthority(),
    result.clientId = "bsti.vls.client.dev";
    result.scope = "openid profile bsti.vls.api name role";
    return result;
}

/**
 * 获取认证服务器地址
 */
function getAuthority() {
    // if ( env.prod() ) {
    //     return ProdConfig.authorizeServerUrl;
    // }
    return DevConfig.authorizeServerUrl;
}

