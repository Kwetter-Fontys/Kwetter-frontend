import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';
import { User } from '../interfaces/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private route: ActivatedRoute, private authService: AuthService, private userService: UserService) { }

  userId: string;
  urlId: string;
  users: User[] = [];
  searchText = '';

  ngOnInit(): void {
    this.userId = this.authService.loadUserProfile()["__zone_symbol__value"]["id"];

    if(!this.route.snapshot.paramMap.get("id"))
    {
      this.urlId = "0"
    }
    else
    {
      this.urlId = this.route.snapshot.paramMap.get("id");
    }

    this.getAllUsers();
  }

  logout(): void
  {
      this.authService.logout();
  }

  getAllUsers()
  {
    this.userService.getAllUsers().subscribe(users =>
      {
        this.users = users;
      });
  }

}
