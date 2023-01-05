import React from "react";

import CardTablePrescriptions from "../../../components/cards/CardTablePrescriptions";

export default function TablesPrescription() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTablePrescriptions />
        </div>
      </div>
    </>
  );
}
