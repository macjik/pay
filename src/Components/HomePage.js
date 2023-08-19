import Form from "./Form";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [ID, setID] = useState("");

  const handleOnAdd = async (event) => {
    setID(event);
  };

  //   useEffect(() => {
  useEffect(() => {
    const handleCheckout = async () => {
      try {
        // const checkout = await new window.cp.Checkout({
        //   publicId: ID.id,
        //   container: document.getElementById("paymentForSample"),
        // });
        // const fieldValues = {
        //   cvv: "911",
        //   cardNumber: "8600 0000 0000 0007",
        //   expDateMonth: "12",
        //   expDateYear: "24",
        // };
        // checkout.createPaymentCryptogram(fieldValues).then((cryptogram) => {
        //   console.log(cryptogram);
        // });
        const payments = new window.cp.CloudPayments();

        payments.oncomplete = (result) => {
          console.log("result", result);
        };

        payments
          .pay("charge", {
            // options
            publicId: "pk_27a0fa56dbdd6c3825efe5664f40d",
            description: "Оплата товаров в example.com",
            amount: 123000,
            currency: "RUB",
            invoiceId: 1234567,
          })
          .then((result) => {
            // Объект типа WidgetResult
            console.log("result", result);
          });
      } catch (error) {
        console.log(error);
      }
    };

    handleCheckout();
  }, [ID]);

  return (
    <>
      <Form onAdd={handleOnAdd}></Form>
    </>
  );
};

export default HomePage;
