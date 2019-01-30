import React from "react";
import { mount } from "enzyme";
import sinon from "sinon";
import simulant from "simulant";
/* global window */
/* global test */
/* global expect */

import Resizzer from "./index";

const createResizzer = ({ onResize }) => (
    <Resizzer handleClassName="handle" onResize={onResize}>
        <div />
    </Resizzer>
);

test("doesn't resize before mousedown", () => {
    const onResize = sinon.spy();
    mount(createResizzer({ onResize }));

    simulant.fire(window, "mousemove", { clientX: 200 });

    expect(onResize.notCalled).toBe(true);
});

test("resizes on mousemove", () => {
    const onResize = sinon.spy();
    const wrapper = mount(createResizzer({ onResize }));

    const startPositionX = 100;
    const movePositionX = 200;

    wrapper.find(".handle").simulate("mousedown", { clientX: startPositionX });
    simulant.fire(window, "mousemove", { clientX: movePositionX });

    expect(onResize.calledOnce).toBe(true);
    expect(onResize.args[0][0]).toBe(movePositionX - startPositionX);
});

test("doesn't resize after mouseup", () => {
    const onResize = sinon.spy();
    const wrapper = mount(createResizzer({ onResize }));

    wrapper.find(".handle").simulate("mousedown", { clientX: 100 });
    simulant.fire(window, "mousemove", { clientX: 200 });
    simulant.fire(window, "mouseup", { clientX: 200 });
    simulant.fire(window, "mousemove", { clientX: 300 });

    expect(onResize.calledOnce).toBe(true);
});
