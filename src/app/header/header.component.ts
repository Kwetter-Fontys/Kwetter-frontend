import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  userId: string;
  urlId: string;
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
  }

  logout(): void
  {
      this.authService.logout();
      console.log("yo");
  }

}
