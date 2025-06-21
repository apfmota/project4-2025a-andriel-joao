import axios from 'axios';
import { backendServerUrl } from '../config/backendIntegration';

//retorna compras que o usuário pagou
export const getPayingPurchases = async () => {
    const response = await axios.get(backendServerUrl + "/user", {withCredentials: true});
    return response.data.payingPurchases;
}

//retorna intes que o usuário está pagando
export const getPayingItems = async () => {
    const response = await axios.get(backendServerUrl + "/user", {withCredentials: true});
    return response.data.items;
}

//rertorna usuários existentes
export const getAvaibleUsers = async () => {
    const response = await axios.get(backendServerUrl + "/users", {withCredentials: true});
    return response.data.map(user => user.username);
}