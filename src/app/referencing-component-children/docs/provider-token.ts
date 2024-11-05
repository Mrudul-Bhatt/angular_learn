// special-item.component.ts
// custom-list.component.ts
import {Component, ContentChild, InjectionToken} from '@angular/core';

export const SUB_ITEM = new InjectionToken<string>('sub-item');

@Component({
  selector: 'app-special-item',
  template: `<p>Special Item Content</p>`,
  standalone: true,
  providers: [{provide: SUB_ITEM, useValue: 'special-item'}]
})
export class SpecialItem {
}


@Component({
  selector: 'app-custom-list',
  standalone: true,
  template: `
    <div>
      <h3>Custom List</h3>
      <ng-content></ng-content>
      <p>Sub Item Type: {{ subItemType }}</p>
    </div>
  `
})
export class CustomList {
  @ContentChild(SUB_ITEM) subItemType!: string; // Will get 'special-item' from SpecialItem
}


@Component({
  selector: 'app-parent',
  template: `
    <app-custom-list>
      <app-special-item></app-special-item>
    </app-custom-list>
  `,
  standalone: true,
  imports: [
    CustomList,
    SpecialItem
  ]
})
export class Parent {
}
