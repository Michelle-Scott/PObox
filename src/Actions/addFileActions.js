export const GETALLFILES = "GETALLFILES";
const ipc = window.require("electron").ipcRenderer;

export function addFileToProj(file) {
  ipc.send("addFile", file);

  return dispatch => {
    ipc.on("allFiles", function(event, arg) {
      dispatch({ type: GETALLFILES, payload: arg });
    });
  };
}
export function getAllFiles() {
  ipc.send("getAllFiles");
  return dispatch => {
    ipc.on("allFiles", function(event, arg) {
      dispatch({ type: GETALLFILES, payload: arg });
    });
  };
}