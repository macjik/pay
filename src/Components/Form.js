import React, { useState } from "react";
import { Button, CircularProgress, Card } from "@mui/material";
import { TextField } from "@mui/material";
import classes from "./Style/Form.module.css";
import InputMask from "react-input-mask";
import axios from "axios";

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

  const payment = {
    amount: 100,
    currency: "USD",
    cardNumber: "4242424242424242",
    cardExpDate: "12/23",
    cardCVC: "123",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const post = await axios.post(
        `https://api.cloudpayments.uz/payments`,
        {
          payment,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
      console.log(post);
    } catch (err) {
      console.error("Failed to send the response");
    }
    console.log(payment);
  };

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
