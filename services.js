'use strict'
var jsdom = require("jsdom")
const { JSDOM } = jsdom;

var axios = require('axios'); 
const qs = require('qs');
var config = require('./config');

async function getBalance() {
  try {
    const response = config.balance;
    console.log(response);
	return response;
  } catch (error) {
    console.error(error);
  }
}

async function getBank(iban) {
  try {
				return axios.post('https://transferwise.com/us/iban/checker', qs.stringify({ 'userInputIban': iban }))
				.then((response) => {
						
						var dom	= new JSDOM("`"+response.data+"`");
						var imgElement = dom.window.document.querySelectorAll("img");
						console.log(imgElement)
						var bankName ="AE PSC.";
						var bankLogo = "https://dq8dwmysp7hk1.cloudfront.net/logos/mashreq.svg";
						for (var i = 0; i < imgElement.length; i++) {
							console.log(imgElement[i].getAttribute("src"));
							if(imgElement[i].querySelector(".bank-logo"))
							{
								(bankLogo = (imgElement[i].getAttribute("src")));
								 bankName = imgElement[i].getAttribute("alt");
							}
							
						}
						response = {bankName, bankLogo};
						return response;
				})
				.catch(function (error) {
					console.log(error);
					return error;
				})
				.finally(function () {
					console.log("Bank Details what we provide is an authorized information.")
				});
	
  } catch (error) {
    console.error(error);
	throw error;
  }
}
   
async function doTransfer()
{
  axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

/**
 * @description
 * Service object to expose required functions
 */

var serviceObject = {
  "getBalance":getBalance,
  "getBank":getBank,
  "doTransfer":doTransfer
}

/**
 * @description
 * used to expose the methods
 */
module.exports = serviceObject