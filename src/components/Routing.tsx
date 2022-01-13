import React from "react";
import { Routes, Route } from "react-router-dom";
import { Reservation } from "./Reservation";
import { Facility } from "./Facility";
import { ReservationList } from "./ReservationList";

export const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={ReservationList} />
      <Route path="/reservation" element={Reservation} />
      <Route path="/facility" element={Facility} />
    </Routes>
  );
};
