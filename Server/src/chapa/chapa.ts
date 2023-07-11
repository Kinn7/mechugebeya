import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

const BASE_URL = 'https://api.chapa.co/v1';
const INTIALIZE_PATH = '/transaction/initialize';
const VERIFY_PATH = '/transaction/verify/';
const SUBACCOUNT = '/subaccount';

interface CustomerInfo {
  amount: number;
  currency: string;
  email: string;
  first_name: string;
  last_name: string;
  tx_ref?: string;
  customization?: Record<string, unknown>;
}

interface Options {
  autoRef?: boolean;
}

export default class Chapa {
  secret_key: string;

  constructor(secret_key: string) {
    this.secret_key = secret_key;
  }

  /**
   *
   * @param {object} customerInfo customer information, refer: https://developer.chapa.co/docs/accept-payments/
   * @param {object} [options]
   *
   * @returns Promise
   */
  initialize(customerInfo: CustomerInfo, options: Options = {}) {
    var required_fields = [
      'amount',
      'currency',
      'email',
      'first_name',
      'last_name',
    ];
    let errors: string[] = [];
    required_fields.forEach((field) => {
      if (!customerInfo[field])
        errors.push('field: ' + field + ' is required!');
    });

    if (!options.autoRef && !customerInfo['tx_ref'])
      errors.push(
        "field: tx_ref is required! or pass '{autoRef: true}' to the options"
      );
    if (errors.length) throw new Error(errors.join(', '));

    Object.keys(customerInfo.customization || {}).forEach((field) => {
      customerInfo[`customization[${field}]`] =
        customerInfo.customization[field];
    });
    delete customerInfo.customization;

    return new Promise((resolve, reject) => {
      const tx_ref = customerInfo.tx_ref || uuidv4();
      fetch(BASE_URL + INTIALIZE_PATH, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.secret_key,
        },
        body: JSON.stringify({
          ...customerInfo,
          tx_ref,
        }),
      })
        .then(async (response) => {
          let apiResponse = await response.json();
          apiResponse = { ...apiResponse, tx_ref };
          if (response.status != 200) return reject(apiResponse);
          resolve(apiResponse);
        })
        .catch((e) => reject(e));
    });
  }

  /**
   *
   * @param {string} txnRef transaction reference, refer https://developer.chapa.co/docs/verify-payments/
   * @returns Promise
   */
  verify(txnRef: string) {
    if (!txnRef) throw new Error('Transaction reference is required!');
    return new Promise((resolve, reject) => {
      fetch(BASE_URL + VERIFY_PATH + txnRef, {
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + this.secret_key,
        },
      })
        .then(async (response) => {
          if (response.status != 200) return reject(await response.json());
          resolve(await response.json());
        })
        .catch((e) => reject(e));
    });
  }
}
