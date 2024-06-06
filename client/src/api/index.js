import axios from 'axios';

const axiosInstance = axios.create({ baseURL: 'http://localhost:5000/api' });

export const getOrder = id => {console.log(id); axiosInstance.get(`/orders/${id}`)};

export const saveOrder = data => { console.log(data); return axiosInstance.post('/orders', data)} ;
