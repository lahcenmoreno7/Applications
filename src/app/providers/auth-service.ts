import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppSettings } from "../constants/constants";
import { Http, Headers } from '@angular/http';


export interface IRequestOptions {
    headers?: HttpHeaders | { [header: string]: string | Array<string> };
  }


@Injectable({
  providedIn: "root"
})
export class ApiAuthService {
 
  private url = AppSettings.API_ENDPOINT;

  constructor( private http: HttpClient ) {}

  

  public login(credentials, type) {

    return new Promise ((resolve, reject) => {
        const options: IRequestOptions = {
          headers: new HttpHeaders({"Content-Type": "application/json"})
        };
  
        this.http.post(this.url + type, JSON.stringify(credentials), options)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
      });
  }


  public logout(params: any) {
    return this.http.post(this.url + "logout", params);
  }


}