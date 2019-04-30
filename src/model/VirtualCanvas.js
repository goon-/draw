import Color from "./Color";

class VirtualCanvas {
    constructor(bottomLeft, width, height) {
        this.bottomLeft = bottomLeft;
        this.width = width;
        this.height = height;
        this.data = new Array(width * height);
        for (let i = 0; i < width * height; i++) {
            this.data[i] = new Color();
        }

        this.topRight = {
            x: this.bottomLeft.x + width,
            y: this.bottomLeft.y + height,
        }
    }

    setPixel(x, y, color) {
        if (this.isInsideCanvas(x, y)) {
            this.setPixelUnchecked(x, y, color);
        }
    }

    isInsideCanvas(x, y) {
        return x >= this.bottomLeft.x && x < this.topRight.x && y >= this.bottomLeft.y && y < this.topRight.y;
    }

    setPixelUnchecked(x, y, color) {
        this.data[(x - this.bottomLeft.x) + (y - this.bottomLeft.y) * this.width].set(color);
    }
}

export default VirtualCanvas;