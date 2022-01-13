import React from "react";
import ReactDom from "react-dom";
import { Facility } from "./components/Facility";
import { Reservation } from "./components/Reservation";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import Utils from "@date-io/dayjs";
import { Dayjs } from "dayjs";

class ExtendeUtils extends Utils {
  getCalendarHeaderText(date: Dayjs) {
    return date.format("YYYY年 MMM");
  }

  getDateTimePickerHeaderText(date: Dayjs) {
    return date.format("M/D");
  }
}

ReactDom.render(
  <MuiPickersUtilsProvider utils={ExtendeUtils} locale="ja">
    <Reservation />
  </MuiPickersUtilsProvider>,
  document.getElementById("container")
);
