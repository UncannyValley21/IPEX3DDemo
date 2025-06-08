export class InputManager {

    //Map keys when pressed and when held, to prevent multiple inputs from keydown
    //TODO extend to other needed input types
    private keyDown: Map<string, boolean> = new Map();
    private keyheld: Map<string, boolean> = new Map();

    constructor() {
        this.register();
    }

    private register() {
        window.addEventListener('keydown', (e : KeyboardEvent) => {
            if (!this.keyDown.get(e.key) && !this.keyheld.get(e.key)) {
                this.keyDown.set(e.key, true);
                this.keyheld.set(e.key, true);
            }
        });
        window.addEventListener('keyup', (e : KeyboardEvent) => {
            this.keyDown.delete(e.key);
            this.keyheld.delete(e.key);
        });
    }

    public consumeKeyDown(key: string): boolean {
        if (this.keyDown.get(key)) {
            this.keyDown.set(key, false);
            return true;
        }
        return false;
    }
}