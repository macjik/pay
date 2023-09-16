const reciept = {
  Type: "Income", // обязательное поле
  Inn: "535005807", // обязательное поле
  //InvoiceId: "1234567", // необязательное поле
  //AccountId: "user@example.com", // необязательное поле
  Region: "Uzbekistan", // обязательное поле
  CustomerReceipt: {
    Items: [
      {
        label: "Курс 1", // обязательное поле
        price: 500, // цена одного товара, обязательное поле
        quantity: 1, // количество товара, обязательное поле
        amount: 500, // сумма товара (price x quantity), обязательное поле
        vat: null, // ставка НДС, обязательное поле,
        spic: "10602999999000000", // код ИКПУ, обязательное поле
        packageCode: "?", // код упаковки, обязательное поле
      },
    ],
    //calculationPlace: "www.test.ru", // Место осуществления расчетов, необязательное поле
    //Email: "user@example.com", // E-mail покупателя для отправки чека, необязательное поле
    AdditionalReceiptInfos: ["Вы стали обладателем права на 1% cashback"],
    amounts: {
      Electronic: 500,
    },
  },
};
