import { OidcAuthorizeService, Session } from 'src/app/util';

export class TokenConfig {
    static Basement: string = 'BASE_CONFIG';
    static RequestPath: string = 'PATH_CONFIG';
    static TrainingManager: string = 'TRAINING_MANAGER';
    static SessionToken: string = 'SESSION_TOKEN';
    static RouterPath: string = 'ROUTER_CONFIG';
    constructor(private oidcService: OidcAuthorizeService) {
        this.oidcService.getUser().then((res) => {
            sessionStorage.setItem('user', JSON.stringify(res));
        });
    }
}