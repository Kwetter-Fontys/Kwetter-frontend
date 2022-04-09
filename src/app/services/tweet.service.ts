import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Tweet } from '.././interfaces/tweet';

@Injectable({
  providedIn: 'root'
})
export class TweetService {
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
    this.api_loc = environment.tweetApiUrl + "tweetcontroller";
  }

  readTweets(tweetId: number): Observable<Tweet[]>
  {
    return this.http.get<Tweet[]>(`${this.api_loc}/${tweetId}`, <Object>this.options);
  }

  createTweet(content: string, userId: number): Observable<Tweet>
  {
    return this.http.post<Tweet>(`${this.api_loc}`,  {"content": content, "user": userId}, <Object>this.options);
  }

  likeTweet(tweetId: number, userId: number): Observable<Tweet>
  {
    return this.http.put<Tweet>(`${this.api_loc}/${tweetId}?userId=${userId}`, <Object>this.options);
  }
}
