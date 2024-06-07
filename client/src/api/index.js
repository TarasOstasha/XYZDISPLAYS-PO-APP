import axios from 'axios';

const axiosInstance = axios.create({ baseURL: 'http://localhost:5000/api' });

export const getOrder = id => axiosInstance.get(`/orders/${id}`);

export const saveOrder = data => axiosInstance.post('/orders', data);

export const getProductById = id => axiosInstance.get(`/products${id}`);
