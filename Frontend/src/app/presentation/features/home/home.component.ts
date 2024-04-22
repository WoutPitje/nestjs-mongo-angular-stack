import { Component, Inject, OnInit, Signal, computed } from "@angular/core";
import { Result } from "../../../domain/abstractions/Result";
import { User } from "../../../domain/entities/User";
import { CommonModule } from "@angular/common";

import { NavigationComponent } from "../../shared/navigation/navigation.component";
import { UserStore } from "../../../infrastructure/state/UserStore";
import { ErrorMessageComponent } from "../../shared/error-message/error-message.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, NavigationComponent, ErrorMessageComponent],
  templateUrl: "./home.component.html",
})
export class HomeComponent {
  user: Signal<Result<User> | undefined>;

  constructor(private userStore: UserStore) {
    this.user = this.userStore.user;
  }
}
