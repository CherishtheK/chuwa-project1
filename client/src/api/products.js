import api from './base';

export const getProducts = (params) => api.get('/products', {params});
export const getProductById = (id) => api.get(`/products/${id}`);
export const createProduct = (data, token) => api.post('/products', data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
export const editProduct = (id, data, token) => api.put(`/products/${id}`, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
export const deleteProduct = (id, token) => api.delete(`/products/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
