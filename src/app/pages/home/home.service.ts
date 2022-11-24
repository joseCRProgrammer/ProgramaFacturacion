import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })

  export class HomeService {
    public urlBase  
    constructor(private http: HttpClient) {
        this.urlBase = 'http://localhost:8000/api/';
      }

      getAllClientes(): Observable<any> {
        return this.http.get<any>(`${this.urlBase}clientes`);
      }

      saveCliente(data:any): Observable<any> {
        return this.http.post<any>(`${this.urlBase}clientes`,data);
      }

      deleteCliente(data:any): Observable<any> {
        return this.http.put<any>(`${this.urlBase}clientes`,data);
      }

      
      
  }