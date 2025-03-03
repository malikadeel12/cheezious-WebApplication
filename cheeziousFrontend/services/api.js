import axios from "axios";

export const API = axios.create({
    baseURL: "http://localhost:8002"
});

export const getOrders = () => API.get("/orders/orderdata");
export const signup = (userData) => API.post("/users/signup", userData);
export const login = (loginData) => API.post("/users/login", loginData);
export const additem = (itemData) => API.post("/items/add", itemData);
export const getitem = (itemData) => API.post("/items/all", itemData);
export const updateitem = (itemData) => API.post("/items/update", itemData);
export const deleteitem = (itemData) => API.post("/items/delete", itemData);
export const postorder = (orderdata) => API.post("/orders/orderdata", orderdata);






