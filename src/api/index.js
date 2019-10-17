import axios from 'axios';

const rootUrl = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
    baseURL: rootUrl,
});

// export const makeData = () => axiosInstance.post(
//     '/addresses',
//     {
//         "user_id": "da9196a7-11bc-4b54-98c0-53699dbea942",
//         "street_one": "13 Itte Road",
//         "city": "Raleigh",
//         "state": "NC",
//         "zip_code": "27601"
//     }
// )

// axiosInstance.post('/addresses/ea8630f0-eef2-11e9-92cc-51edf7fd79ed/restore')
export const getAddresses = (userId) => axiosInstance.get(
    `/users/${userId}/addresses`,
);

export const getEvents = (address_id) => axiosInstance.get(
    `/addresses/${address_id}/events`,
);

export const getAddressVersion = (endpoint) => axiosInstance.get(endpoint);
