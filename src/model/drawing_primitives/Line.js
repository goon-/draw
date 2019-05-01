import DrawingPrimitive from "./DrawingPrimitive";
import Color from "../Color";

class Line extends DrawingPrimitive{
    constructor(x1 = 0, y1 = 0, x2 = 0, y2 = 0, color = new Color()) {
        super('setPixel', {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
            color: color
        });
    }

    apply(renderer) {
        renderer.line(this.params.x1, this.params.y1, this.params.x2, this.params.y2, this.params.color);
    }
}

export default Line;