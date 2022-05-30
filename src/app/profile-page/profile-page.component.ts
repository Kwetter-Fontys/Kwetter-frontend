import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { TweetService } from 'src/app/services/tweet.service';
import { Tweet } from 'src/app/interfaces/Tweet';
import { AuthService } from '../auth/service/auth.service';
import { Likes } from '../interfaces/Likes';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  constructor(private userService: UserService, private tweetService: TweetService, private route: ActivatedRoute, private authService: AuthService) { }

  urlId!: any;
  userId: string;
  user: User;
  followings: User[];
  followers: User[];
  tweets: Tweet[];
  editing: boolean = false;
  loggedIn: boolean = false;
  liked: boolean = false;
  isFollowed: boolean = false;

  ngOnInit(): void 
  {
    this.userId = this.authService.loadUserProfile()["__zone_symbol__value"]["id"];
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

  async getAll(id:string): Promise<void>
  {
    this.getUser(id);
    this.getTweets(id);
    this.getFollowers(id);
    this.getFollowings(id);
  }

  async getUser(id: string): Promise<void>
  {
    this.userService.readSingleUser(id).subscribe(user => 
      {
        this.user = user
      });
  }

  async getTweets(id: string): Promise<void>
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

  async getFollowings(id: string): Promise<void>
  {
    this.userService.getFollowers(id).subscribe(following => 
      {
        this.followers = following
        following.forEach(flwr => {
          if(flwr.id == this.userId)
          {
            this.isFollowed = true;
          }
        });
      });
  }

  async getFollowers(id: string): Promise<void>
  {
    this.userService.getFollowings(id).subscribe(follower => 
      {
        this.followings = follower
      });
  }


  likeTweet(tweetId: number)
  {
    this.tweetService.likeTweet(tweetId).subscribe(tweet => 
      {
        this.tweets.forEach(twit => 
        {
          if(twit.id == tweet.id)
          {
            twit = tweet;
          }

        for (let index = 0; index < this.tweets.length; index++) 
        {
          if(this.tweets[index].id == tweet.id)
          {
            this.tweets[index] = tweet;
          }
        }
        });
      });
      this.liked = true;
  }

  createTweet(form)
  {
    this.tweetService.createTweet(form.value.content, this.urlId).subscribe(
      res=>
      {
        this.tweets = [res].concat(this.tweets);
      }
    );
  }

  checkIfTweetIsLiked(tweet: Tweet): boolean
  {
    return tweet.likes.some(e => e.user == this.userId);
  }

  followUser()
  {
    this.userService.followUser(this.urlId).subscribe(res =>
      {
        this.isFollowed = true;
      });
  }

  unfollowUser()
  {
    this.userService.unfollowUser(this.urlId).subscribe(res =>
      {
        this.isFollowed = false;
      });
  }


  deleteUser()
  {
    this.userService.keycloakDeleteUser(this.userId);
    this.userService.deleteUser(this.userId).subscribe(res =>
      {
        //this.authService.logout();
      });
  }
}


