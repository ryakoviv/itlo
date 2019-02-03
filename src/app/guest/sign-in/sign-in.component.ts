import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../core/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  // email = new FormControl(null,
  //   {
  //   validators: [Validators.required, Validators.email],
  //   updateOn: 'submit'
  // });
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  invalidCredentials = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.auth.isLogged()) {
      this.goToDashboardPage();
    }
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Email cannot be blank' :
      this.email.hasError('email') ? 'Please enter a valid email address' : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'Password cannot be blank' : '';
  }

  goToDashboardPage() {
    this.router.navigate(['dashboard']);
  }

  submit(e) {
    e.preventDefault();
    if (this.email.valid && this.password.valid) {
      this.auth.login(this.email.value, this.password.value).subscribe(data => {
        this.goToDashboardPage();
      }, error => { this.invalidCredentials = true; });
    }
  }

}
