import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-validation-error',
  template: `<div>{{ error }}</div>`,
  styles: [
    `
      div {
        margin-top: 0.2rem;
        color: #f2416c;
      }
    `,
  ],
})
export class FormValidationErrorComponent {
  @Input() error: string;
}
