import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import { User } from '.././interfaces/User';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class UserService {
  options: any;
  api_loc: string;
  
  constructor(private http: HttpClient) { 
    this.options = 
    {
      "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": ""
      }
    };
    this.api_loc = environment.userApiUrl + "usercontroller";
  }
  
  getAllUsers(): Observable<User[]>
  {
    return this.http.get<User[]>(`${this.api_loc}`, <Object>this.options);
  }

  readSingleUser(id: string): Observable<User>
  {
    return this.http.get<User>(`${this.api_loc}/${id}`, <Object>this.options);
  }

  updateUser(id: string, user: User): Observable<User>
  {
    return this.http.put<User>(`${this.api_loc}/${id}`, user, <Object>this.options);
  }

  getFollowers(id: string): Observable<User[]>
  {
    return this.http.get<User[]>(`${this.api_loc}/followers/${id}`, <Object>this.options);
  }

  getFollowings(id: string): Observable<User[]>
  {
    return this.http.get<User[]>(`${this.api_loc}/followings/${id}`, <Object>this.options);
  }

  followUser(followUserId: string): Observable<string>
  {
    return this.http.put<string>(`${this.api_loc}/follow/${followUserId}`, <Object>this.options);
  }

  unfollowUser(followUserId: string): Observable<string>
  {
      return this.http.put<string>(`${this.api_loc}/unfollow/${followUserId}`, <Object>this.options);
  }

  deleteUser(userId: string): Observable<User>
  {
      return this.http.delete<User>(`${this.api_loc}/${userId}`, <Object>this.options);
  }
}
