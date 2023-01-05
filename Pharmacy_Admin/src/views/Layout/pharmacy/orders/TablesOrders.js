import React from "react";

import CardTableCategories from "../../../components/cards/CardTableCategories";
import CardTableOrders from "../../../components/cards/CardTableOrders";

export default function TablesOrders() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTableOrders />
        </div>
      </div>
    </>
  );
}
