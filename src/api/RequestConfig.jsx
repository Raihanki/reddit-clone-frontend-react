import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/v1/",
  //   timeout: 5000,
  withCredentials: true,
});

// Fungsi untuk menambahkan header otentikasi ke permintaan
const addAuthHeader = () => {
  const token = localStorage.getItem("authToken");
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
};

// Tambahkan interceptor untuk memanggil addAuthHeader sebelum setiap permintaan
instance.interceptors.request.use((config) => {
  addAuthHeader();
  return config;
});

export default instance;
