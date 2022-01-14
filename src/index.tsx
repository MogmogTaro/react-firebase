import Utils from "@date-io/dayjs";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ja";
import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Routing } from "./components/Routing";

dayjs.locale("ja");

class ExtendedUtils extends Utils {
  getCalendarHeaderText(date: Dayjs) {
    return date.format("YYYY年 MMM");
  }

  getDateTimePickerHeaderText(date: Dayjs) {
    return date.format("M/D");
  }
}

ReactDom.render(
  <MuiPickersUtilsProvider utils={ExtendedUtils} locale="ja">
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  </MuiPickersUtilsProvider>,
  document.getElementById("container")
);
