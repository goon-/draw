import '../styles/DrawingArea.css';
import React from "react";

class DrawingArea extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
    }

    componentDidMount() {
        this.canvas = this.canvasRef.current;
        this.ctx = this.canvas.getContext('2d');
        this.props.operations && this.props.operations.forEach(op => op.apply(this));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.canvas = this.canvasRef.current;
        this.ctx = this.canvas.getContext('2d');

        const resized = this.canvas.width !== this.canvas.offsetWidth || this.canvas.height !== this.canvas.offsetHeight;
        if (resized) {
            this.canvas.width = this.canvas.offsetWidth;
            this.canvas.height = this.canvas.offsetHeight;
        }

        const isPastOperationModified = prevProps.operations.length > this.props.operations.length ||
            prevProps.operations.some((op, idx) => op !== this.props.operations[idx]);
        const operationsToApply = isPastOperationModified || resized
            ? this.props.operations
            : this.props.operations.slice(prevProps.operations.length);

        if (operationsToApply.length > 0) {
            operationsToApply.forEach(op => op.apply(this));
        }
    }

    handleMouseDown(e) {
        if (this.props.onMouseDown) {
            const {worldX, worldY} = this.toWorldCoord(e.clientX, e.clientY);
            this.props.onMouseDown(worldX, worldY, e.button);
        }
    }

    handleMouseUp(e) {
        if (this.props.onMouseUp) {
            const {worldX, worldY} = this.toWorldCoord(e.clientX, e.clientY);
            this.props.onMouseUp(worldX, worldY, e.button);
        }
    }

    handleMouseMove(e) {
        if (this.props.onMouseMove) {
            const {worldX, worldY} = this.toWorldCoord(e.clientX, e.clientY);
            this.props.onMouseMove(e.movementX, -e.movementY, worldX, worldY);
        }
    }

    render() {
        return <div className="drawing-area-canvas">
            <canvas
                ref={this.canvasRef}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onMouseMove={this.handleMouseMove}
                style={{width: '100%', height: '100%'}}
            />
        </div>;
    }

    setPixel(x, y, color) {
        const {canvasX, canvasY} = this.toCanvasCoord(x, y);
        const imageData = this.ctx.createImageData(1, 1);
        imageData.data[0] = color.r;
        imageData.data[1] = color.g;
        imageData.data[2] = color.b;
        imageData.data[3] = color.a;
        this.ctx.putImageData(imageData, canvasX, canvasY);
    }

    line(x1, y1, x2, y2, color) {
        const start = this.toCanvasCoord(x1, y1);
        const end = this.toCanvasCoord(x2, y2);
        this.ctx.strokeStyle = this.getStyle(color);
        this.ctx.beginPath();
        this.ctx.moveTo(start.canvasX, start.canvasY);
        this.ctx.lineTo(end.canvasX, end.canvasY);
        this.ctx.stroke();
    }

    toCanvasCoord(x, y) {
        return {
            canvasX: x - this.props.offset.x,
            canvasY: this.canvas.height - (y - this.props.offset.y)
        };
    }

    toWorldCoord(x, y) {
        // TODO: move to componentDidUpdate?
        const boundingClientRect = this.canvas.getBoundingClientRect();
        return {
            worldX: x - boundingClientRect.x + this.props.offset.x,
            worldY: boundingClientRect.height - (y - boundingClientRect.y) + this.props.offset.y,
        };
    }

    getStyle(color) {
        return `rgba(${color.r},${color.g},${color.b},${color.a})`;
    }
}

export default DrawingArea;