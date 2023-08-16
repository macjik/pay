import React, { useState, useEffect } from "react";
import { Button, CircularProgress, Card } from "@mui/material";
import { TextField } from "@mui/material";
import classes from "./Style/Form.module.css";
import InputMask from "react-input-mask";
import axios from "axios";
import { Helmet } from "react-helmet";
// import 'https://widget.cloudpayments.uz/bundles/paymentblocks.js'
// import CloudPayments from 'cloudpayments'

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

  // const cp = new window.CloudPayments();
  // cp.publicKey = "pk_27a0fa56dbdd6c3825efe5664f40d";
  // cp.apiUrl = "https://api.cloudpayments.uz/";

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

    console.log("click");

    // const checkout = new window.cp.Checkout({
    //   publicId: "test_api_000000000000000002",
    //   container: document.getElementById("paymentFormSample"),
    // });

    // const fieldValues = {
    //   cvv: "911",
    //   cardNumber: "4242 4242 4242 4242",
    //   expDateMonth: "12",
    //   expDateYear: "24",
    // };

    // checkout
    //   .createPaymentCryptogram()
    //   .then((cryptogram) => {
    //     console.log(cryptogram); // криптограмма
    //   })
    //   .catch((errors) => {
    //     console.log(errors);
    //   });
  };

  useEffect(() => {
    // const downloadScript = async () => {
    //   try {
    //     const response = await axios.get(
    //       "https://widget.cloudpayments.ru/bundles/paymentblocks.js"
    //     );
    //     const script = document.createElement("script");
    //     script.text = response.data;
    //     document.head.appendChild(script);
    //     script.onload = initializePaymentBlocks;
    //   } catch (error) {
    //     console.error("Error downloading script:", error);
    //   }
    // };
    // let blocksApp = new window.cp.PaymentBlocks(
    //   {
    //     publicId: "test_api_000000000000000002",
    //     description: "Тестовая оплата",
    //     amount: 100,
    //     currency: "UZS",
    //     invoiceId: "123",
    //     accountId: "123",
    //     email: "",
    //     requireEmail: false,
    //     language: "ru-RU",
    //   },
    //   {
    //     appearance: {
    //       colors: {
    //         primaryButtonColor: "#2E71FC",
    //         primaryButtonTextColor: "#FFFFFF",
    //         primaryHoverButtonColor: "#2E71FC",
    //         primaryButtonHoverTextColor: "#FFFFFF",
    //         activeInputColor: "#0B1E46",
    //         inputBackground: "#FFFFFF",
    //         inputColor: "#8C949F",
    //         inputBorderColor: "#E2E8EF",
    //         errorColor: "#EB5757",
    //       },
    //       borders: {
    //         radius: "8px",
    //       },
    //     },
    //     components: {
    //       paymentButton: {
    //         text: "Оплатить",
    //         fontSize: "16px",
    //       },
    //       paymentForm: {
    //         labelFontSize: "16px",
    //         activeLabelFontSize: "12px",
    //         fontSize: "16px",
    //       },
    //     },
    //   }
    // );
    // blocksApp.mount(document.getElementById("element"));
    // blocksApp.on("destroy", () => {
    //   console.log("destroy");
    // });
    // blocksApp.on("success", (result) => {
    //   console.log("success", result);
    // });
    // blocksApp.on("fail", (result) => {
    //   console.log("fail", result);
    // });
    function pay() {
      let widget = new window.cp.CloudPayments();
      widget.pay(
        "auth", // или 'charge'
        {
          //options
          publicId: "test_api_00000000000000000000002", //id из личного кабинета
          description: "Оплата товаров в 2", //назначение
          amount: 100, //сумма
          currency: "RUB", //валюта
          accountId: "user@example.com", //идентификатор плательщика (необязательно)
          invoiceId: "1234567", //номер заказа  (необязательно)
          // email: "user@example.com", //email плательщика (необязательно)
          skin: "mini", //дизайн виджета (необязательно)
          data: {
            myProp: "myProp value",
          },
        },
        {
          onSuccess: function (options) {
            // success
            //действие при успешной оплате
          },
          onFail: function (reason, options) {
            // fail
            //действие при неуспешной оплате
          },
          onComplete: function (paymentResult, options) {
            //Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.
            //например вызов вашей аналитики Facebook Pixel
          },
        }
      );
    }
    pay();
  }, []);

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
