import { Component } from '@angular/core';

@Component({
  selector: 'app-warning-alert',
  template: `<p>This is a warning alert!</p>`,
  styles: [
    `
      p {
        color: red;
        background-color: rosybrown;
        border: 1px solid red;
      }
    `,
  ],
})
export class WarningAlertComponent {}
