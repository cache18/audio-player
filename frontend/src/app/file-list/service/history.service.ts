import {Injectable} from "@angular/core";

@Injectable()
export class HistoryService {
  private readonly history: Array<number>;
  private playingIndex: number;

  constructor() {
    this.playingIndex = -1;
    this.history = [];
  }

  previousMusic(): number {
    const currentMusicIsFirstInHistory = this.playingIndex < 1;
    if (currentMusicIsFirstInHistory) {
      return -1;
    }

    this.playingIndex--;
    return this.history[this.playingIndex];
  }

  nextMusic() {
    const currentMusicIsInHistory = this.playingIndex < this.history.length - 1;
    if(currentMusicIsInHistory) {
      this.playingIndex++;
      return this.history[this.playingIndex];
    }

    return -1;
  }

  updateHistory(newMusicIndex: number) {
    const playingNotStarted = this.playingIndex < 0;
    const differentCurrentMusic = this.history[this.history.length - 1] != newMusicIndex;
    const currentMusicLastInHistory = this.playingIndex === this.history.length - 1;
    if(playingNotStarted || (currentMusicLastInHistory && differentCurrentMusic)) {
      this.history.push(newMusicIndex);
      this.playingIndex++;
    }
  }
}
