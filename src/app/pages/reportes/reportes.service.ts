import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })

  export class ReportesService {
    public urlBase  
    constructor(private http: HttpClient) {
        this.urlBase = 'http://localhost:8000/api/';
      }
     
        obtainReportes(data:any): Observable<any> {
        return this.http.post<any>(`${this.urlBase}factura/reportes`,data);
      }


      
      
  }