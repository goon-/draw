import React from 'react';
import './styles/App.css';
import DrawingArea from "./components/DrawingArea";
import Pixel from "./model/drawing_primitives/Pixel";
import Color from "./model/Color";
import Line from "./model/drawing_primitives/Line";

const drawingAreaOffset = {x: 0, y: 0};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            operations: [],
            isLmbPressed: false
        };
        this.onDrawingAreaMouseDown = this.onDrawingAreaMouseDown.bind(this);
        this.onDrawingAreaMouseUp = this.onDrawingAreaMouseUp.bind(this);
        this.onDrawingAreaMouseMove = this.onDrawingAreaMouseMove.bind(this);

        this.onMouseLeaveDrawingArea = this.onMouseLeaveDrawingArea.bind(this);
        this.onMouseEnterDrawingArea = this.onMouseEnterDrawingArea.bind(this);
    }

    onDrawingAreaMouseDown(x, y, button) {
        this.setState(state => {
            return {
                operations: [].concat(state.operations).concat([new Pixel(x, y, new Color(255, 0, 0, 255))]),
                // TODO move button codes to abstract constants
                isLmbPressed: button === 0
            };
        });
    }

    onDrawingAreaMouseUp(x, y, button) {
        this.setState(state => {
            // TODO move button codes to abstract constants
            if (button === 0) {
                return {
                    isLmbPressed: false
                };
            }
            return state;
        });
    }

    onMouseLeaveDrawingArea(x, y) {
        this.setState({isLmbPressed: false}) // Always false for now
    }

    onMouseEnterDrawingArea(x, y, button, buttons) {
        if (buttons != 0) {
            this.onDrawingAreaMouseDown(x, y, button)
        }
    }

    onDrawingAreaMouseMove(dx, dy, newX, newY) {
        this.setState(state => {
            if (state.isLmbPressed) {
                return {
                    operations: [].concat(state.operations).concat([new Line(newX - dx, newY - dy, newX, newY, new Color(255, 0, 0, 255))]),
                };
            }
        });
    }

    render() {
        return (
            <div className="App">
                <div className={'drawing-area-container'}>
                    <DrawingArea
                        offset={drawingAreaOffset}
                        onMouseDown={this.onDrawingAreaMouseDown}
                        onMouseUp={this.onDrawingAreaMouseUp}
                        onMouseMove={this.onDrawingAreaMouseMove}
                        onMouseLeave={this.onMouseLeaveDrawingArea}
                        onMouseEnter={this.onMouseEnterDrawingArea}
                        operations={this.state.operations}
                    />
                </div>
            </div>
        );
    }
}

export default App;
