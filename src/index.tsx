import React from "react";
import ReactDom from "react-dom";
import { Facility } from "./components/Facility";
import { Reservation } from "./components/Reservation";

ReactDom.render(<Reservation />, document.getElementById("container"));
