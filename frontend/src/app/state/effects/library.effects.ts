import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {MatDialog} from "@angular/material/dialog";
import {HttpClientService} from "../../shared/http-client.service";
import {map, switchMap} from "rxjs";
import {readDirectories, readFiles, selectDirectoriesDialog} from "../actions/library.actions";
import {DirectorySelectComponent} from "../../common-components/directory-select/directory-select.component";
import {updatePlaylistFiles} from "../actions/playlist.actions";
import {MusicMetaData} from "../../shared/model/music-meta-data";

@Injectable()
export class LibraryEffects {

  constructor(private actions$: Actions,
              private dialog: MatDialog,
              private httpClientService: HttpClientService) {
  }

  readDirectories$ = createEffect(() => this.actions$.pipe(
    ofType(readDirectories),
    switchMap(() => this.httpClientService.getDirectories()),
    map((dirs: string[]) => selectDirectoriesDialog({dirs: dirs}))
  ));

  showDialog$ = createEffect(() => this.actions$.pipe(
    ofType(selectDirectoriesDialog),
    switchMap(action => this.showDialog(action.dirs)),
    map((result: string[]) => readFiles({files: result})))
  );

  readFiles$ = createEffect(() => this.actions$.pipe(
    ofType(readFiles),
    switchMap(action => this.httpClientService.getFileList(action.files[0])),
    map((result: MusicMetaData[]) => updatePlaylistFiles({files: result})))
  );

  private showDialog(dirs: string[]) {
    const matDialogRef = this.dialog.open(DirectorySelectComponent, {
      data: {
        dirs
      },
      maxHeight: '90vh'
    });
    return matDialogRef.afterClosed();
  }
}
