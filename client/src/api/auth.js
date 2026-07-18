import api from "./base";

const API_URL = "/auth";

export const signup = async ({ email, password, isVendor }) => {
  const response = await api.post(`${API_URL}/signup`, {
    email,
    password,
    isVendor,
  });
  return response.data;
};

export const signin = async ({ email, password, isVendor }) => {
  const response = await api.post(`${API_URL}/signin`, {
    email,
    password,
    isVendor,
  });
  return response.data;
};

export const getMe = async () => {
  const response = await api.get(`${API_URL}/me`);
  return response.data;
};

export const signout = async () => {
  const response = await api.post(`${API_URL}/signout`);
  return response.data;
};

export const forgotPassword = async ({ email }) => {
  const response = await api.post(`${API_URL}/forgot-password`, { email });
  return response.data;
};
