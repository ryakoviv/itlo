import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  form = new FormGroup({
    'email': new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    'password': new FormControl('', [Validators.required]),
  });

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.auth.isLogged()) {
      this.goToDashboardPage();
    }
  }

  setInvalidCredentials() {
    this.form.setErrors({invalidCredentialsError: true});
  }

  setServerUnknownError() {
    this.form.setErrors({serverUnknownError: true});
  }

  get email() { return this.form.get('email'); }

  get password() { return this.form.get('password'); }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Email cannot be blank' :
      this.email.hasError('email') ? 'Please enter a valid email address' : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'Password cannot be blank' : '';
  }

  getFormErrorMessage() {
    return this.form.hasError('invalidCredentialsError') ? 'Incorrect email or password' :
      this.form.hasError('serverUnknownError') ? 'Ops, something wend wrong' : '';
  }

  goToDashboardPage() {
    this.router.navigate(['user/account']);
  }

  submit(e) {
    e.preventDefault();
    if (this.email.valid && this.password.valid) {
      this.auth.login(this.email.value, this.password.value).subscribe(data => {
        this.goToDashboardPage();
      }, error => {
        if (error.status === 404) {
          this.setInvalidCredentials();
        } else {
          this.setServerUnknownError();
        }

      });
    }
  }

}
