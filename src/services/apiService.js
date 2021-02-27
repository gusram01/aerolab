import axios from 'axios';
import CONFIG from '../config/variables';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: `Bearer ${CONFIG.TOKEN}`,
};

export const getProducts = () =>
  axios
    .get(`${CONFIG.BASE_URL}/products`, {
      headers,
    })
    .then(resp => {
      return resp.status === 200 ? resp.data : [];
    })
    .catch(err => {
      console.error(err);
      return [];
    });

export const getUserInfo = () =>
  axios
    .get(`${CONFIG.BASE_URL}/user/me`, {
      headers,
    })
    .then(resp => {
      return resp.status === 200 && resp.data;
    })
    .catch(err => {
      console.error(err);
      return undefined;
    });

export const getUserHistory = () =>
  axios
    .get(`${CONFIG.BASE_URL}/user/history`, {
      headers,
    })
    .then(resp => {
      return resp.status === 200 && resp.data;
    })
    .catch(err => {
      console.error(err);
      return undefined;
    });

export const redeemById = id =>
  axios
    .post(
      `${CONFIG.BASE_URL}/redeem`,
      {
        productId: id,
      },
      {
        headers,
      },
    )
    .then(resp => {
      return resp.status === 200;
    })
    .catch(err => {
      console.error(err);
      return false;
    });

export const chargePoints = () =>
  axios
    .post(
      `${CONFIG.BASE_URL}/user/points`,
      {
        amount: 1000,
      },
      {
        headers,
      },
    )
    .then(resp => {
      return resp.status === 200;
    })
    .catch(err => {
      console.error(err);
      return false;
    });
