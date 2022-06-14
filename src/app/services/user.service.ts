import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable} from "rxjs";
import { User } from '.././interfaces/User';
import { AccessToken } from '.././interfaces/Accesstoken';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/service/auth.service';
@Injectable({
  providedIn: 'root'
})

export class UserService {
  options: any;
  api_loc: string;
  
  constructor(private http: HttpClient,  private authService: AuthService) { 
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

  keycloakDeleteUser(userId: string) : void
  {
    let options = 
    {
      "headers": {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    const body = new HttpParams({
    
      fromObject: {
      grant_type: "password",
      client_id: "Kwetter-frontend",
      username: "userService",
      password: "fh9!x?YN4AQ&!skt"
      }
    });
    this.http.post("https://keycloak.sebananasprod.nl/auth/realms/kwetter/protocol/openid-connect/token", body, options).subscribe(res =>
    {
      console.log(res['access_token']);
      let options2 = 
      {
        "headers": {
          "Authorization": "Bearer " + res['access_token']
      }
      };
      this.http.delete("https://keycloak.sebananasprod.nl/auth/admin/realms/kwetter/users/" + userId, options2).subscribe(res =>
      {
        this.authService.logout();
      })
    });

  }
  deleteUser(userId: string): Observable<User>
  {
      return this.http.delete<User>(`${this.api_loc}/${userId}`, <Object>this.options);
  }
}

