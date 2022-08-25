import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AudioPlayerComponent} from './audio-player/audio-player.component';
import {SharedModule} from "./shared/shared.module";
import {LibraryComponent} from './library/library.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FileListModule} from "./file-list/file-list.module";
import {PlaylistsModule} from "./playlists/playlists.module";
import {CommonComponentsModule} from "./common-components/common-components.module";
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {PlaylistEffects} from "./state/effects/playlist.effects";
import {LibraryEffects} from "./state/effects/library.effects";
import {PlaylistReducer} from "./state/reducers/playlist.reducer";

@NgModule({
  declarations: [
    AppComponent,
    AudioPlayerComponent,
    LibraryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    FileListModule,
    PlaylistsModule,
    CommonComponentsModule,
    StoreModule.forRoot({
      playlist: PlaylistReducer
    }),
    EffectsModule.forRoot([PlaylistEffects, LibraryEffects])
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
