import {Component, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  standalone: true,
  name: 'titleCase'
})
export class TitleCasePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    return value
      .split(' ')
      .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}


@Component({
  selector: 'custom-pipe',
  template: `
    <p>{{ 'angular custom pipes' | titleCase }}</p> <!-- Output: Angular Custom Pipes -->
  `,
  imports: [
    TitleCasePipe
  ],
  standalone: true
})
export class CustomPipeComponent {

}
