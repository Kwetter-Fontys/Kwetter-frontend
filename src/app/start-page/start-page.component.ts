import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/service/auth.service';
import { Tweet } from '../interfaces/Tweet';
import { TweetAndUser } from  '../interfaces/tweet-and-user'
import { User } from '../interfaces/User';
import { TweetService } from '../services/tweet.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {

  constructor(private userService: UserService, private tweetService: TweetService, private authService: AuthService) { }

  userId: string;
  user: User;
  followings: User[];
  followers: User[];
  followingsTweets: Tweet[] = [];
  linkedTweets: TweetAndUser[] = [];
  liked: boolean = false;
  ngOnInit(): void 
  {
    this.userId = this.authService.loadUserProfile()["__zone_symbol__value"]["id"];
    this.getAll(this.userId);
  }

  getAll(id:string): void
  {
    this.getUser(id);
    this.getFollowers(id);
    this.getFollowings(id);
  }

  getUser(id: string): void
  {
    this.userService.readSingleUser(id).subscribe(user => 
      {
        this.user = user
      });
  }

  getFollowings(id: string): void
  {
    this.userService.getFollowers(id).subscribe(following => 
      {
        this.followers = following
      });
  }

  getFollowers(id: string): void
  {
    this.userService.getFollowings(id).subscribe(follower => 
      {
        this.followings = follower

        this.followings.forEach(following => {
          this.tweetService.readTweets(following.id).subscribe(tweets => 
            {
              tweets.forEach(tweet => {
                this.linkedTweets.push({tweet: tweet, user: following})
              });
            });
        });
      });
  }

  checkIfTweetIsLiked(tweet: Tweet): boolean
  {
    return tweet.likes.some(e => e.user == this.userId);
  }

  likeTweet(tweetId: number)
  {
    this.tweetService.likeTweet(tweetId).subscribe(tweet => 
      {
        console.log(tweet)
        this.linkedTweets.forEach(twit => 
        {
          if(twit.tweet.id == tweet.id)
          {
            twit.tweet = tweet;
          }

        for (let index = 0; index < this.linkedTweets.length; index++) 
        {
          if(this.linkedTweets[index].tweet.id == tweet.id)
          {
            this.linkedTweets[index].tweet = tweet;
          }
        }
        });
      });
      this.liked = true;
  }

}
