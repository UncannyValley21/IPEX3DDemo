import { Scene, Engine, FreeCamera, Vector3, HemisphericLight, MeshBuilder, StandardMaterial, Texture } from '@babylonjs/core';
import "@babylonjs/loaders/glTF";
import { SelectableObject } from './SelectableObject';
import { InteractionManager } from './InteractionManager';
import { InputManager } from './InputManager';

export function createMainScene(engine: Engine, canvas: HTMLCanvasElement): Scene {

    const scene = new Scene(engine);

    //Setup Camera
    const camera = new FreeCamera('mainCamera', new Vector3(0, 16, -56), scene);
    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvas, true);

    //Basic Scene Details
    new HemisphericLight('light', new Vector3(0, 1, 0), scene);
    const ground = MeshBuilder.CreateGround("Ground", { width: 100, height: 100 }, scene);
    const groundMaterial = new StandardMaterial("GroundGrass_Mat", scene);
    groundMaterial.diffuseTexture = new Texture("assets/SimpleGrass.png", scene);
    ground.material = groundMaterial;

    //SelectableObjects
    const selectableObjects: SelectableObject[] = [];
    selectableObjects.push(new SelectableObject(scene, new Vector3(5, 0, 0), 'assets/SimpleP.glb'));
    selectableObjects.push(new SelectableObject(scene, new Vector3(-5, 0, 0), 'assets/SimpleP.glb'));

    //InteractionManger and InputManager
    const interactionManager = new InteractionManager(scene, selectableObjects);
    const inputManager = new InputManager();

    //Read input from inputManager and updateobjects before renderer
    //x, move objects by vertices in x-axis
    //y, move objects by vertices in y-axis
    //z, move objects by vertices in z-axis
    //spacebar, add new SelectableObject somewhere on the ground
    scene.onBeforeRenderObservable.add(() => {
        if (inputManager.consumeKeyDown('x')) {
            interactionManager.getSelectedObject()?.move(new Vector3(5,0,0));
        }
        else if (inputManager.consumeKeyDown('y')) {
            interactionManager.getSelectedObject()?.move(new Vector3(0,5,0));
        }
        else if (inputManager.consumeKeyDown('z')) {
            interactionManager.getSelectedObject()?.move(new Vector3(0,0,5));
        }
        else if (inputManager.consumeKeyDown(" ")) {
            selectableObjects.push(new SelectableObject(scene, new Vector3(Math.round(Math.random() * 100 - 50),0, Math.round(Math.random() * 100 - 50)), 'assets/SimpleP.glb'));
        }
    });
    return scene;
}