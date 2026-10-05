// apps/angular-app/src/app/app.ts
import { Component } from '@angular/core';
import { Card } from '@nx-workspace/ui-components';

@Component({
  selector: 'app-root',
  imports: [Card],
  templateUrl: './app.html',
})
export class App {
  protected readonly cards = ['Card 1', 'Card 2', 'Card 3'];
}
