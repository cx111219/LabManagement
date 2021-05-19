import { Component, ChangeDetectionStrategy } from "@angular/core";
import { SettingsService } from "@delon/theme";
import { OidcAuthorizeService } from 'src/app/util';

@Component({
  // tslint:disable-next-line:component-selector
  selector: "header-user",
  template: `
    <nz-dropdown nzPlacement="bottomRight">
      <div
        class="alain-default__nav-item d-flex align-items-center px-sm"
        nz-dropdown
      >
        <nz-avatar
          nzIcon="user"
          nzSize="18" 
          style="color:white;background: #1890ff;"
          class="mr-sm"
        ></nz-avatar>
        {{ settings.user.name }}
      </div>
    </nz-dropdown>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderUserComponent {
  constructor(
    public settings: SettingsService
  ) {}

}
