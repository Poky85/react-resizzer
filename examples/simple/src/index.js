import React from "react";
import { render } from "react-dom";

import Resizzer from "../../../src";
import "./style.css";
/* global document */

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            width: null,
        };

        this.handleResize = this.handleResize.bind(this);
    }

    handleResize(diff) {
        const width = Math.max(0, this.targetEl.clientWidth + diff);

        this.setState({ width });
    }

    render() {
        const { width } = this.state;
        return (
            <Resizzer
                className="resizzer"
                handleClassName="resizzer__handle"
                onResize={this.handleResize}
            >
                <div
                    ref={el => {
                        this.targetEl = el;
                    }}
                    className="example"
                    style={width !== null ? { width: `${width}px` } : null}
                />
            </Resizzer>
        );
    }
}

render(<App />, document.getElementById("root"));
