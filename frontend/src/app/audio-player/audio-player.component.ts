import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClientService} from "../shared/http-client.service";

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit, AfterViewInit {

  private audio: HTMLAudioElement;

  constructor(private httpClientService: HttpClientService) { }

  ngOnInit(): void {
    this.audio = new Audio();
  }

  ngAfterViewInit() {
    this.httpClientService.getAudioData('').subscribe(audioData => {
      this.audio.src = 'data:audio/mp3;base64,' + audioData.base64Content;
      this.audio.load();
    });
  }

  play() {
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

}
