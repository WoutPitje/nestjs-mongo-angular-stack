
import { Component, Inject, OnInit, Signal, computed } from '@angular/core';
import { Result } from '../../../domain/abstractions/Result';
import { User } from '../../../domain/entities/User';
import { CommonModule } from '@angular/common';

import { Company } from '../../../domain/entities/Company';
import { CompanyStore } from '../../../infrastructure/state/CompanyStore';
import { NavigationComponent } from '../../shared/navigation/navigation.component';
import { UserStore } from '../../../infrastructure/state/UserStore';
import { ErrorMessageComponent } from '../../shared/error-message/error-message.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavigationComponent, ErrorMessageComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {

  user: Signal<Result<User> | undefined>
  company: Signal<Result<Company> | undefined>


  constructor(private userStore: UserStore, private companyStore: CompanyStore) {
    this.user = this.userStore.user;
    this.company = this.companyStore.company;
  }
}
