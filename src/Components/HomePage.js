import Form from "./Form";
import { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  useEffect(() => {
    // const recievePublicID = async () => {
    //   try {
    //     const response = await axios.post("http://localhost:3010/publicID");
    //     // await props.onAdd({ publicId: response.data });
    //     console.log(response.data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // recievePublicID();

    const handleCheckout = async () => {
      try {
        const response = await axios.post("http://localhost:3010/publicID");

        const payments = new window.cp.CloudPayments();

        payments.oncomplete = (result) => {
          console.log("result", result);
        };
        payments
          .pay("charge", {
            publicId: response.data,
            description: "Оплата товаров в course.com",
            amount: 400,
            currency: "UZS",
            invoiceId: 1234567,
          })
          .then((result) => {
            console.log("result", result);
          });
      } catch (error) {
        console.error(error);
      }
    };
    handleCheckout();
  }, []);

  const recieveReciept = async () => {
    try {
      const requestRecieptURL = await axios.post(
        "http://localhost:3010/receipt"
      );
      // let receipt = requestReciept;

      // const data = {};
      // data.CloudPayments = {
      //   CustomerReceipt: receipt, // Онлайн-чек
      // };
      console.log(requestRecieptURL.data);

      // const receipt = await axios.post(
      //   requestRecieptURL.data.Model.ReceiptLocalUrl
      // );
      // console.log(receipt);
    } catch (err) {
      console.error(err);
    }
  };
  recieveReciept();

  return <></>;
};

export default HomePage;
