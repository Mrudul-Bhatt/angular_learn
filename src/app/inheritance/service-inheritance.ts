// base-http.service.ts
import {HttpClient} from '@angular/common/http';
// user.service.ts
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService {
  constructor(protected http: HttpClient) {
  }

  protected handleError(error: any) {
    console.error('Error occurred:', error);
    return throwError(() => error);
  }
}


@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseHttpService {
  private apiUrl = 'https://api.example.com/users';

  constructor(http: HttpClient) {
    super(http);
  }

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(catchError(this.handleError));
  }
}
