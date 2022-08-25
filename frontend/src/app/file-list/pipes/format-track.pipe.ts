import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTrack'
})
export class FormatTrackPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value ? value.split("/")[0] : '';
  }

}
