import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SettingsService } from '@delon/theme';
import { StartupService } from "../../../startup/startup.service";

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'layout-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
    constructor( public settings: SettingsService, private startupService: StartupService) { }

    /**
     * 初始化
     */
    ngOnInit() {
        this.startupService.load();
    }
}
