/*

Angular’s Whitespace Handling

By default, Angular removes extra whitespace between HTML elements in templates during compilation. This behavior helps
reduce the overall size of the compiled HTML but may need customization for certain layout needs.

 */

/*
1. Setting preserveWhitespaces at the Component Level
To preserve whitespace in a specific component, use preserveWhitespaces: true in the @Component decorator.
 */

import {Component} from "@angular/core";

@Component({
  selector: 'whitespace-in-template',
  templateUrl: './whitespace-in-template.html',
  styleUrls: ['./whitespace-in-template.scss'],
  standalone: true,
  preserveWhitespaces: true
})
export class CustomToggleComponent {

}


/*
2. Setting preserveWhitespaces Globally in tsconfig.json
To preserve whitespace across all components in your application, you can set preserveWhitespaces to true in your
Angular compiler options (angularCompilerOptions) in tsconfig.json.

{
  "angularCompilerOptions": {
    "preserveWhitespaces": true
  }
}

 */


/*
Why Use &ngsp;?
When working with Angular, sometimes HTML entities like &nbsp; can be difficult to work with directly, especially in
templates where Angular’s whitespace management is active. &ngsp; helps you to:

Preserve space explicitly where needed in templates.
Create non-breaking spaces that aren’t collapsed or removed during whitespace optimization.

<p>Angular makes learning&ngsp;fun!</p>

 */
