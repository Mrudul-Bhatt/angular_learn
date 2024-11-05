import {Component, ElementRef, ViewChild} from "@angular/core";

@Component({
  selector: "query-locators",
  standalone: true,
  template: `
    <button #save>Save</button>
    <button #cancel>Cancel</button>
  `
})
export class ActionBar {
  @ViewChild('save') saveButton!: ElementRef<HTMLButtonElement>;
}

/*

If more than one element defines the same template reference variable, the query retrieves the first matching element.


 */
