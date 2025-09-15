import axios from "axios";
import { handleError, setupErrorInterceptor } from "../utils/errorHandler.js";
import config from "../config/config.js";

const API_BASE_URL = config.getApiBaseUrl();

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: false,
  timeout: 30000,
});

// Setup error interceptor
setupErrorInterceptor(api);

const getToken = () => localStorage.getItem("accessToken") || localStorage.getItem("token") || "";
const getRefreshToken = () => localStorage.getItem("refreshToken") || "";
const getPhone = () => localStorage.getItem("phone") || "";

export const isTokenValid = () => {
  const token = getToken();
  if (!token) return false;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp > currentTime;
  } catch (error) {
    console.error("Error validating token:", error);
    return false;
  }
};

export const clearAuthData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("phone");
};

export const debugToken = () => {
  const token = getToken();
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error("Error parsing token:", error);
    }
  }
};

const normalizePhone = (phone) => {
  phone = phone.trim().replace(/\D/g, '');
  if (phone.startsWith('0')) {
    return '+966' + phone.slice(1);
  } else if (phone.startsWith('5')) {
    return '+966' + phone;
  } else if (phone.startsWith('00966')) {
    return '+' + phone.slice(2);
  } else if (phone.startsWith('966')) {
    return '+966' + phone.slice(3);
  }
  return phone;
};

export const signupUser = async (data) => {
  try {
    const normalizedPhone = normalizePhone(data.phone);
    
    const res = await api.post("/auth/register", {
      ...data,
      phone: normalizedPhone,
      user_source: "dashboard",
    });

    return { data: res.data, phone: normalizedPhone };
  } catch (error) {
    const message = handleError(error);
    throw new Error(message);
  }
};
export const loginUser = async (data) => {
  try {
    const normalizedPhone = normalizePhone(data.phone);
    await api.post("/auth/login", { ...data, phone: normalizedPhone });

    localStorage.setItem("phone", normalizedPhone);
    return { success: true };
  } catch (error) {
    const message = handleError(error);
    throw new Error(message);
  }
};

export const verifyOTP = async ({ otp, phone }) => {
  try {
    const phoneToUse = normalizePhone(phone || getPhone());
    const res = await api.post("/auth/verify-otp", { phone: phoneToUse, otp });

    if (res.data.access_token) {
      localStorage.setItem("accessToken", res.data.access_token);
      localStorage.setItem("token", res.data.access_token); // Backward compatibility
    }
    if (res.data.refresh_token) {
      localStorage.setItem("refreshToken", res.data.refresh_token);
    }
    return res.data;
  } catch (error) {
    const message = handleError(error);
    throw new Error(message);
  }
};

export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  try {
    const res = await api.post("/auth/refresh", {
      refresh_token: refreshToken,
    });

    if (res.data.access_token) {
      localStorage.setItem("accessToken", res.data.access_token);
      localStorage.setItem("token", res.data.access_token); // Backward compatibility
      return res.data.access_token;
    }
    throw new Error("Invalid refresh response");
  } catch (error) {
    clearAuthData();
    throw new Error("Failed to refresh token");
  }
};

// Helper function to make authenticated API calls with automatic token refresh
const makeAuthenticatedRequest = async (requestFn) => {
  const token = getToken();
  
  if (!token) {
    throw new Error("No authentication token found. Please log in again.");
  }
  
  if (!isTokenValid()) {
    // Try to refresh the token
    try {
      await refreshAccessToken();
    } catch (error) {
      clearAuthData();
      throw new Error("Authentication token has expired. Please log in again.");
    }
  }
  
  try {
    return await requestFn();
  } catch (error) {
    if (error.response?.status === 401) {
      // Token might be invalid, try to refresh once more
      try {
        await refreshAccessToken();
        return await requestFn();
      } catch (refreshError) {
        clearAuthData();
        throw new Error("Authentication expired. Please log in again.");
      }
    }
    throw error;
  }
};

export const fetchProducts = async () => {
  return makeAuthenticatedRequest(async () => {
    const token = getToken();
    const res = await api.get("/products/mine", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data: res.data };
  });
};

export const addProduct = async (formData) => {
  return makeAuthenticatedRequest(async () => {
    const token = getToken();
    const res = await api.post("/products/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return { data: res.data };
  });
};

export const updateProduct = async (id, formData) => {
  return makeAuthenticatedRequest(async () => {
    const token = getToken();
    const res = await api.put(`/products/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return { data: res.data };
  });
};

export const deleteProduct = async (id) => {
  return makeAuthenticatedRequest(async () => {
    const token = getToken();
    const res = await api.delete(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data: res.data };
  });
};

export const fetchOrders = async () => {
  return makeAuthenticatedRequest(async () => {
    debugToken();
    const token = getToken();
    const res = await api.get("/orders/by-owned-products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data: res.data };
  });
};

export const checkProductAuction = async (productId) => {
  try {
    return await makeAuthenticatedRequest(async () => {
      const token = getToken();
      const res = await api.get(`/auctions/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { data: res.data, hasAuction: true };
    });
  } catch (error) {
    if (error.response?.status === 404) {
      return { data: null, hasAuction: false };
    }
    
    // Only log and throw for unexpected errors
    console.error("Unexpected error checking product auction:", error.response?.data || error.message);
    throw error;
  }
};

export const removeProductAuction = async (productId) => {
  return makeAuthenticatedRequest(async () => {
    const token = getToken();
    const res = await api.delete(`/auctions/product/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data: res.data };
  });
};
