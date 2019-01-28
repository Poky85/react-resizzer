import React from "react";
import { render } from "react-dom";
import Resizzer from "../../../src";
/* global document */

const App = () => <Resizzer />;
render(<App />, document.getElementById("root"));
