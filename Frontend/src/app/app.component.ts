import { LocalStorageThemeCommand } from './application/company/LocalStorageThemeCommand';
import { FetchCurrentCompanyCommand } from './application/company/FetchCurrentCompanyCommand';
import { localStorageLoginCommand } from './application/auth/LocalStorageLoginCommand';
import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TokenStorage } from './infrastructure/localStorage/TokenStorage';
import { CommonModule } from '@angular/common';
import { CompanyStore } from './infrastructure/state/CompanyStore';
import { UserStore } from './infrastructure/state/UserStore';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: '<div *ngIf="!loading()" class="min-h-dvh" [attr.data-theme]="theme()"><router-outlet ></router-outlet></div><span class="absolute text-md text-content opacity-50 bottom-1 right-1">Beta versie</span>',
})
export class AppComponent{
  title = 'appname';

  defaultTheme = signal("business")
  loading = signal(false)
  theme = computed(() => {
    return this.companyStore.theme()
  })
  token = this.userStore.token;
  user = this.userStore.user;

  constructor(
    private fetchCurrentCompanyCommand: FetchCurrentCompanyCommand,
    private localStorageThemeCommand: LocalStorageThemeCommand,
    private companyStore: CompanyStore,
    private userStore: UserStore,
  )
  {
    localStorageLoginCommand();
    this.localStorageThemeCommand.execute();
    effect(() => {
      if(this.user()?.value?.companyId, this.token().isSuccess) {
        this.fetchCurrentCompanyCommand.execute();
      }
    });

  }
}
