import {NgModule} from "@angular/core";
import {FileListComponent} from "./file-list.component";
import {HistoryService} from "./service/history.service";
import {FormatTimePipe} from "./pipes/format-time.pipe";
import {FormatTrackPipe} from "./pipes/format-track.pipe";
import {MatTableModule} from "@angular/material/table";
import {FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {BrowserModule} from "@angular/platform-browser";
import {MatSliderModule} from "@angular/material/slider";
import { SoundVolumeComponent } from './sound-volume/sound-volume.component';
import {ScrollService} from "./service/scroll.service";

@NgModule({
  declarations: [
    FileListComponent,
    FormatTimePipe,
    FormatTrackPipe,
    SoundVolumeComponent
  ],
    imports: [
        BrowserModule,
        MatTableModule,
        FlexModule,
        MatButtonModule,
        MatProgressBarModule,
        MatSliderModule
    ],
  exports: [
    FileListComponent
  ],
  providers: [
    HistoryService,
    ScrollService
  ]
})
export class FileListModule {

}
