import { Scene, Engine, FreeCamera, Vector3, HemisphericLight, ImportMeshAsync, Mesh } from '@babylonjs/core';
import "@babylonjs/loaders/glTF";

export function createMainScene(engine: Engine, canvas: HTMLCanvasElement): Scene {
    const scene = new Scene(engine);

    const camera = new FreeCamera('mainCamera', new Vector3(0, 0, -20), scene);
    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvas, true);

    new HemisphericLight('light', new Vector3(0, 1, 0), scene);

    let testMesh: Mesh;

    const loadModel = async (): Promise<void> => {
        const result = await ImportMeshAsync(
            'assets/SimpleP.glb',
            scene
        );

        testMesh = result.meshes[0] as Mesh;

    }

    loadModel();

    return scene;
}