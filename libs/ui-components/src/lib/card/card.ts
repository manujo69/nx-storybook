// libs/ui-components/src/lib/card/card.ts
import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-card',
  templateUrl: './card.html',
})
export class Card {
  title = input.required<string>();
}
