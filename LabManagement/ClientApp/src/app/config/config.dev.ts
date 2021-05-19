/**
 * 配置
 */
export class Config {
  /**
   * 服务器地址
   */
  static frontServerUrl = "http://192.168.10.232:8020";
  /**
   * 认证服务器地址
   */
  //  static authorizeServerUrl = "/oauth";
  static authorizeServerUrl = "http://192.168.1.232:8010";
  /**
   * edX服务器地址
   */
  static edXServerUrl = "";
  /**
   * signalR服务器地址
   */
  static signalRServerUrl = "http://127.0.0.1:8020/hubs/notify"; //"/hubs/notify";
}
