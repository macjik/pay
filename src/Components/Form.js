import React, { useState, useEffect } from "react";
import axios from "axios";
// import 'https://widget.cloudpayments.uz/bundles/paymentblocks.js'
// import CloudPayments from 'cloudpayments'

const Form = (props) => {
  useEffect(() => {
    // const recievePublicID = async () => {
    //   try {
    //     const response = await axios.post("http://localhost:3010/publicID");
    //     await props.onAdd({ publicId: response.data });
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // recievePublicID();

    const sendServerRequest = async () => {
      const hi = "Hiii";
      try {
        const request = axios.post("http://localhost:3010/", { hi });
        const response = await request;
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    sendServerRequest();

    const recieveRequest = async () => {
      try {
        const response = await axios.post("http://localhost:3010/pay");
        console.log(response.data);
        if (response.status !== 200) {
          throw new Error(response.status);
        }
      } catch (error) {
        console.error(error);
      }
    };
    recieveRequest();
  }, []);

  // useEffect(() => {
  //   const handleCheckout = async () => {
  //     try {
  //       console.log(ID);
  //       const checkout = await new window.cp.Checkout({
  //         publicId: ID,
  //         container: document.getElementById("paymentForSample"),
  //       });
  //       console.log(ID);
  //       const fieldValues = {
  //         cvv: "911", // При вводе карт платежной системы Humo/UzCard данное поле не обязательно, системой не проверяется
  //         cardNumber: "8600 0000 0000 0007",
  //         expDateMonth: "12",
  //         expDateYear: "24",
  //       };
  //       checkout.createPaymentCryptogram(fieldValues).then((cryptogram) => {
  //         console.log(cryptogram);
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   handleCheckout();
  // }, [ID]);

  // useEffect(() => {
  //   const testing = async () => {
  //     try {
  //       const test = await axios.post("https://api.cloudpayments.uz/test", {
  //         headers: { "JSON Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           paymentData,
  //         }),
  //       });
  //       const response = await test.response;
  //       console.log(response);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   testing();
  // });

  return <></>;
};

export default Form;
