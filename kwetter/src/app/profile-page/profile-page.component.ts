import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  urlId!: any;
  user: User;

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

    this.getUser(this.urlId);
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

}
