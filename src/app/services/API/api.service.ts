import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl: string;

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Accept', 'application/json');

  nHeaders = new HttpHeaders()
    .set(
      'enctype',
      'multipart/form-data; boundary=----WebKitFormBoundaryuL67FWkv1CA'
    )
    .set('Accept', 'application/json');

  constructor(public http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  get(endpoint: string, filter?: any) {
    return this.http.get(this.apiUrl + endpoint, { params: <any>filter });
  }

  post(endpoint: string, body?: any, headers?: HttpHeaders) {
    return this.http.post(this.apiUrl + endpoint, body, {
      headers: headers ? headers : this.headers,
      responseType: 'json',
    });
  }

  getAuth(endpoint: string, token?: string) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.get(this.apiUrl + endpoint, {
      headers: headers,
      responseType: 'json',
    });
  }

  put(endpoint: string, body: any, headers?: HttpHeaders) {
    return this.http.put(this.apiUrl + endpoint, body, {
      headers: headers ? headers : this.headers,
      responseType: 'json',
    });
  }

  delete(endpoint: string, headers?: HttpHeaders) {
    return this.http.delete(this.apiUrl + endpoint, {
      headers: headers ? headers : this.headers,
      responseType: 'json',
    });
  }

  patch(endpoint: string, body: any, headers?: HttpHeaders) {
    return this.http.patch(this.apiUrl + endpoint, body, {
      headers: headers ? headers : this.nHeaders,
      responseType: 'json',
    });
  }
}
