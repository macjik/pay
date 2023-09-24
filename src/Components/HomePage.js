import Form from './Form';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';

const HomePage = () => {
  const { id } = useParams();
  const queryParams = new URLSearchParams(window.location.search);

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
    const Type = queryParams.get('Type');
    const Inn = queryParams.get('Inn');
    const username = queryParams.get('name');
    const InvoiceId = queryParams.get('InvoiceId');
    const AccountId = queryParams.get('AccountId');
    const Region = queryParams.get('Uzbekistan');
    const label = queryParams.get('label');
    const price = queryParams.get('price');
    const quantity = queryParams.get('quantity');
    const vat = queryParams.get('vat');
    const packageCode = queryParams.get('packageCode');
    const spic = queryParams.get('spic');
    const calculationPlace = queryParams.get('calculationPlace');
    const phone = queryParams.get('phone');
    const AgentSign = queryParams.get('AgentSign');

    // https://developers.cloudpayments.uz/#ustanovka-vidzheta
    const payments = new window.cp.CloudPayments({});

    payments.oncomplete = async (result) => {
      console.log('result', result);
      // await window.Telegram.WebApp.close();
    };
    const receipt = {
      Type: 'Income', // обязательное поле
      Inn: process.env.REACT_APP_INN, // обязательное поле
      InvoiceId: InvoiceId, // необязательное поле
      AccountId: AccountId, // необязательное поле
      Region: 'Uzbekistan', // обязательное поле
      Items: [
        //товарные позиции
        {
          label: label, //наименование товара
          price: price, //цена
          quantity: 1.0, //количество
          amount: price, //сумма
          vat: null, //ставка НДС
          method: 0, // тег-1214 признак способа расчета - признак способа расчета
          object: 0, // тег-1212 признак предмета расчета - признак предмета товара, работы, услуги, платежа, выплаты, иного предмета расчета
          // measurementUnit: 'шт', //единица измерения
          packageCode: packageCode,
          spic: process.env.REACT_APP_IKPU,
        },
        // {
        //   label: 'Наименование товара 3', //наименование товара
        //   price: 300.0, //цена
        //   quantity: 3.0, //количество
        //   amount: 900.0, //сумма
        //   vat: 20, //ставка НДС
        //   method: 0, // тег-1214 признак способа расчета - признак способа расчета
        //   object: 0, // тег-1212 признак предмета расчета - признак предмета товара, работы, услуги, платежа, выплаты, иного предмета расчета
        //   measurementUnit: 'шт', //единица измерения
        //   AgentSign: 6, //признак агента, тег ОФД 1057, 1222
        //   // AgentData: {
        //   //   //данные агента, тег офд 1223
        //   //   AgentOperationName: null, // наименование операции банковского платежного агента или банковского платежного субагента, тег ОФД 1044
        //   //   PaymentAgentPhone: null, // телефон платежного агента, тег ОФД 1073
        //   //   PaymentReceiverOperatorPhone: null, // телефон оператора по приему платежей, тег ОФД 1074
        //   //   TransferOperatorPhone: null, // телефон оператора перевода, тег ОФД 1075
        //   //   TransferOperatorName: null, // наименование оператора перевода, тег ОФД 1026
        //   //   TransferOperatorAddress: null, // адрес оператора перевода, тег ОФД 1005
        //   //   TransferOperatorInn: null, // ИНН оператора перевода, тег ОФД 1016
        //   // },
        //   PurveyorData: {
        //     //данные поставщика платежного агента,  тег ОФД 1224
        //     Phone: '+74951234567', // телефон поставщика, тег ОД 1171
        //     Name: 'ООО Ромашка', // наименование поставщика, тег ОФД 1225
        //     Inn: '1234567890', // ИНН поставщика, тег ОФД 1226
        //   },
        // },
      ],
      calculationPlace: 'https://firuzaikram.uz/rod', //место осуществления расчёта, по умолчанию берется значение из кассы
      taxationSystem: 0, //система налогообложения; необязательный, если у вас одна система налогообложения
      // email: '.com', //e-mail покупателя, если нужно отправить письмо с чеком
      phone: phone, //телефон покупателя в любом формате, если нужно отправить сообщение со ссылкой на чек
      customerInfo: username, // тег-1227 Покупатель - наименование организации или фамилия, имя, отчество (при наличии), серия и номер паспорта покупателя (клиента)
      // customerInn: '', // тег-1228 ИНН покупателя
      // isBso: false, //чек является бланком строгой отчётности
      // AgentSign: null, //признак агента, тег ОФД 1057
      amounts: {
        electronic: price, // Сумма оплаты электронными деньгами
        advancePayment: 0.0, // Сумма из предоплаты (зачетом аванса) (2 знака после запятой)
        credit: 0.0, // Сумма постоплатой(в кредит) (2 знака после запятой)
        provision: 0.0, // Сумма оплаты встречным предоставлением (сертификаты, др. мат.ценности) (2 знака после запятой)
      },
    };

    const data = {
      //содержимое элемента data
      CloudPayments: {
        CustomerReceipt: receipt, //онлайн-чек
      },
    };

    payments
      .pay('charge', {
        // options
        publicId: process.env.REACT_APP_PUBLIC_ID,
        description: label,
        amount: parseInt(price, 10),
        currency: 'UZS',
        InvoiceId: InvoiceId,
        data: data,
      })
      .then(async (result) => {
        // Объект типа WidgetResult
        console.log('result', result);
        // await window.Telegram.WebApp.close();
      });
  };
  handleCheckout();
  })
  //   //   const recieveRequest = async () => {
  //   //     try {
  //   //       const response = await axios.post('http://localhost:3010/pay');
  //   //       console.log(response.data);
  //   //       if (response.status !== 200) {
  //   //         throw new Error(response.status);
  //   //       }
  //   //     } catch (error) {
  //   //       console.error(error);
  //   //     }
  //   //   };
  //   //   recieveRequest();
  // }, []);

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
  //       'http://localhost:3010/receipt'
  //     );
  //     // let receipt = requestReciept;

  //     // const data = {};
  //     // data.CloudPayments = {
  //     //   CustomerReceipt: receipt, // Онлайн-чек
  //     // };
  //     console.log(requestRecieptURL.data.receiptUrl);

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
