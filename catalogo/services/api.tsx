// api.tsx
// Importa o axios
 import axios from "axios";
// Cria uma instância com a URL base da API
const api = axios.create({
  baseURL: "https://dummyjson.com/products",
});

export default api;
