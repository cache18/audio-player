import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClientService} from "../shared/http-client.service";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {acceptPlaylist, changePlaylist, createNewPlaylist, deletePlaylist} from "../state/actions/playlist.actions";
import {readDirectories} from "../state/actions/library.actions";
import {FormControl, FormGroup} from "@angular/forms";
import {MusicMetaData} from "../shared/model/music-meta-data";

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit, OnDestroy {

  constructor(private httpClientService: HttpClientService,
              private store: Store<{playlist: PlaylistDetails[]}>) {
  }

  private readonly defaultPlaylistName = 'new playlist';
  private subscription: Subscription;

  editPlaylist: boolean;
  playlists: PlaylistDetails[] = [];
  formGroup: FormGroup;

  ngOnInit(): void {
    this.editPlaylist = false;
    this.formGroup = new FormGroup({
      name: new FormControl(this.defaultPlaylistName)}
    );
    this.store.select('playlist').subscribe(playlists => {
      this.playlists = playlists;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  acceptPlaylist(playlistId: number) {
    this.store.dispatch(acceptPlaylist({
      id: playlistId,
      name: this.formGroup.get('name').value}
    ));
    this.formGroup.get('name').setValue(this.defaultPlaylistName);
  }

  newPlaylist() {
    this.store.dispatch(createNewPlaylist());
  }

  deletePlaylist() {
    let activePlaylist = this.playlists.find(p => p.active);
    this.store.dispatch(deletePlaylist({id: activePlaylist.id}))
  }

  changePlaylist(playlist: PlaylistDetails) {
    this.store.dispatch(changePlaylist({id: playlist.id}));
  }

  selectDir() {
    this.store.dispatch(readDirectories());
  }
}

export interface PlaylistDetails {
  id: number;
  name: string;
  edit: boolean;
  active: boolean;
  files?: MusicMetaData[];
}

