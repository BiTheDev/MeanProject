import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  activities = [];  // angie populate
  locations = [];

  constructor(private _http: HttpClient) { }



  getUser(id){
    // gets a user
  }

  getUsers(){
    // gets all users
  }

  createDate(id, body){
    // creates a date
  }

  updateUser(id, body){
    // patches a user
  }
}
