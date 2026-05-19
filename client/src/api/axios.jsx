import axios from "axios";

// CREATE INSTANCE

const api = axios.create({

  baseURL:
  import.meta.env.VITE_API_URL,

});

// REQUEST INTERCEPTOR

api.interceptors.request.use(

  (config) => {

    // GET ADMIN TOKEN

    const token =
      localStorage.getItem(
        "adminToken"
      );

    // ATTACH TOKEN

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;

  },

  (error) => {

    return Promise.reject(error);

  }

);

// RESPONSE INTERCEPTOR

api.interceptors.response.use(

  (response) => {

    return response;

  },

  (error) => {

    // AUTO LOGOUT ON 401

    if (
      error.response &&
      error.response.status === 401
    ) {

      localStorage.removeItem(
        "adminToken"
      );

      localStorage.removeItem(
        "adminData"
      );

      window.location.href =
        "/admin-login";

    }

    return Promise.reject(error);

  }

);

export default api;