import DrawingPrimitive from "./DrawingPrimitive";
import Color from "../Color";

class Pixel extends DrawingPrimitive{
    constructor(x = 0, y = 0, color = new Color()) {
        super('setPixel', {
            x: x,
            y: y,
            color: color
        });
    }

    apply(renderer) {
        renderer.setPixel(this.params.x, this.params.y, this.params.color);
    }
}

export default Pixel;