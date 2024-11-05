import {AfterViewInit, Component, QueryList, ViewChild, ViewChildren} from "@angular/core";

@Component({
  selector: 'custom-card-header',
  template: `

  `,
  standalone: true
})
export class CustomCardHeader {
  text!: string;
}

@Component({
  selector: 'custom-card-action',
  template: `

  `,
  standalone: true
})
export class CustomCardAction {
  text!: string;
}

@Component({
  selector: 'custom-card',
  template: `
    <custom-card-header>Visit sunny California!</custom-card-header>
    <custom-card-action>Save</custom-card-action>
    <custom-card-action>Cancel</custom-card-action>
  `,
  imports: [
    CustomCardHeader,
    CustomCardAction
  ],
  standalone: true
})
export class CustomCard implements AfterViewInit {
  /*
  By setting static: true, you guarantee to Angular that the target of this query is always present and is not conditionally rendered. This makes the result available earlier, in the ngOnInit lifecycle method.

Static query results do not update after initialization.

The static option is not available for @ViewChildren and @ContentChildren queries.

@ViewChild and @ContentChild queries accept the static option.


   */
  @ViewChild(CustomCardHeader, {static: true}) header!: CustomCardHeader;
  @ViewChildren(CustomCardAction) actions!: QueryList<CustomCardAction>;

  ngAfterViewInit() {
    console.log(this.header.text);

    this.actions.forEach(action => {
      console.log(action.text);
    });
  }

}
