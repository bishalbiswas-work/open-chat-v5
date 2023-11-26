import React from "react";

const Multilingual = () => {
  return (
    <div className="multi">
      <h1 className="mh">Multilingual</h1>
      <img className="m1" src="/assets/m1.png" />
      <div className="m-box">
        <div className="m-con">
          <p className="m-p">
            Extend your global reach Deliver automated customer support across
            50+ languages.
          </p>
          <button className="m-btm">Get Started</button>
        </div>
        <div className="m1-box">
          <img style={{ marginLeft: "-43px" }} src="/assets/m2.png" />
          <div>
            <img
              style={{ marginTop: "-25px", marginLeft: "25px" }}
              src="/assets/m3.png"
            />
            <img
              style={{ marginTop: "92px", marginLeft: "25px" }}
              src="/assets/m4.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Multilingual;
