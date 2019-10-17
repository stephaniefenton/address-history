import axios from 'axios';

const rootUrl = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
    baseURL: rootUrl,
});

export const getAddresses = (userId) => axiosInstance.get(
    `/users/${userId}/addresses`,
);

export const getEvents = (address_id) => axiosInstance.get(
    `/addresses/${address_id}/events`,
);

export const getAddressVersion = (endpoint) => axiosInstance.get(endpoint);
