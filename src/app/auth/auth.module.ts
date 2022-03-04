import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPage } from './login.page';
import { SignupPage } from './signup.page';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
 import { TokenInterceptor } from './token.interceptor';



@NgModule({
  declarations: [
    LoginPage,
    SignupPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path:'',
        component:LoginPage
      },
      {
        path:'signup',
        component:SignupPage
      }
    ])
  ],
  providers:[
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true
    }
  ]
})
export class AuthModule { }
