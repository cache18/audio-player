import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  createNewPlaylist,
  deletePlaylist,
  loadPlaylists,
  replacePlaylists,
  savePlaylist,
  updatePlaylistFiles
} from "../actions/playlist.actions";
import {map, mergeMap, switchMap} from "rxjs";
import {Store} from "@ngrx/store";
import {HttpClientService} from "../../shared/http-client.service";
import {PlaylistDetails} from "../../playlists/playlists.component";

@Injectable()
export class PlaylistEffects {

  constructor(private actions$: Actions,
              private store: Store<{playlist: PlaylistDetails[]}>,
              private httpClientService: HttpClientService) {
  }

  newPlaylist$ = createEffect(() => this.actions$.pipe(
    ofType(createNewPlaylist),
    mergeMap(() => this.store.select('playlist')),
    map(playlists => playlists.find(s => s.active)),
    map(playlist => savePlaylist({playlist}))
  ));

  savePlaylist$ = createEffect(() => this.actions$.pipe(
    ofType(savePlaylist),
    map((action) => action.playlist),
    switchMap(activePlaylist => this.httpClientService.savePlaylist(activePlaylist))
  ), {
    dispatch: false
  });

  loadPlaylists$ = createEffect(() => this.actions$.pipe(
    ofType(loadPlaylists),
    switchMap(() => this.httpClientService.loadPlaylists()),
    map(playlists => replacePlaylists({playlists}))
  ));

  deletePlaylist$ = createEffect(() => this.actions$.pipe(
    ofType(deletePlaylist),
    map(action => action.id),
    switchMap(id => this.httpClientService.deletePlaylist(id))
  ), {
    dispatch: false
  });

  updatePlaylistFiles$ = createEffect(() => this.actions$.pipe(
    ofType(updatePlaylistFiles),
    mergeMap((action) => this.store.select('playlist')),
    map(playlists => playlists.find(p => p.active)),
    map(playlist => savePlaylist({playlist}))
  ))

}
