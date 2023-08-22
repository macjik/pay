import React, { useState, useEffect } from "react";
import { Button, CircularProgress, Card } from "@mui/material";
import { TextField } from "@mui/material";
import classes from "./Style/Form.module.css";
import InputMask from "react-input-mask";
import axios from "axios";
import { Helmet } from "react-helmet";
// import 'https://widget.cloudpayments.uz/bundles/paymentblocks.js'
// import CloudPayments from 'cloudpayments'

const Form = (props) => {
  useEffect(() => {
    const recievePublicID = async () => {
      try {
        const response = await axios.post("http://localhost:3010/publicID");
        await props.onAdd({ publicId: response.data });
      } catch (error) {
        console.error(error);
      }
    };
    recievePublicID();

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

  return (
    <>
      {/* <form id="paymentFormSample" onSubmit={handleSubmit}>
        <input type="text" placeholder="cardNumber" data-cp="cardNumber" />
        <input type="text" placeholder="MM" data-cp="expDateMonth" />
        <input type="text" placeholder="YY" data-cp="expDateYear" />
        <input type="text" placeholder="CVV" data-cp="cvv" />
        <input type="text" placeholder="card owner name" data-cp="name" />
        <button type="submit">Оплатить 100 р.</button>
      </form> */}
      <div id="element"></div>
      <form id="paymentFormSample" autoComplete="off">
        <input type="text" data-cp="cardNumber" />
        <input type="text" data-cp="expDateMonth" />
        <input type="text" data-cp="expDateYear" />
        <input type="text" data-cp="name" />
        <button type="submit">Оплатить 100 р.</button>
      </form>
    </>
  );
};

{
  /* <div id="element"></div>; */
}
{
  /* <Card className={classes.card}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Card Number"
            variant="outlined"
            required
            type="number"
            onChange={handleCardNumber}
            value={cardNumber}
          ></TextField>
          <InputMask
            label="Card Expiry Date (MM/YY)"
            variant="outlined"
            required
            type="text"
            mask="99/99"
            maskChar=""
            value={expiryDate}
            onChange={handleExpiryDate}
          >
            {(inputProps) => (
              <TextField
                label="Card Expiry Date (MM/YY)"
                variant="outlined"
                required
                type="text"
                inputProps={inputProps}
              />
            )}
          </InputMask>
          <TextField
            label="Card Owner"
            variant="outlined"
            required
            type="text"
            onChange={handleCardUser}
            value={owner}
          ></TextField>
          <div className={classes.buttons}>
            <Button variant="contained" type="submit">
              Pay
            </Button>
          </div>
        </form>
      </Card> */
}

export default Form;
