import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ProductPropertiesInterface } from "../interface/product-properties.interface";
import axios from "axios";
import { environment } from "../../environments/environment";


@Injectable({ providedIn: 'root' })
export class ProductPropertiesService {
    private currentUserSubject = new BehaviorSubject<ProductPropertiesInterface | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    async add ( name: string , brand: string, type: string, shop: string, min_quantity: number, base_unity : string): Promise<void> {
       const token = localStorage.getItem('token');

        try {
            const response = await axios.post(
            `${environment.api}/shop/service/add`,
            { name, brand, type, shop, min_quantity, base_unity },
            {
                headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error: any) {3
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