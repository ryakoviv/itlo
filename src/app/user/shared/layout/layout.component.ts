import { Component, OnInit } from '@angular/core';
import {User} from '../../../core/user.interface';
import {AuthService} from '../../../core/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  user: User;

  constructor(protected auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.auth.getCurUser().subscribe(data => this.user = data);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/guest/sign-in']);
  }

}
