import '../styles/DrawingArea.css';
import React from "react";

class DrawingArea extends React.Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.imageData = this.canvas.current.getContext('2d').createImageData(this.canvas.current.width, this.canvas.current.height);
        this.props.operations && this.props.operations.forEach(op => op.apply(this.props.virtualCanvas));
        this.updateCanvas();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.operations !== this.props.operations;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const isPastOperationModified = prevProps.operations.length > this.props.operations.length ||
            prevProps.operations.some((op, idx) => op !== this.props.operations[idx]);
        const operationsToApply = isPastOperationModified
            ? this.props.operations
            : this.props.operations.slice(prevProps.operations.length);

        if (operationsToApply.length > 0) {
            operationsToApply.forEach(op => op.apply(this.props.virtualCanvas));
            this.updateCanvas();
        }
    }

    updateCanvas() {
        let vCanvasOffset = this.props.virtualCanvasOffset;
        let canvasWidth = this.canvas.current.width;
        let canvasHeight = this.canvas.current.height;
        const endX = Math.min(vCanvasOffset.x + canvasWidth, this.props.virtualCanvas.width);
        const endY = Math.min(vCanvasOffset.y + canvasHeight, this.props.virtualCanvas.height);
        for (let vCanvasY = vCanvasOffset.y, y = 0; vCanvasY < endY; vCanvasY++, y++) {
            for (let vCanvasX = vCanvasOffset.x, imgDataOffset = (canvasHeight - y - 1) * canvasWidth * 4; vCanvasX < endX; vCanvasX++, imgDataOffset += 4) {
                const color = this.props.virtualCanvas.data[vCanvasX + vCanvasY * this.props.virtualCanvas.width];
                this.imageData.data[imgDataOffset] = color.r;
                this.imageData.data[imgDataOffset + 1] = color.g;
                this.imageData.data[imgDataOffset + 2] = color.b;
                this.imageData.data[imgDataOffset + 3] = color.a;
            }
        }
        const ctx = this.canvas.current.getContext('2d');
        ctx.putImageData(this.imageData, 0, 0);
    }

    handleClick(e) {
        // console.log(e.clientX, e.clientY);
        // const boundingClientRect = this.canvas.current.getBoundingClientRect();
        // console.log(boundingClientRect);
        // console.log(e.clientX - boundingClientRect.x, e.clientY - boundingClientRect.y);
        // console.log(e.clientX - boundingClientRect.x, boundingClientRect.height - (e.clientY - boundingClientRect.y));
        if (this.props.onClick) {
            const boundingClientRect = this.canvas.current.getBoundingClientRect();
            this.props.onClick(e.clientX - boundingClientRect.x, boundingClientRect.height - (e.clientY - boundingClientRect.y));
        }
    }

    render() {
        return <canvas ref={this.canvas} width={this.props.canvasWidth} height={this.props.canvasHeight} onMouseDown={this.handleClick} className="drawing-area-canvas" style={{border: 'solid 1px'}}></canvas>;
    }
}

export default DrawingArea;