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

  public start() {
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });

    //Make sure to resize engine when window resizes, to keep raycast from screen accurate
    window.addEventListener('resize', () => {
      this.engine.resize();
    });
  }
}