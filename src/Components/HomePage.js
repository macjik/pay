import Form from './Form';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';

const HomePage = () => {
  const [paymentData, setPaymentData] = useState('');

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
      window.Telegram.WebApp.WebAppUser,
      window.Telegram.WebApp.WebAppInitData,
    ]);
    console.log(paymentData);
  }, []);

  useEffect(() => {
    const standartTariffRequest = async () => {
      try {
        const response = await axios.post('http://localhost:3010/');
        console.log(response.data);
        setPaymentData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    standartTariffRequest();
  }, []);

  useEffect(() => {
    const handleCheckout = async () => {
      // https://developers.cloudpayments.uz/#ustanovka-vidzheta
      if (paymentData) {
        try {
          const payments = new window.cp.CloudPayments();

          payments.oncomplete = (result) => {
            console.log('result', result);
          };
          payments
            .pay('charge', {
              publicId: 'pk_27a0fa56dbdd6c3825efe5664f40d',
              description: paymentData.description,
              amount: paymentData.amount,
              currency: 'UZS',
              invoiceId: paymentData.invoiceId,
            })
            .then((result) => {
              console.log('result', result);
            });
        } catch (error) {
          console.log(error);
        }
      }
    };
    handleCheckout();
  }, [paymentData]);

  // const recieveReciept = async () => {
  //   try {
  //     const requestRecieptURL = await axios.post(
  //       "http://localhost:3010/receipt"
  //     );
  //     // let receipt = requestReciept;

  //     // const data = {};
  //     // data.CloudPayments = {
  //     //   CustomerReceipt: receipt, // Онлайн-чек
  //     // };
  //     console.log(requestRecieptURL.data);

  //     // const receipt = await axios.post(
  //     //   requestRecieptURL.data.Model.ReceiptLocalUrl
  //     // );
  //     // console.log(receipt);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  // recieveReciept();

  return <></>;
};

export default HomePage;
