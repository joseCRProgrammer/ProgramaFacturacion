import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })

  export class FacturaService {
    public urlBase  
    constructor(private http: HttpClient) {
        this.urlBase = 'http://localhost:8000/api/';
      }
     
      saveFactura(data:any): Observable<any> {
        return this.http.post<any>(`${this.urlBase}factura`,data);
      }


      
      
  }