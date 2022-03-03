import { Component, OnInit} from '@angular/core';
import { MovieService } from './features/movies/movies.service';
@Component({
  selector: 'app-root',
  template: `
  <app-navbar></app-navbar>
  <router-outlet></router-outlet>
  `,
  styles: [``]
})
export class AppComponent {

  constructor(){}


}


