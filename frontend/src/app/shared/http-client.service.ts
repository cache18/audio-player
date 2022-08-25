import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AudioData} from "./model/audio-data";
import {MusicMetaData} from "./model/music-meta-data";
import {PlaylistDetails} from "../playlists/playlists.component";

@Injectable()
export class HttpClientService {

  constructor(private httpClient: HttpClient) { }

  getAudioData(path: string): Observable<AudioData> {
    return this.httpClient.post<AudioData>('http://localhost:8080/audio/find', path);
  }

  getFileList(path: string): Observable<MusicMetaData[]> {
    return this.httpClient.post<MusicMetaData[]>('http://localhost:8080/library/read', path);
  }

  getDirectories(): Observable<string[]> {
    return this.httpClient.get<string[]>('http://localhost:8080/library/');
  }

  savePlaylist(playlist: PlaylistDetails): Observable<any> {
    return this.httpClient.post('http://localhost:8080/playlists', playlist);
  }

  loadPlaylists(): Observable<PlaylistDetails[]> {
    return this.httpClient.get<PlaylistDetails[]>('http://localhost:8080/playlists');
  }

  deletePlaylist(id: number) {
    return this.httpClient.delete('http://localhost:8080/playlists/' + id);
  }
}
