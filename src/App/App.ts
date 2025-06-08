import { Engine, Scene } from '@babylonjs/core';
import { createMainScene } from './MainScene';

export class App {
  private engine: Engine;
  private scene: Scene;

  constructor() {
    const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
    this.engine = new Engine(canvas, true);
    this.scene = createMainScene(this.engine, canvas);
  }

  start() {
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }
}