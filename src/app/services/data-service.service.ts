import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError} from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(
    private http: HttpClient
  ) { }

  getProjectData(): Observable<any>  {

    var url = `${environment.api_url}/project-data.json`;

    return this.http.get(url)
      .pipe(catchError(this.handleError));
  }

  getPublicationsData(): Observable<any>  {
      
      var url = `${environment.api_url}/publications-data.json`;
  
      return this.http.get(url)
        .pipe(catchError(this.handleError));
  }


  handleError(error: HttpErrorResponse) {
    return throwError(error.message || "Server Error");
  }

}
