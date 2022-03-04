import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { Favourite } from 'src/app/models/favourite';
import { catchError, take } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { AuthData, AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  baseURL = 'http://localhost:4201/api/movies-popular';
  movies: Movie[] | undefined;
  preferiti: Movie[] | undefined;
  liked: boolean = false;
  favoritesCounter = 0;
  constructor(private http: HttpClient, private authSrv: AuthService) {}

  async buttaFilm(): Promise<void> {
    const user: AuthData = (await this.authSrv.user$
      .pipe(take(1))
      .toPromise()) as AuthData;
    console.log(user.accessToken);

    const movies = await this.http
      .get<Movie[]>('http://localhost:4201/api/movies-popular')
      .toPromise();
    console.log(user.accessToken);
    this.movies = movies;
    if (!this.preferiti) {
      this.getFavourite();
    }
  }

  async addFavorite(movie: Movie) {
    this.favoritesCounter++;
    movie.like = true;
    let count = 0;
    const user: AuthData = (await this.authSrv.user$
      .pipe(take(1))
      .toPromise()) as AuthData;
    const data: Favourite = {
      movieId: movie.id,
      userId: user.user.id,
      id: count++,
    };
    console.log(data);
    return this.http.post<Favourite>(
      'http://localhost:4201/api/favourites',
      data
    );
  }

  async getFavourite(): Promise<void> {
    this.preferiti = [];
    const user: AuthData = (await this.authSrv.user$
      .pipe(take(1))
      .toPromise()) as AuthData;
    this.http
      .get<Favourite[]>(
        `http://localhost:4201/api/favourites?userId=${user.user.id}`
      )
      .subscribe(async (res) => {
        console.log(res);
        console.log(this.movies);
        await this.buttaFilm();
        for (let i of res) {
          for (let j of this.movies!) {
            if (i.movieId == j.id) {
              this.preferiti!.push(j);
              this.preferiti![this.preferiti!.indexOf(j)].codicePreferito = i.id;
              j.like = true;
            }
          }
        }
        console.log(this.preferiti);
      });
  }
  async removeFavourite(movie: Movie) {
    const user: AuthData = (await this.authSrv.user$
      .pipe(take(1))
      .toPromise()) as AuthData;
    console.log(user.accessToken);
    movie.like = false;

    this.http
      .delete(`http://localhost:4201/api/favourites/${movie.codicePreferito}`)
      .subscribe();
  }

  private getErrorMess(status: number) {
    let mess = '';
    switch (status) {
      case 404:
        mess = 'errore nella chiamata';
        break;

      default:
        mess = 'qualcosa non va controlla la connessione';
        break;
    }
    return mess;
  }
}
