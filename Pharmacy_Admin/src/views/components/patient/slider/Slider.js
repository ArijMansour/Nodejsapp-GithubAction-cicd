import { React, useEffect, useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
const Slider = () => {
  const SliderData = [
    {
      title: "Get your medicine fast",
      subtitle:
        "Shop now upload your prescription to get medicine from your home.",
    },
    {
      title: "Find The Best Outfit",
      subtitle: "With 30% Off",
    },
    {
      title: "Fast Delievery",
      subtitle: "24/24 available for you",
    },
  ];
  const [current, setCurrent] = useState(0);
  const length = SliderData.length;
  const [auto, setauto] = useState(true);
  const intervaltime = 6000;
  let slideinterval;
  const nextslide = () => {
    clearInterval(slideinterval);
    slideinterval = setInterval(nextslide, intervaltime);
    setTimeout(() => setCurrent(current === length - 1 ? 0 : current + 1));
  };
  const prevslide = () => {
    clearInterval(slideinterval);
    slideinterval = setInterval(nextslide, intervaltime);
    setTimeout(() => setCurrent(current === 0 ? length - 1 : current - 1));
  };
  useEffect(() => {
    setauto(true);
    if (auto) {
      slideinterval = setInterval(nextslide, intervaltime);
    }
    return () => {
      setauto(false);
      clearInterval(slideinterval);
    };
  });

  return (
    <div className="slider">
      {SliderData.map((slide, index) => {
        return (
          <div
            key={index}
            className={index === current ? "slide current" : "slide"}
          >
            <h1 className="titleslider">{slide.title}</h1>
            <h3 className="subtitleslider">{slide.subtitle}</h3>
            <div className="content">
              {" "}
              <Link to="/available-pharmacies">
                {" "}
                <button
                  className="inline-flex items-center justify-center w-full px-8 py-4 text-base font-bold leading-6 text-white bg-blue-600 border border-transparent rounded-full md:w-auto hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:blue-indigo-600"
                >
                  Upload Prescription
                </button>
              </Link>{" "}
            </div>
          </div>
        );
      })}
      <IoIosArrowForward className="next" size="32" onClick={nextslide} />
      <IoIosArrowBack className="prev" size="32" onClick={prevslide} />
    </div>
  );
};

export default Slider;
