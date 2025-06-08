import { Scene, Vector3, ImportMeshAsync, Mesh, VertexBuffer,StandardMaterial, NoiseProceduralTexture} from '@babylonjs/core';
import "@babylonjs/loaders/glTF";

export class SelectableObject {
    public mesh: Mesh | null = null;

    constructor(scene: Scene, position: Vector3, path: string) {

        this.LoadModel(scene, position, path);
    }

    private async LoadModel(scene: Scene, position: Vector3, path: string) {

        try {
            const result = await ImportMeshAsync
                (
                    path,
                    scene
                );

            //TODO : [0] for glb files contain a TransformNode? // Header? // root? 
            //https://docs.fileformat.com/3d/glb/
            //Better solution?
            this.mesh = result.meshes[1] as Mesh;
            this.mesh.position = position;

            //Create a standard material and apply procedualtexture with random settings
            //Its not procedual material, but still look cool
            const meshMaterial = new StandardMaterial("mesh_mat", scene);
            const noiseTexture = new NoiseProceduralTexture("perlin", 256, scene);
            noiseTexture.brightness = Math.random();
            noiseTexture.octaves = Math.random() + 20;
            noiseTexture.persistence = Math.random();
            noiseTexture.animationSpeedFactor = Math.random();
            meshMaterial.diffuseTexture = noiseTexture;
            this.mesh.material = meshMaterial;

        } catch (error) {
            console.error('Failed to load model:', error);
        }
    }
    
    //Move the entire models by moving all the vertices in a give direction
    public move(movement : Vector3) {
        if (this.mesh) {
           
            //Retrieve the vertices data
            const verticesData = this.mesh.getVerticesData(VertexBuffer.PositionKind);
            if (!verticesData) return;

            //Update vertices, each vertice exist as x,y,z in the array continuelsly
            for (let i = 0; i < verticesData.length; i += 3) {
                verticesData[i] += movement.x;
                verticesData[i+1] += movement.y;
                verticesData[i+2] += movement.z;
            }

            //Set verticesData to updatable, update, then turn off updatable
            this.mesh.setVerticesData(VertexBuffer.PositionKind, this.mesh.getVerticesData(VertexBuffer.PositionKind)!, true);
            this.mesh.updateVerticesData(VertexBuffer.PositionKind, verticesData);
            this.mesh.setVerticesData(VertexBuffer.PositionKind, this.mesh.getVerticesData(VertexBuffer.PositionKind)!, false);
            this.mesh.refreshBoundingInfo(); //Update bounding box to make sure the mesh can still be selected after moving
        }
    }
}