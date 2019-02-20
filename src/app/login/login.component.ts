import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public waiting = false;

  public loginError: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = fb.group({
      email: ['', [ Validators.required, Validators.email ]],
      password: ['', [ Validators.required ]]
    });
  }

  ngOnInit() {
  }

  async onSubmit(formValue) {
    this.loginError = null;
    this.waiting = true;
    const loggedIn = await this.authService.logIn(formValue.email, formValue.password);
    this.waiting = false;
    if (loggedIn) {
      this.router.navigate(['/pledges'])
    } else {
      this.loginError = 'There was an error logging in - please try again.';
    }
  }

}
