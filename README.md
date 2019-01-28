A lite-weight component for resizing any element using handle.

### Example

```js
import React from "react";
import { render } from "react-dom";

import Resizzer from "../../../src";

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
```

```css
.example {
	background: aquamarine;
	height: 100px;
	width: 100px;
}

.resizzer {
	display: inline-block;
	position: relative;
}

.resizzer__handle {
	background: darkorange;
	cursor: col-resize;
	height: 100%;
	width: 4px;
	position: absolute;
	right: 0;
	top: 0;
}

```

### API

```js
<Resizzer
    className="resizzer"
    handleClassName="resizzer__handle"
    onResize={this.handleResize}
>
    <div className="your_resize_target" />
</Resizzer>
```

#### Props
- `children` – resize target (required)
- `onResize` – callback to be called when resizing target element (required)
- `className` – className for container element
- `handleClassName` – className for resize-handle element
- `style` – style object for container element
- `styleClassName` – style object for resize-handle element
- `resize` – CSS property to be resized, `width` (default) or `height` 

