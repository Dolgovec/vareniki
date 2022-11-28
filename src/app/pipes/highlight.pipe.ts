import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  transform(value: string, search: string): string {
    if (search) {
      return value?.toString()?.replace(new RegExp(search, 'gi'), '<strong class="highlight">$&</strong>');
    }

    return value;
  }

}
