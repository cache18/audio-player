import {createAction, props} from "@ngrx/store";
import {MusicMetaData} from "../../shared/model/music-meta-data";
import {PlaylistDetails} from "../../playlists/playlists.component";

export const createNewPlaylist = createAction('[Playlist] create');
export const acceptPlaylist = createAction('[Playlist] accept', props<{id:number, name: string}>());
export const updatePlaylistFiles = createAction('[Playlist] update', props<{files: MusicMetaData[]}>());
export const changePlaylist = createAction('[Playlist] change', props<{id:number}>());
export const savePlaylist = createAction('[Playlist] save', props<{playlist: PlaylistDetails}>());
export const loadPlaylists = createAction('[Playlist] load');
export const replacePlaylists = createAction('[Playlist] replace', props<{playlists: PlaylistDetails[]}>());
export const deletePlaylist = createAction('[Playlist] delete', props<{id: number}>());
