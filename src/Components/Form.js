import React, { useState, useEffect } from "react";
import { Button, CircularProgress, Card } from "@mui/material";
import { TextField } from "@mui/material";
import classes from "./Style/Form.module.css";
import InputMask from "react-input-mask";
import axios from "axios";
import CloudPayments from 'https://widget.cloudpayments.ru/bundles/paymentblocks.js'

const Form = () => {
  const [owner, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const handleCardNumber = (e) => {
    setCardNumber(e.target.value); //16 digits
  };

  const handleExpiryDate = (e) => {
    setExpiryDate(e.target.value);
  };

  const handleCardUser = (e) => {
    setName(e.target.value);
  };

  const cp = new CloudPayments();
  cp.publicKey = "pk_27a0fa56dbdd6c3825efe5664f40d";
  cp.apiUrl = "https://api.cloudpayments.uz/";

  const paymentData = {
    Amount: 1000,
    Currency: "UZS",
    Name: "John Doe",
    CardCryptogramPacket: "ENCRYPTED_CARD_DATA",
    InvoiceId: "123456789",
    AccountId: "USER_ID",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('click');
    try {
      const response = await cp.charge(paymentData);

      if (response.Success) {
        console.log("Payment successful:", response);
      } else {
        console.error("Payment failed:", response);
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://widget.cloudpayments.ru/bundles/paymentblocks.js";
  //   script.sync = true;

  //   document.body.append(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  return (
    <Card className={classes.card}>
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
    </Card>
  );
};

export default Form;
