import React from "react";
import Layout from "./../components/layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Ecommerce app"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
          Explore our curated collection of premium watches designed for style, precision, and durability. Whether you're looking for a sleek modern piece, a classic luxury timepiece, or a sporty everyday companion, we offer something for every wrist and every occasion.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;