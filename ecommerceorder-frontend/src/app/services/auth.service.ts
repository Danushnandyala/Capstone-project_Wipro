import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private userSubject = new BehaviorSubject<User | null>(null);
    public user$ = this.userSubject.asObservable();
    private apiUrl = `${environment.apiUrl}/auth`;

    constructor(private http: HttpClient) {
        this.restoreUser();
    }

    login(username: string, password: string): Observable<User> {
        return new Observable(observer => {
            this.http.post<User>(`${this.apiUrl}/login`, { username, password }).subscribe({
                next: (user) => {
                    this.userSubject.next(user);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    observer.next(user);
                    observer.complete();
                },
                error: (err) => observer.error(err)
            });
        });
    }

    register(user: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, user);
    }

    logout(): void {
        this.userSubject.next(null);
        localStorage.removeItem('currentUser');
    }

    getUser(): User | null {
        return this.userSubject.value;
    }

    isLoggedIn(): boolean {
        return this.userSubject.value !== null;
    }

    getRole(): string | undefined {
        return this.userSubject.value?.role;
    }

    getUsername(): string | undefined {
        return this.userSubject.value?.username;
    }

    private restoreUser(): void {
        const stored = localStorage.getItem('currentUser');
        if (stored) {
            this.userSubject.next(JSON.parse(stored));
        }
    }
}
