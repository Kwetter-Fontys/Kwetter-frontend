import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/User';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  urlId!: any;
  user: User;
  followings: User[];
  followers: User[];

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
        console.log(following);
      });
  }

  getFollowers(id: number): void
  {
    this.userService.getFollowings(id).subscribe(follower => 
      {
        this.followings = follower
        console.log(follower);
      });
  }

}
