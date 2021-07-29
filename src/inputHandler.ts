import { WebXRDefaultExperience } from "babylonjs/XR/webXRDefaultExperience";
import Piece from "./piece"
import { getHumanCoord } from "./coordinateConverter";

export default class InputHandler{
    private currentlySelectedPiece: Piece;

    handleClick(pointerInfo, board, xrHelper){
        switch (pointerInfo.type) {
            case BABYLON.PointerEventTypes.POINTERDOWN:
              console.log("Pointer was clicked down")
              console.log('X: ' + pointerInfo.event.x); 
              if (pointerInfo.pickInfo.hit && pointerInfo.pickInfo.pickedMesh) {
                if (xrHelper.baseExperience.state === BABYLON.WebXRState.IN_XR) {
                  const pointerInfoEvent = pointerInfo.event as PointerEvent // Det här är ett redigt fulhack för att TS är rädd att eventet också kan vara ett WheelEvent. Då kraschar detta.
                  const xrInput = xrHelper.pointerSelection.getXRControllerByPointerId(pointerInfoEvent.pointerId)
                  const motionController = xrInput.motionController
                  if (motionController) {
                    console.log("FOOKEN ASSSNUGGET")
                    //pointerInfo.pickInfo.pickedMesh.setParent(motionController.rootMesh)
                    //console.log('Position on board: ', getHumanCoord(pointerInfo.pickInfo.pickedMesh.position))
                    //const humanCoord = getHumanCoord(pointerInfo.pickInfo.pickedMesh.position)
                    //this.currentlySelectedPiece = board.getPiece(humanCoord)
                    //this.currentlySelectedPiece.toggleSelect()
                  }
                } else {
                  // Här går non-XR support
                }
              }
              break
    
            case BABYLON.PointerEventTypes.POINTERUP:
              //console.log("Pointer was clicked up")
              //console.log('X: ' + pointerInfo.event.x); 
              //this.currentlySelectedPiece.toggleSelect();
              //this.currentlySelectedPiece.removeParents();
              break
          }
    }

}