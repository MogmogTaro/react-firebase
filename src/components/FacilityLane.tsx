import React, { useMemo } from "react";
import { IFacility } from "../models/IFacility";
import { IReservation } from "../models/IReservation";
import { Property } from "csstype";
import { makeStyles } from "@material-ui/core";
import { ReservationBar } from "./ReservationBar";

type Props = JSX.IntrinsicElements["div"] & {
  facility: IFacility;
  cellWidth: number;
  backgroudColor: Property.backgroudColor;
  reservations: IReservation;
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

export const FacilityLane: React.FC<Props> = (props) => {
  const { facility, cellWidth, reservation, backgroudColor, ...rootAttr } =
    props;

  const styles = useStyles({
    backgroudColor,
  });

  const cells = useMemo(() => {
    const r: JSX.Element[] = [];
    for (let i = 0; i <= 11; i++) {
      r.push(<div key={i} className="timeCell"></div>);
    }
    return r;
  }, []);
  const bars = useMemo(() => {
    return reservation.map((r) => {
      return (
        <ReservationBar
          key={r.id}
          backgroudColor={backgroudColor}
          beginHour={8}
          reservation={r}
          hourWidth={cellWidth}
          leftOffset={100}
        />
      );
    });
  }, []);
  return (
    <div {...rootAttr}>
      <div className={`laneHeader ${styles.header}`}>
        <p>{facility.name}</p>
      </div>
    </div>
  );
};
