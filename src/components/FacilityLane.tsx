import React from "react";
import { IFacility } from "../models/IFacility";
import { IReservation } from "../models/IReservation";
import { Property } from "csstype";
import { makeStyles } from "@material-ui/core";

type Props = JSX.IntrinsicElements["div"] & {
  facility: IFacility;
  cellWidth: number;
  backgroudColor: Property.backgroudColor;
  reservation: IReservation;
};

const useStyles = makeStyles<
  Theme,
  {
    backgroundColor: Property.backgroudColor;
  }
>((theme) => ({
  header: {
    backgroundColor: (p) => p.backgroundColor,
    color: (p) => theme.palette.getContrastText(p.backgroundColor),
  },
}));

export const FacilityLane: React.FC = (props) => {
  return <div></div>;
};
