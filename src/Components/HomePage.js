import Form from "./Form";
import { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  const [ID, setID] = useState("");

  const handleOnAdd = async (event) => {
    setID(event);
  };

  useEffect(() => {
    console.log(ID);
    const handleCheckout = async () => {
      try {
        const payments = new window.cp.CloudPayments();

        payments.oncomplete = (result) => {
          console.log("result", result);
        };

        payments
          .pay("charge", {
            publicId: ID.publicId,
            description: "Оплата товаров в course.com",
            amount: 100,
            currency: "UZS",
            invoiceId: 1234567,
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
      const requestReciept = await axios.post("http://localhost:3010/receipt");
      let receipt = requestReciept;

      const data = {};
      data.CloudPayments = {
        CustomerReceipt: receipt, // Онлайн-чек
      };
      console.log(requestReciept);
      console.log(data);
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
