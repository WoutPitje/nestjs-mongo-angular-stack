import { CommonModule } from "@angular/common";
import { Result } from "../../../domain/abstractions/Result";
import { User } from "../../../domain/entities/User";
import { UserStore } from "../../../infrastructure/state/UserStore";
import { Component, Signal, computed, effect } from "@angular/core";
import { LogoutCommand } from "../../../application/auth/LogoutCommand";

@Component({
  selector: "app-navigation",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./navigation.component.html",
})
export class NavigationComponent {
  user: Signal<Result<User> | undefined> = this.userStore.getUser();
  initials: Signal<string> = computed(() => {
    return (
      this.user()!.value?.firstName.charAt(0) +
      "" +
      this.user()!.value?.lastName.charAt(0)
    ).toUpperCase();
  });

  constructor(
    private userStore: UserStore,
    private logoutCommand: LogoutCommand,
  ) {}

  logout() {
    this.logoutCommand.execute();
  }
}
