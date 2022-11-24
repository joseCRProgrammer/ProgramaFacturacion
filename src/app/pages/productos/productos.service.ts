import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })

  export class ProductosService {
    public urlBase  
    constructor(private http: HttpClient) {
        this.urlBase = 'http://localhost:8000/api/';
      }

      getAllProductos(): Observable<any> {
        return this.http.get<any>(`${this.urlBase}productos`);
      }

      saveProductos(data:any): Observable<any> {
        return this.http.post<any>(`${this.urlBase}productos`,data);
      }

      deleteProductos(data:any): Observable<any> {
        return this.http.put<any>(`${this.urlBase}productos`,data);
      }

      
      
  }