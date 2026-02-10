import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    private getAuthHeaders(): HttpHeaders {
        // In a real app, you'd verify if the backend needs a specific token mechanism.
        // For now, assume simple auth or none if not implemented in the backend yet,
        // but the recovered code used 'token' from localStorage.
        const token = localStorage.getItem('token');
        // If no token, maybe basic auth or skip? The recovered code implies a token.
        // We'll leave it as is for now.
        return new HttpHeaders({
            'Authorization': `Bearer ${token || ''}`
        });
    }

    getUserOrders(userId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/orders/user/${userId}`, { headers: this.getAuthHeaders() });
    }

    getAllOrders(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/admin/orders`, { headers: this.getAuthHeaders() });
    }

    placeOrder(userId: number, productId: number, quantity: number): Observable<any> {
        return this.http.post(`${this.apiUrl}/orders/place?userId=${userId}&productId=${productId}&quantity=${quantity}`, {}, { headers: this.getAuthHeaders() });
    }
}
