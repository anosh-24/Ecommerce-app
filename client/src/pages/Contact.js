import React from "react";
import Layout from "./../components/layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            Any Query And Info About Product Feel Free To Call Anytime, We Are Available 24/7.
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.AMarketing@ecommerceapp.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : +92 322 9895835
                      </p>
          <p className="mt-3">
            <BiSupport /> : +92 320 5405027 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
