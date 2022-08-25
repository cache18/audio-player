import {createAction, props} from "@ngrx/store";

export const readDirectories = createAction('[Files] read directories');
export const selectDirectoriesDialog = createAction('[Files] select directories', props<{dirs:string[]}>());
export const readFiles = createAction('[Files] read files', props<{files: string[]}>());
