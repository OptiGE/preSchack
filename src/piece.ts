import * as BABYLON from 'babylonjs'

import { Coordinate, PieceValue } from './gamestate/gamestateTypes'
import { AbsPosition, boardSize } from './chess-types'

export default class Piece {
    private scene: BABYLON.Scene;
    private position: Coordinate;
    private pieceValue: PieceValue;
    private mesh: BABYLON.Mesh;
    private selected: boolean;
    private material: BABYLON.StandardMaterial;

    constructor (position: Coordinate, pieceValue: PieceValue, scene: BABYLON.Scene) {
      this.scene = scene
      this.position = position
      this.pieceValue = pieceValue
      this.createPiece()
    }

    public deleteMesh (): void {
      this.mesh.dispose()
    }

    private movePiece (): void {
      const absPos = this.getAbsCoord(this.position)

      this.mesh.position.x = absPos.x
      this.mesh.position.z = absPos.z
    }

    private createPiece (): void {
      let height = boardSize / 20

      switch (this.pieceValue.charAt(1)) {
        case 'p':
          height = boardSize / 20
          this.mesh = BABYLON.MeshBuilder.CreateBox('gray', { height: height, width: boardSize / 20, depth: boardSize / 20 }, this.scene)
          break
        case 'r':
          height = boardSize / 10
          this.mesh = BABYLON.MeshBuilder.CreateBox('gray', { height: height, width: boardSize / 14, depth: boardSize / 14 }, this.scene)
          break
        case 'b':
          height = boardSize / 10
          this.mesh = BABYLON.MeshBuilder.CreatePolyhedron('gray', { type: 1, size: boardSize / 25 }, this.scene)
          break
        case 'k':
          height = boardSize / 30
          this.mesh = BABYLON.MeshBuilder.CreateTorus('gray', { diameter: boardSize / 15, thickness: boardSize / 30 }, this.scene)
          break
        case 'K':
          height = boardSize / 6
          this.mesh = BABYLON.MeshBuilder.CreateBox('gray', { height: height, width: boardSize / 20, depth: boardSize / 20 }, this.scene)
          break
        case 'q':
          height = boardSize / 5
          this.mesh = BABYLON.MeshBuilder.CreateCylinder('gray', { height: height, diameterBottom: boardSize / 10, diameterTop: boardSize / 35 }, this.scene)
          break
        default:
          console.error('Undefined piece type')
          break
      }

      this.material = new BABYLON.StandardMaterial("ground", this.scene);
      this.material.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
      this.material.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
      if(color == "w")       this.material.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
      else if (color == "b") this.material.emissiveColor = new BABYLON.Color3(0.02, 0.02, 0.02);
      this.mesh.material = this.material;
      this.mesh.position.y = height/2;
      
      this.movePiece()
    }

    private getAbsCoord (coordinate: Coordinate): AbsPosition {
      const cornerxz = (boardSize / 2) - (boardSize / 16)
      const tileSize = boardSize / 8

      const abspos: AbsPosition = {
        x: cornerxz - tileSize * (this.getNumFromLetter(coordinate.charAt(0)) - 1),
        z: cornerxz - tileSize * (parseInt(coordinate.charAt(1)) - 1)
      }

      return abspos
    }

    private getNumFromLetter (l: string) : number {
      return l.toLowerCase().charCodeAt(0) - 97 + 1
    }

    toggleSelect(){
        let selectedMaterial = new BABYLON.StandardMaterial("ground", this.scene);
        selectedMaterial.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
        selectedMaterial.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
        selectedMaterial.emissiveColor = new BABYLON.Color3(1, 0.3, 0.3);

        if (this.selected){
            this.mesh.material = this.material
            this.selected = false;
        }else{
            this.mesh.material = selectedMaterial;
            this.selected = true;
        }
    }

}
