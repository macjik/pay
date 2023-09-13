import Form from "./Form";
import { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  const [ID, setID] = useState("");

  const handleOnAdd = async (event) => {
    setID(event);
  };

  useEffect(() => {
    console.log(window.Telegram.WebApp.version);
    console.log(window.Telegram.WebApp.initData);
    console.log(window.Telegram.WebApp.query_id);
    console.log(window.Telegram.WebApp.WebAppInitData);
    console.log(window.Telegram.WebApp.WebAppUser);
    window.Telegram.WebApp.sendData([
      window.Telegram.WebApp.version,
      window.Telegram.WebApp.initData,
      window.Telegram.WebApp.query_id,
    ]);
    console.log(ID);
    const handleCheckout = async () => {
      try {
        const payments = new window.cp.CloudPayments();

        payments.oncomplete = (result) => {
          console.log("result", result);
        };
        // https://developers.cloudpayments.uz/#ustanovka-vidzheta
        payments
          .pay("charge", {
            publicId: "pk_27a0fa56dbdd6c3825efe5664f40d",
            description: "description",
            amount: 5000,
            currency: "UZS",
            invoiceId: 34234,
          })
          .then((result) => {
            console.log("result", result);
          });
      } catch (error) {
        console.log(error);
      }
    };
    handleCheckout();
  }, [ID]);

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

  return (
    <>
      <Form onAdd={handleOnAdd}></Form>
    </>
  );
};

export default HomePage;
