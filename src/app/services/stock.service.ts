import axios from "axios";
import { environment } from "../../environments/environment";

export class StockService {

    async get() {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.get(
                `${environment.api}/shop/service/services`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                }
            );

            return response.data;

        } catch (error: any) {
            if (error.response) {
                throw new Error(error.response.data.message || 'Erreur serveur');
            } else if (error.request) {
                throw new Error('Erreur réseau : impossible de joindre le serveur');
            } else {
                throw new Error(error.message);
            }
        }
    }

    async add(service: any, quantity: number, sale_price: number, purchase_price: number) {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post(
                `${environment.api}/shop/stock/add`,
                { service, quantity, sale_price, purchase_price },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                }
            );

            return response.data.message;

        } catch (error: any) {
            if (error.response) {
                throw new Error(error.response.data.message || 'Erreur serveur');
            } else if (error.request) {
                throw new Error('Erreur réseau : impossible de joindre le serveur');
            } else {
                throw new Error(error.message);
            }
        }
    }
}
