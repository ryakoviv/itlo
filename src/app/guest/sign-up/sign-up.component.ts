import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AbstractControl} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {AuthService} from '../../core/auth.service';
import {Router} from '@angular/router';
import {ServerValidationErrorInterface} from '../../core/server-validation-error.interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;
  private _serverErrors: ServerValidationErrorInterface[];

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.auth.isLogged()) {
      this.goToDashboardPage();
    }

    this.form = new FormGroup({
      'email': new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      'username': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'password': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'confirmPassword': new FormControl('', [Validators.required]),
    }, {validators: this.checkPasswords});
  }

  checkPasswords(AC: AbstractControl) {
    const password = AC.get('password').value; // to get value in input tag
    const confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
    if (password !== confirmPassword) {
      AC.get('confirmPassword').setErrors( {matchPassword: true} );
    } else {
      return null;
    }
  }

  serverUnknownError() {
    this.form.setErrors( {serverUnknownError: true} );
  }

  set serverErrors(serverErrors: ServerValidationErrorInterface[]) {
    this._serverErrors = serverErrors;
    serverErrors.forEach((error) => {
      const field = this.form.get(error.field);
      if (field) {
        field.setErrors( {serverError: true} );
      }
    });
  }

  getServerErrorMessage(field: string) {
    for (let i = 0; i < this._serverErrors.length; i++) {
      if (field === this._serverErrors[i].field) {
        return this._serverErrors[i].message;
      }
    }
  }

  get email() { return this.form.get('email'); }

  get username() { return this.form.get('username'); }

  get password() { return this.form.get('password'); }

  get confirmPassword() { return this.form.get('confirmPassword'); }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Email cannot be blank' :
      this.email.hasError('email') ? 'Please enter a valid email address' :
        this.email.hasError('serverError') ? this.getServerErrorMessage('email') : '';
  }

  getUsernameErrorMessage() {
    return this.username.hasError('required') ? 'Username cannot be blank' :
      this.username.hasError('minlength') ? 'Username must contain at least 5 characters' :
        this.username.hasError('serverError') ? this.getServerErrorMessage('username') : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'Password cannot be blank' :
      this.password.hasError('minlength') ? 'Password must contain at least 5 characters' :
        this.password.hasError('serverError') ? this.getServerErrorMessage('password') : '';
  }

  getConfirmPasswordErrorMessage() {
    return this.confirmPassword.hasError('required') ? 'Confirm password cannot be blank' :
      this.confirmPassword.hasError('matchPassword') ? 'Confirm password must be equal to password' : '';
  }

  getFormErrorMessage() {
    return this.form.hasError('serverUnknownError') ? 'Ops, something wend wrong' : '';
  }

  goToDashboardPage() {
    this.router.navigate(['dashboard']);
  }

  submit(e) {
    e.preventDefault();
    if (this.form.valid) {
      this.auth.create(this.username.value, this.email.value, this.password.value).subscribe(data => {
        this.goToDashboardPage();
      }, error => {
        if (error.status === 422) {
          this.serverErrors = <ServerValidationErrorInterface[]>error.error;
        } else {
          this.serverUnknownError();
        }
      });
    }
  }

}
