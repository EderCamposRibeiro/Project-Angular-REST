import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

    login(user){
      /*return this.http.post(url, data)*/ 
      return this.http.post(AppConstants.baseLogin, JSON.stringify(user)).subscribe(data => {

        /*Http return*/

        var token = JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1];

        localStorage.setItem("token", token);

        //console.info("Token: " + localStorage.getItem("token"));

      },
        error => {
          console.error("Login Error!");
          alert('Access denied!')
        }
      ) 
    }
}
