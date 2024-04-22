import { localStorageLoginCommand } from "./application/auth/LocalStorageLoginCommand";
import {
  Component,
  OnInit,
  computed,
  effect,
  inject,
  signal,
} from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TokenStorage } from "./infrastructure/localStorage/TokenStorage";
import { CommonModule } from "@angular/common";
import { UserStore } from "./infrastructure/state/UserStore";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template:
    '<div *ngIf="!loading()" class="min-h-dvh"><router-outlet ></router-outlet></div><span class="absolute text-md text-content opacity-50 bottom-1 right-1">Beta versie</span>',
})
export class AppComponent {
  title = "appname";
  loading = signal(false);
  token = this.userStore.token;
  user = this.userStore.user;

  constructor(private userStore: UserStore) {
    localStorageLoginCommand();
  }
}
