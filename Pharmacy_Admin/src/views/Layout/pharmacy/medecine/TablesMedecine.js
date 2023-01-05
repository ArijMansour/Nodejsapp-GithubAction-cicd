import React from "react";

import CardTableMedecines from "../../../components/cards/CardTableMedecines";

export default function TablesMedecine() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTableMedecines />
        </div>
      </div>
    </>
  );
}
