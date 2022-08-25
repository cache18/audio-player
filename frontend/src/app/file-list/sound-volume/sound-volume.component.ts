import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sound-volume',
  templateUrl: './sound-volume.component.html',
  styleUrls: ['./sound-volume.component.scss']
})
export class SoundVolumeComponent implements OnInit {

  @Input() audio: HTMLAudioElement;

  constructor() { }

  ngOnInit(): void {
  }

  volumeUp() {
    this.audio.volume = Math.min(this.audio.volume + 0.1, 1.0);
  }

  volumeDown() {
    this.audio.volume = Math.max(this.audio.volume - 0.1, 0.0);
  }
}
