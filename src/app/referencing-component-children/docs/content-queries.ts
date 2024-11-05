import {AfterContentInit, Component, ContentChild, ContentChildren, QueryList} from "@angular/core";

@Component({
  selector: 'custom-toggle',
  template: `

  `,
  standalone: true
})
export class CustomToggle {
  text!: string;
}

@Component({
  selector: 'custom-expando',
  template: `

  `,
  standalone: true
})
export class CustomExpando implements AfterContentInit {
  @ContentChild(CustomToggle) toggle!: CustomToggle;

  ngAfterContentInit() {
    console.log(this.toggle.text);
  }
}

@Component({
  selector: 'custom-menu-item',
  template: `

  `,
  standalone: true
})
export class CustomMenuItem {
  text!: string;
}

@Component({
  selector: 'custom-menu',
  standalone: true,
  template: `

  `
})
export class CustomMenu implements AfterContentInit {
  @ContentChildren(CustomMenuItem) items!: QueryList<CustomMenuItem>;

  ngAfterContentInit() {
    this.items.forEach(item => {
      console.log(item.text);
    });
  }
}

@Component({
  selector: 'user-profile',
  standalone: true,
  imports: [
    CustomExpando,
    CustomToggle,
    CustomMenu,
    CustomMenuItem
  ],
  template: `
    <custom-expando>
      <custom-toggle>Show</custom-toggle>
    </custom-expando>
    <custom-menu>
      <custom-menu-item>Cheese</custom-menu-item>
      <custom-menu-item>Tomato</custom-menu-item>
    </custom-menu>
  `
})
export class UserProfile {
}


/*



content queries find only direct children of the component and do not traverse into descendants
 */
