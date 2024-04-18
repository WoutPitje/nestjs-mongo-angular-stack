import { LoginCommand } from './../../../../application/auth/LoginCommand';
import { CommonModule } from '@angular/common';
import { Component, Signal, WritableSignal, computed, effect, signal, model, ModelSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../../domain/entities/User';
import { Error, Result } from '../../../../domain/abstractions/Result';
import { ErrorMessageComponent } from '../../../shared/error-message/error-message.component';
import { Router } from '@angular/router';
import { UserStore } from '../../../../infrastructure/state/UserStore';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ErrorMessageComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: ModelSignal<string> = model('');
  password: ModelSignal<string> = model('');
  loading: WritableSignal<boolean> = this.userStore.loading;
  user: Signal<Result<User> | undefined>;
  errors: Signal<Error[]> = computed(() => {return this.user() ? this.user()!.getErrors() : []})

  constructor(private userStore: UserStore, router: Router, private loginCommand: LoginCommand) {
    this.user = this.userStore.getUser();
    effect(() => {
      if(this.user()?.isSuccess) {
        router.navigate(["/"]);
      }
    })
    this.loginCommand = loginCommand;
  }

  async login() {
    await this.loginCommand.execute({email: this.email(), password: this.password()})
  }

}
