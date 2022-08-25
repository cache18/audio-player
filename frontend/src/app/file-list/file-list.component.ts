import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClientService} from "../shared/http-client.service";
import {MusicMetaData} from "../shared/model/music-meta-data";
import {delay, interval, lastValueFrom, of, Subscription} from "rxjs";
import {Order} from "./order";
import {Repeat} from "./repeat";
import {AudioData} from "../shared/model/audio-data";
import {HistoryService} from "./service/history.service";
import {ScrollService} from "./service/scroll.service";
import {Store} from "@ngrx/store";
import {PlaylistDetails} from "../playlists/playlists.component";

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit, OnDestroy {

  private progressSubscription: Subscription;
  private playingOrder: Order;
  private playingRepeat: Repeat;

  audio: HTMLAudioElement;
  showSoundVolume: boolean;
  order = Order;
  repeat = Repeat;
  _progress: number;
  playing: boolean;
  selectedRow: MusicMetaData;
  playingRow: MusicMetaData;
  files: MusicMetaData[];
  columnsToDisplay = ['trackNumber', 'title', 'album', 'artist', 'genre', 'duration'];

  constructor(private httpClientService: HttpClientService,
              private scrollService: ScrollService,
              private store: Store<{playlist: PlaylistDetails[]}>,
              private historyService: HistoryService) {
  }

  ngOnInit(): void {
    this.showSoundVolume = false;
    this.playingOrder = Order.RANDOM;
    this.playingRepeat = Repeat.ALL;
    this._progress = 0;
    this.audio = new Audio();
    this.audio.volume = 0.2;

    this.store.select('playlist').subscribe(p => {
      let newFiles = p.find(p => p.active)?.files;
      this.files = newFiles || [];
    })
  }

  ngOnDestroy() {
    this.progressSubscription.unsubscribe();
  }

  markSelected(selectedRow: MusicMetaData) {
    this.selectedRow = selectedRow;
    this.selectWithClass('selected-row');
  }

  markPlaying(playingRow: MusicMetaData) {
    this.playingRow = playingRow;
    this.selectWithClass('playing-row');
  }

  private selectWithClass(cssClass: string) {
    of(([])).pipe(
      delay(100)
    ).subscribe(async () => {
      const elem: Element = document.getElementsByClassName(cssClass)[0];
      await this.scrollService.scroll(elem);
    });
  }

  play(selectedRow: MusicMetaData) {
    this.next(selectedRow);
  }

  private async startPlaying() {
    const audioData: AudioData = await lastValueFrom(this.httpClientService.getAudioData(this.playingRow.path));
    this.audio.pause();

    this._progress = 0;
    this.audio.src = 'data:audio/mp3;base64,' + audioData.base64Content;
    this.audio.load();
    await this.audio.play();

    this.audio.addEventListener('ended', () => {
      this.next();
    })

    this.startUpdatingProgress();

    this.playing = true;
  }

  private startUpdatingProgress() {
    this.progressSubscription = interval(1000).subscribe(() => {
      this._progress = Math.round((this.audio.currentTime / this.playingRow.duration) * 100);
      if (this._progress === 100) {
        this.stopUpdatingProgress();
      }
    });
  }

  get progress() {
    return this._progress;
  }

  set progress(newVal) {
    this._progress = newVal;
    this.updateAudioCurrentTime(newVal);
  }

  private updateAudioCurrentTime(newVal: number) {
    this.audio.currentTime = this.playingRow.duration * (0.01 * newVal);
  }

  private stopUpdatingProgress() {
    this.progressSubscription.unsubscribe();
    this.progressSubscription = null;
  }

  previous() {
    let index = this.historyService.previousMusic();
    if (index >= 0) {
      const previousMusic = this.files[index];
      this.markPlaying(previousMusic);
      this.startPlaying();
    }
  }

  next(nextMusic?: MusicMetaData) {
    if (!nextMusic) {
      const nextMusicIdx = this.nextMusic();
      nextMusic = this.files[nextMusicIdx];
    }
    this.markPlaying(nextMusic);

    const currentMusicIndex = this.files.indexOf(this.playingRow);
    this.historyService.updateHistory(currentMusicIndex);

    this.startPlaying();
  }

  private nextMusic(): number {
    if (!this.playingRow) {
      return null;
    }

    let historyIdx = this.historyService.nextMusic();
    if (historyIdx > -1) {
      return historyIdx;
    }

    if (this.playingOrder === Order.RANDOM) {
      return this.getRandomInt();
    }

    let currentIndex = this.files.indexOf(this.playingRow);
    if (currentIndex === this.files.length - 1) {
      currentIndex = -1;
    }

    return currentIndex + 1;
  }

  private getRandomMusic() {
    return this.files[this.getRandomInt()];
  }

  start() {
    if (!this.selectedRow) {
      this.play(this.getRandomMusic());
    } else {
      this.audio.play();

      this.startUpdatingProgress();
    }
    this.playing = true;
  }

  stop() {
    this.playing = false;
    this.audio.pause();

    this.progressSubscription.unsubscribe();
    this.progressSubscription = null;
  }

  private getRandomInt() {
    const min = 0;
    const max = Math.floor(this.files.length);
    return Math.floor(Math.random() * (max - min) + min);
  }

  get playingTime() {
    return this.audio?.currentTime || 0;
  }

  setOrder(newOrder: Order) {
    this.playingOrder = newOrder;
  }

  isOrder(ord: Order) {
    return this.playingOrder === ord;
  }

  setRepeat(newRepeat: Repeat) {
    this.playingRepeat = newRepeat;
  }

  getRepeat(r: Repeat) {
    return this.playingRepeat === r;
  }
}
