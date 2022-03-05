import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { Favourite } from 'src/app/models/favourite';
import { take } from 'rxjs/operators';
import { AuthData, AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  movies: Movie[] | undefined;
  preferiti: Movie[] | undefined;
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

  async getFavourite(): Promise<Movie[]> {
    let preferitiProvvisorio: Movie[] = [];
    this.preferiti = undefined;
    const user: AuthData = (await this.authSrv.user$
      .pipe(take(1))
      .toPromise()) as AuthData;
    this.http
      .get<Favourite[]>(
        `http://localhost:4201/api/favourites?userId=${user.user.id}`
      )
      .subscribe(async (res) => {
        await this.buttaFilm();
        console.log(res);
        console.log(this.movies);

        for (let i of res) {
          for (let j of this.movies!) {
            if (i.movieId == j.id) {
              preferitiProvvisorio.push(j);
              preferitiProvvisorio![
                preferitiProvvisorio.indexOf(j)
              ].codicePreferito = i.id;
              j.like = true;
            }
          }
        }
        console.log(this.preferiti);
        this.preferiti = preferitiProvvisorio;
      });
    return preferitiProvvisorio;
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
}
