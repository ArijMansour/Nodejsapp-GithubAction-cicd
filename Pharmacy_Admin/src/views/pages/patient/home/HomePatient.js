import React, { useState, useEffect } from "react";
// import ProductsC from "../components/ProductsC";
import { Link } from "react-router-dom";
import CategoryService from "../../../../infrastructure/services/api/CategoryService";
import Medicines from "../../../components/patient/medicine/Medicines";
import Nav from "../../../components/patient/Nav/Nav";
import Slider from "../../../components/patient/slider/Slider";
import Cardscg from "../card-sg/Cardscg";
import Chatbot from "../../../components/chatbot/Chatbot";

const Home = () => {
  const [gridData, setGridData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);

  const loadCategories = () => {
    CategoryService.getCategories()
      .then((c) => {
        console.log(c.data);

        setCategories(c.data);

        setLoading(false);
      })
      .catch((err) => console.log("err", err));
  };
  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <>
      <div>
        <Chatbot/>
        <Nav/>
       

        <Slider />

        <h1></h1>
        <div className="cards">
          {categories.slice(0, 3).map(function (item, i) {
            return <Cardscg title={item.name} key={i}></Cardscg>;
          })}
        </div>

        <Medicines />
      </div>
      {/* <ProductsC /> */}
    </>
  );
};

export default Home;
