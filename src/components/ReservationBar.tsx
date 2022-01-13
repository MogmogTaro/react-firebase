import React from "react";

import { IReservation } from "../models/IReservation";

import { Property } from "csstype";
import { makeStyles, Theme } from "@material-ui/core";

type PropsType = {
  reservation: IReservation;
  leftOffset: number;
  beginHour: number;
  hourWidth: number;
  backgroudColor: Property.backgroudColor;
};

type StyleType = {
  width: number;
  left: number;
  backgroudColor: Property.backgroudColor;
};

const useStyles = makeStyles<Theme, StyleType>(() => ({
  root: {
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    width: (p) => p.width + "px",
    left: (p) => p.left + "px",
  },
  bar: {
    height: "50%",
    width: "100%",
    backgroundColor: (p) => p.backgroudColor,
  },
}));

export const ReservationBar: Rect.FC = (props) => {
  return <div></div>;
};
