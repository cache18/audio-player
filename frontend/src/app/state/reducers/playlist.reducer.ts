import {createReducer, on} from "@ngrx/store";
import {PlaylistDetails} from "../../playlists/playlists.component";
import {
  acceptPlaylist,
  changePlaylist,
  createNewPlaylist, deletePlaylist,
  replacePlaylists,
  updatePlaylistFiles
} from "../actions/playlist.actions";
import {MusicMetaData} from "../../shared/model/music-meta-data";

export const initialState: PlaylistDetails[] = [];

function copyPlaylists(state:PlaylistDetails[]): PlaylistDetails[] {
  return JSON.parse(JSON.stringify(state));
}

function getPlaylists(state: PlaylistDetails[]) {
  const playlistName = 'new playlist';
  const playlists = copyPlaylists(state);
  playlists.forEach(s => s.active = false);
  playlists.push({
    id: playlists.length + 1,
    name: playlistName,
    edit: true,
    active: true
  });

  return playlists;
}

function updateState(state: PlaylistDetails[], id: number, name: string) {
  let playlists = copyPlaylists(state);
  let playlistDetails = playlists.find(s => s.id === id);
  playlistDetails.name = name;
  playlistDetails.edit = false;
  playlistDetails.active = true;

  return playlists;
}

function changeState(state:PlaylistDetails[], id: any) {
  let playlists = copyPlaylists(state);
  playlists.find(s => s.id === id).active = true;
  playlists.filter(p => p.id !== id).forEach(f => f.active = false);
  return playlists;
}

function updateFiles(state:PlaylistDetails[], files: MusicMetaData[]) {
  let playlists = copyPlaylists(state);
  playlists.find(s => s.active).files = [].concat(files || []);
  return playlists;
}

function deletePlaylistFromState(state:PlaylistDetails[], playlistId: number) {
  let playlists = copyPlaylists(state);
  let toDelete = playlists.indexOf(playlists.find(p => p.id === playlistId));
  if(toDelete > -1) {
    playlists.splice(toDelete, 1);
  }
  return playlists;
}

export const PlaylistReducer = createReducer(
  initialState,
  on(createNewPlaylist, state => getPlaylists(state)),
  on(acceptPlaylist, (state, {id, name}) => updateState(state, id, name)),
  on(changePlaylist, (state, {id}) => changeState(state, id)),
  on(updatePlaylistFiles, (state, {files}) => updateFiles(state, files)),
  on(replacePlaylists, (state, {playlists}) => playlists),
  on(deletePlaylist, (state, {id}) => deletePlaylistFromState(state, id))
);
