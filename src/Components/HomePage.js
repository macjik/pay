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
          // let paymentResult = await axios.post('http://localhost:3010/result', {
          //   result,
          // });
          // console.log(paymentResult);
          if (result.data.status === 'success') {
            recieveRequest()
          } else {
            console.error('faillled')
          }
        };
        await payments
          .pay('charge', {
            publicId: 'pk_da8fe04edb10f78e6d7602f6a687d',
            description: description,
            amount: parseInt(amount, 10),
            currency: 'UZS',
            invoiceId: parseInt(invoiceId, 10),
            cloudpayments: {
              Type: 'Income', // обязательное поле
              Inn: '535005807', // обязательное поле
              //InvoiceId: "1234567", // необязательное поле
              //AccountId: "user@example.com", // необязательное поле
              Region: 'Uzbekistan', // обязательное поле
              CustomerReceipt: {
                Items: [
                  {
                    label: description, // обязательное поле
                    price: parseInt(amount, 10), // цена одного товара, обязательное поле
                    quantity: 1, // количество товара, обязательное поле
                    amount: parseInt(amount, 1), // сумма товара (price x quantity), обязательное поле
                    vat: null, // ставка НДС, обязательное поле,
                    spic: '10602999999000000', // код ИКПУ, обязательное поле
                    packageCode: '1492981', // код упаковки, обязательное поле
                  },
                ],
                //calculationPlace: "www.test.ru", // Место осуществления расчетов, необязательное поле
                //Email: "user@example.com", // E-mail покупателя для отправки чека, необязательное поле
                amounts: {
                  Electronic: 500,
                },
              },
            },
          })
          .then((result) => {
            console.log('result', result);
          });
      } catch (error) {
        console.log(error);
      }
    };
    handleCheckout();

    const recieveRequest = async () => {
      try {
        const response = await axios.post('http://localhost:3010/pay');
        console.log(response.data);
        if (response.status !== 200) {
          throw new Error(response.status);
        }
      } catch (error) {
        console.error(error);
      }
    };

  }, []);

  // const sendPaymentResult = async () => {
  // console.log(result);
  //   let paymentResult = await axios.post('http://localhost:3010/result', {
  //     result,
  //   });
  //   console.log(paymentResult);
  // };
  // sendPaymentResult();

  const recieveReciept = async () => {
    try {
      const requestRecieptURL = await axios.post(
        'http://localhost:3010/receipt'
      );
      // let receipt = requestReciept;

      // const data = {};
      // data.CloudPayments = {
      //   CustomerReceipt: receipt, // Онлайн-чек
      // };
      console.log(requestRecieptURL.data.receiptUrl);

      // const receipt = await axios.post(
      //   requestRecieptURL.data.Model.ReceiptLocalUrl
      // );
      // console.log(receipt);
    } catch (err) {
      console.error(err);
    }
  };
  recieveReciept();

  return <></>;
};

export default HomePage;
