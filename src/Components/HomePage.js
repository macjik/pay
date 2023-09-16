import Form from './Form';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';

const HomePage = () => {
  const { id } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const [result, setResult] = useState('');

  // useEffect(() => {
  // console.log(window.Telegram.WebApp.version);
  // console.log(window.Telegram.WebApp.initData);
  // console.log(window.Telegram.WebApp.query_id);
  // console.log(window.Telegram.WebApp.WebAppInitData);
  // console.log(window.Telegram.WebApp.WebAppUser);
  // window.Telegram.WebApp.sendData([
  //   window.Telegram.WebApp.version,
  //   window.Telegram.WebApp.initData,
  //   window.Telegram.WebApp.query_id,
  //   window.Telegram.WebApp.WebAppUser,
  //   window.Telegram.WebApp.WebAppInitData,
  // ]);
  // }, []);

  useEffect(() => {
    const handleCheckout = async () => {
      const description = queryParams.get('description');
      const amount = queryParams.get('amount');
      const invoiceId = queryParams.get('invoiceid');
      // https://developers.cloudpayments.uz/#ustanovka-vidzheta
      try {
        const payments = await new window.cp.CloudPayments();

        payments.oncomplete = async (result) => {
          console.log('result', result);
          let paymentResult = await axios.post('http://localhost:3010/result', {
            result,
          });
          console.log(paymentResult);
        };
        await payments
          .pay('charge', {
            publicId: 'pk_27a0fa56dbdd6c3825efe5664f40d',
            description: description,
            amount: parseInt(amount, 10),
            currency: 'UZS',
            invoiceId: parseInt(invoiceId, 10),
          })
          .then((result) => {
            console.log('result', result);
          });
      } catch (error) {
        console.log(error);
      }
    };
    handleCheckout();
  }, []);

  // const sendPaymentResult = async () => {
  // console.log(result);
  //   let paymentResult = await axios.post('http://localhost:3010/result', {
  //     result,
  //   });
  //   console.log(paymentResult);
  // };
  // sendPaymentResult();

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
