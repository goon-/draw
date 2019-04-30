import DrawingAreaOperation from "./DrawingAreaOperation";
import Color from "./Color";

class SetPixel extends DrawingAreaOperation{
    constructor(x = 0, y = 0, color = new Color()) {
        super('setPixel', {
            x: x,
            y: y,
            color: color
        });
    }

    apply(virtualCanvas) {
        virtualCanvas.setPixel(this.params.x, this.params.y, this.params.color);
    }
}

export default SetPixel;