import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  template: '<some-unknown-component></some-unknown-component>'
})
export class ComponentWithCustomElements {
}


/*

NO_ERRORS_SCHEMA vs CUSTOM_ELEMENTS_SCHEMA
While CUSTOM_ELEMENTS_SCHEMA permits custom elements, NO_ERRORS_SCHEMA ignores all unknown elements and attributes. NO_ERRORS_SCHEMA is broader, but it can allow unintended typos or errors to go unnoticed, so it’s usually better to use CUSTOM_ELEMENTS_SCHEMA when only custom elements are needed.
 */
