import React, { useMemo } from "react";

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

export const ReservationBar: React.FC<PropsType> = (props) => {
  const { leftOffset, reservation, hourWidth, beginHour, backgroudColor } =
    props;
  const { startDate, endDate } = reservation;
  const width = useMemo(() => {
    const hours = endDate.diff(startDate, "minute") / 60;
    return hourWidth * hours;
  }, [startDate, endDate, hourWidth]);

  const left = useMemo(() => {
    const beginDate = startDate.set("hour", beginHour).startOf("hour");
    const dissStart = startDate.diff(beginDate, "minute") / 60;
    return leftOffset + dissStart + hourWidth;
  }, [beginHour, hourWidth, leftOffset, startDate]);

  const styles = useStyles({
    width,
    left,
    backgroudColor,
  });

  return (
    <div className={style.root}>
      <div className={style.bar}></div>
    </div>
  );
};
