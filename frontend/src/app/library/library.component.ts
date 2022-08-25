import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {PlaylistDetails} from "../playlists/playlists.component";
import {loadPlaylists} from "../state/actions/playlist.actions";

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  constructor(private store: Store<{ playlist: PlaylistDetails[] }>) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadPlaylists());
  }

}
