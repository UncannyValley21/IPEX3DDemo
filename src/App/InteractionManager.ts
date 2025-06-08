import { Scene, HighlightLayer, Color3 } from '@babylonjs/core';
import { SelectableObject } from './SelectableObject';

export class InteractionManager {
   
    private highlightLayer: HighlightLayer;
    private hoveredObject: SelectableObject | null = null;
    private selectedObject: SelectableObject | null = null;

    constructor(scene: Scene, selectableObjects: SelectableObject[]) {

        this.highlightLayer = new HighlightLayer('hl', scene);
        this.register(scene, selectableObjects);
    }

    private register(scene: Scene, selectableObjects: SelectableObject[]) {

        //Look at the current mousepointer, save current selectedObject and hoverObject, then iterate through the selectableObject list and update highlight
        scene.onPointerObservable.add((pointerInfo) => {

            const pickResult = scene.pick(scene.pointerX, scene.pointerY)

            if (pickResult.hit) {
                for (let selectable of selectableObjects) {
                    if (pickResult.pickedMesh == selectable.mesh) {
                        if (pointerInfo.event.button == 0)
                            this.selectedObject = selectable;
                        else
                            this.hoveredObject = selectable;
                        break;
                    }
                }
            }
            else {

                if (pointerInfo.event.button == 0)
                    this.selectedObject = null;
                else
                    this.hoveredObject = null;
            }

            for (let selectable of selectableObjects) {
                if (this.selectedObject == selectable && selectable.mesh)
                    this.highlightLayer.addMesh(selectable.mesh, Color3.Blue());
                else if (this.hoveredObject == selectable && selectable.mesh)
                    this.highlightLayer.addMesh(selectable.mesh, Color3.White());
                else if (selectable.mesh)
                    this.highlightLayer.removeMesh(selectable.mesh);
            }
        })
    }

    public getSelectedObject(): SelectableObject | null {
        return this.selectedObject;
    }
}