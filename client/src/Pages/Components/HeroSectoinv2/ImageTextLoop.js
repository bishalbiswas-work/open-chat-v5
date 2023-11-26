import React, { useState, useEffect } from "react";

const images = [
  {
    id: 1,
    src: "/assets/Green.gif",
    text1: " ChatGPT",
    text2: ": 60 sec setup",
    text3: "Customer Won",
    icon: "/green-alarm.png",
  },
  {
    id: 2,
    src: "/assets/Red.gif",
    text1: " AutoReply",
    text2: ": 2 Hours setup",
    text3: "Customer Lost",
    icon: "/red-alarm.png",
  },
  {
    id: 1,
    src: "/assets/service-green.gif",
    text1: " ChatGPT",
    text2: ": 60 sec setup",
    text3: "Customer Won",
    icon: "/red-alarm.png",
  },
  {
    id: 2,
    src: "/assets/service-red.gif",
    text1: " AutoReply",
    text2: ": 2 Hours setup",
    text3: "Customer Lost",
    icon: "/red-alarm.png",
  },
  {
    id: 1,
    src: "/assets/SaaS-green.gif",
    text1: " ChatGPT",
    text2: ": 60 sec setup",
    text3: "Customer Won",
    icon: "/red-alarm.png",
  },
  {
    id: 2,
    src: "/assets/SaaS-red.gif",
    text1: " AutoReply",
    text2: ": 2 Hours setup",
    text3: "Customer Lost",
    icon: "/red-alarm.png",
  },
];

const ImageTextLoop = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("Ecommerce"); // Default selected category
  const categoryRanges = {
    Ecommerce: [0, 1],
    Service: [2, 3],
    SaaS: [4, 5],
  };
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  //   }, 9000); // Change the time interval as required. Currently set to 3 seconds.

  //   return () => clearInterval(interval); // Clean up to avoid memory leaks.
  // }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      const [start, end] = categoryRanges[selectedCategory];
      setCurrentIndex((prevIndex) => (prevIndex < end ? prevIndex + 1 : start));
    }, 9000); // Interval set to 9 seconds as per your comment

    return () => clearInterval(interval); // Clean up to avoid memory leaks
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentIndex(categoryRanges[category][0]);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <p
          style={{
            fontSize: "25px",
            fontWeight: 700,
          }}
        >
          FB +
        </p>
        <p
          style={{
            color: images[currentIndex].id === 1 ? "#419A26" : "#C00",
            fontSize: "25px",
            fontWeight: 700,
          }}
        >
          {` ${images[currentIndex].text1}`}
        </p>
        <p
          style={{
            color: images[currentIndex].id === 1 ? "#333" : "#C00",
            fontSize: images[currentIndex].id === 1 ? "25px" : "23px",
            fontWeight: 700,
          }}
        >
          {images[currentIndex].text2}
        </p>
        <img src={images[currentIndex].icon} alt="" />
        <p
          style={{
            color: images[currentIndex].id === 1 ? "#419A26" : "#C00",
            fontSize: "25px",
            fontWeight: 700,
          }}
        >
          {images[currentIndex].text3}
        </p>
      </div>
      <img
        src={images[currentIndex].src}
        alt=""
        style={{
          width: "100% !important",
          borderRadius: "25px",
          height: "600px",
          marginTop: "10px",
        }}
      />
      <div className="hero-btn-group">
        <button
          className={`${
            selectedCategory === "Ecommerce" ? "ecom-btn" : "service-btn"
          }`}
          onClick={() => handleCategoryClick("Ecommerce")}
        >
          <span>Ecommerce</span>
          <img src="/cart.svg" alt="" />
        </button>
        <button
          className={`${
            selectedCategory === "Service" ? "ecom-btn" : "service-btn"
          }`}
          // className="service-btn"
          onClick={() => handleCategoryClick("Service")}
        >
          <span>Service</span>
          <img src="/headset.svg" alt="" />
        </button>
        <button
          className={`${selectedCategory === "SaaS" ? "ecom-btn" : "sass-btn"}`}
          // className="sass-btn"
          onClick={() => handleCategoryClick("SaaS")}
        >
          <span>SaaS</span>
          <img src="/pc.svg" alt="" />
        </button>
      </div>
    </div>
  );
};

export default ImageTextLoop;
