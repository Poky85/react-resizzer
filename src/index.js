import React from "react";
import PropTypes from "prop-types";
/* global window */

class Resizzer extends React.Component {
    constructor(props) {
        super(props);

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }

    componentDidMount() {
        this.handleMouseMoveFn = ev => this.handleMouseMove(ev);
        this.handleMouseUpFn = ev => this.handleMouseUp(ev);

        window.addEventListener("mousemove", this.handleMouseMoveFn);
        window.addEventListener("mouseup", this.handleMouseUpFn);
    }

    componentWillUnmount() {
        window.removeEventListener("mousemove", this.handleMouseMoveFn);
        window.removeEventListener("mouseup", this.handleMouseUpFn);
    }

    handleMouseDown(ev) {
        this.prevPositionX = ev.clientX;
        this.prevPositionY = ev.clientY;
        this.resizing = true;
    }

    handleMouseMove(ev) {
        if (!this.resizing) {
            return;
        }

        const { onResize, resize } = this.props;
        let diff;

        if (resize === "width") {
            diff = ev.clientX - this.prevPositionX;
        } else {
            diff = ev.clientY - this.prevPositionY;
        }

        onResize(diff);

        this.prevPositionX = ev.clientX;
        this.prevPositionY = ev.clientY;
    }

    handleMouseUp() {
        if (!this.resizing) {
            return;
        }

        this.resizing = false;
    }

    render() {
        const {
            className,
            children,
            handleClassName,
            handleStyle,
            style,
        } = this.props;

        return (
            <div className={className} style={style}>
                {children}
                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                <div
                    className={handleClassName}
                    style={handleStyle}
                    onMouseDown={this.handleMouseDown}
                />
            </div>
        );
    }
}

Resizzer.defaultProps = {
    className: null,
    handleClassName: null,
    handleStyle: null,
    style: null,
    resize: "width",
};

Resizzer.propTypes = {
    className: PropTypes.string,
    children: PropTypes.element.isRequired,
    handleClassName: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    handleStyle: PropTypes.object,
    onResize: PropTypes.func.isRequired,
    resize: PropTypes.oneOf(["height", "width"]),
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
};

export default Resizzer;
