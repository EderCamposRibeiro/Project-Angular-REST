import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  getUserList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl);
  }

  getProfessionList(): Observable<any> {
      return this.http.get<any>(AppConstants.getBaseUrlPath + 'profession/');
  }

  getUserListPage(page): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl + 'page/' + page);
  }

  getUser(id): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl + id );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(AppConstants.baseUrl + id, { responseType: 'text' });
  }

  // http://localhost:8080/projectspringrestapi/users/userByName/eder
  findUser(name: string): Observable<any> {
    return this.http.get(AppConstants.baseUrl + 'userByName/' + name);
  }

  findUserByPage(name: string, page: number): Observable<any> {
    return this.http.get(AppConstants.baseUrl + 'userByName/' + name + '/page/' + page);
  }

  saveUser(user): Observable<any> {
    return this.http.post<any>(AppConstants.baseUrl, user);
  }

  updateUser(user): Observable<any> {
    return this.http.put<any>(AppConstants.baseUrl, user);
  }

  removeTelephone(id): Observable<any> {
    return this.http.delete(AppConstants.baseUrl + 'deleteTelephone/' + id, {responseType: 'text'});
  }

  userAuthenticated() {
    if (localStorage.getItem('token') !== null &&
        localStorage.getItem('token').toString().trim() !== null) {
      return true;
    } else {
      return false;
    }
  }

}














