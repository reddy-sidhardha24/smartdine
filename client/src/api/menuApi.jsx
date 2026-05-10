import axios from "axios";

const API = "http://localhost:5000/api/menu";

export const getMenu = async () => {
  const response = await axios.get(API);
  return response.data;
};