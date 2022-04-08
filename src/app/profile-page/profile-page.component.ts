import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { TweetService } from '../services/tweet.service';
import { Tweet } from '../interfaces/tweet';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  constructor(private userService: UserService, private tweetService: TweetService, private route: ActivatedRoute) { }

  urlId!: any;
  user: User;
  followings: User[];
  followers: User[];
  tweets: Tweet[];
  editing: boolean = false;
  loggedIn: boolean = false;

  ngOnInit(): void 
  {
    if(!this.route.snapshot.paramMap.get("id"))
    {
      this.urlId = "0"
    }
    else
    {
      this.urlId = this.route.snapshot.paramMap.get("id");
    }

    this.getAll(this.urlId);
  }

  getAll(id:number): void
  {
    this.getUser(id);
    this.getTweets(id);
    this.getFollowers(id);
    this.getFollowings(id);
  }

  getUser(id: number): void
  {
    this.userService.readSingleUser(id).subscribe(user => 
      {
        this.user = user
      });
  }

  getTweets(id: number): void
  {
    this.tweetService.readTweets(id).subscribe(tweets => 
      {
        this.tweets = tweets
      });
  }
  
  updateUser(id, form)
  {
      this.userService.updateUser(id, form.value).subscribe(
        res=>
        {
          this.user = res;
        }
      );
  }

  getFollowings(id: number): void
  {
    this.userService.getFollowers(id).subscribe(following => 
      {
        this.followers = following
      });
  }

  getFollowers(id: number): void
  {
    this.userService.getFollowings(id).subscribe(follower => 
      {
        this.followings = follower
      });
  }


  likeTweet(tweetId: number, userId: number)
  {
    this.tweetService.likeTweet(tweetId,userId).subscribe(tweet => 
      {
        console.log(tweet);
      });
  }
}
