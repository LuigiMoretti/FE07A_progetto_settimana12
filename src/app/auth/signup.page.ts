import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
  template: `
    <div class="row justify-content-center">
      <div class="col-6">
        <div *ngIf="errorMessage" class="alert alert-danger" role="alert">
          {{errorMessage}}
        </div>
        <form #form="ngForm" (ngSubmit)="onsubmit(form)">
          <div class="form-group">
            <label for="name">Nome</label>
            <input
              ngModel
              name="name"
              class="form-control"
              type="text"
              id="name"
            />
          </div>
          <div class="form-group">
            <label for="cognome">Cognome</label>
            <input
              ngModel
              name="surname"
              class="form-control"
              type="text"
              id="cognome"
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              ngModel
              name="email"
              class="form-control"
              type="email"
              id="email"
            />
          </div>
          <div class="form-group">
            <label for="pass">Password</label>
            <input
              ngModel
              name="password"
              class="form-control"
              type="password"
              id="pass"
            />
          </div>
          <button
            class="btn btn-primary mt-3"
            [disabled]="isLoading"
            type="submit"
          >
            Registrati
            <span
              *ngIf="isLoading"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [],
})
export class SignupPage implements OnInit {
  isLoading = false;
  errorMessage = undefined
  constructor(private authSrv: AuthService, private router:Router) {}

  ngOnInit(): void {}

  async onsubmit(form: NgForm) {
    this.isLoading = true;
    console.log(form);
    try {
      await this.authSrv.signup(form.value).toPromise();
      form.reset();
      this.isLoading = false;
      this.errorMessage = undefined
      this.router.navigate(['/login'])
    } catch (error:any) {
      this.isLoading = false;
      this.errorMessage = error
      console.error(error);
    }
  }
}
