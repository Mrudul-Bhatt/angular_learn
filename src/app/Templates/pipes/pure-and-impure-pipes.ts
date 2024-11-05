import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'purePipe',
  standalone: true,
})
export class PurePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
  }
}

@Pipe({
  name: 'impurePipe',
  standalone: true,
  pure: false // Makes this pipe impure
})
export class ImpurePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
  }
}


/*

Pure vs Impure Pipes

Pure Pipes (default): Only re-evaluate when the input value or reference changes, which ensures optimized performance.
Impure Pipes: Re-evaluate on every change detection cycle, which can affect performance but is useful for complex or dynamic data sources.


 */
