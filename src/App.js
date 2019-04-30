import React from 'react';
import logo from './logo.svg';
import './App.css';
import DrawingArea from "./components/DrawingArea";
import DrawingAreaOperation from "./model/DrawingAreaOperation";
import VirtualCanvas from "./model/VirtualCanvas";
import SetPixel from "./model/SetPixel";
import Color from "./model/Color";

const vCanvasBottomLeft = {x: -100, y: -100};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            operations: []
        };
        this.onCanvasClick = this.onCanvasClick.bind(this);
    }

    onCanvasClick(vCanvasX, vCanvasY) {
        this.setState(state => {
            const opCopy = state.operations.slice();
            opCopy.push(new SetPixel(vCanvasX + vCanvasBottomLeft.x, vCanvasY + vCanvasBottomLeft.y, new Color(255, 0, 0, 255)));
            return {operations: opCopy};
        });
    }

    render() {
        return (
            <div className="App">
                {/*<header className="App-header">*/}
                {/*  <img src={logo} className="App-logo" alt="logo" />*/}
                {/*  <p>*/}
                {/*    Edit <code>src/App.js</code> and save to reload.*/}
                {/*  </p>*/}
                {/*  <a*/}
                {/*    className="App-link"*/}
                {/*    href="https://reactjs.org"*/}
                {/*    target="_blank"*/}
                {/*    rel="noopener noreferrer"*/}
                {/*  >*/}
                {/*    Learn React*/}
                {/*  </a>*/}
                {/*</header>*/}
                <DrawingArea
                    virtualCanvasOffset={{x: 0, y: 0}}
                    virtualCanvas={new VirtualCanvas(vCanvasBottomLeft, 100, 100)}
                    canvasWidth={200}
                    canvasHeight={200}
                    onClick={this.onCanvasClick}
                    // operations={[
                    //     new SetPixel(0, 0, new Color(255, 0, 0, 255)),
                    //     new SetPixel(-100, -100, new Color(255, 0, 0, 255)),
                    //     // new SetPixel(-100, 99, new Color(255, 0, 0, 255)),
                    //     // new SetPixel(99, 99, new Color(255, 0, 0, 255)),
                    //     new SetPixel(99, -100, new Color(255, 0, 0, 255)),
                    // ]}
                    operations={this.state.operations}
                />
            </div>
        );
    }
}

export default App;
