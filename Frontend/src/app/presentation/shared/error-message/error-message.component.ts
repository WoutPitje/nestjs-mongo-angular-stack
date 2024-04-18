import { Component, Input, InputSignal, Signal, input } from '@angular/core';
import { Error } from '../../../domain/abstractions/Result';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-message.component.html',
})
export class ErrorMessageComponent {
  errors: InputSignal<Error[]> = input<Error[]>([]);
}
