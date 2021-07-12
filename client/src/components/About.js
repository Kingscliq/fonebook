import React from "react";
import Alert from "./alerts";

const About = () => {
  return (
    <div className="container">
      <div className="card d-flex align-items-center justify-content-between">
        <h2 className="text-left">About</h2>
        <p>
          This is a Full Stack Application Contact Management Application built
          with Nodejs Api.
        </p>
        <small>Ezo Contact Keeper v-0.0.1</small>
        <Alert />
      </div>
    </div>
  );
};

export default About;
