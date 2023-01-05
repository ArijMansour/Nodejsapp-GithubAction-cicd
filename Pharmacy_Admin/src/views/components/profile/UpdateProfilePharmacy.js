import React, { useEffect } from "react";
import CardProfile from "../cards/CardProfile";
import CardSettings from "../cards/CardSettings";

export default function UpdateProfilePharmacy({ match }) {
  useEffect(() => {
    console.log(match.params.id);
  }, []);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardSettings id={match.params.id} idAddress={match.params.idAddress} />
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardProfile />
        </div>
      </div>
    </>
  );
}
