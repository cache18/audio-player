import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  transform(value: number, minutesDigits: number = 2): string {
    const minutes = Math.floor(value / 60);
    const seconds = Math.round(value - (minutes * 60));
    return FormatTimePipe.format(minutes, minutesDigits) +
      ':' +
      FormatTimePipe.format(seconds, 2);
  }

  private static format(nr: number, digits: number): string {
    return nr.toLocaleString('pl-PL', {
      minimumIntegerDigits: digits
    })
  }

}
