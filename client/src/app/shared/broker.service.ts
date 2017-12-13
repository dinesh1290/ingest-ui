import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {UploadResults} from "./models/uploadResults";

@Injectable()
export class BrokerService {

  API_URL: string = 'http://localhost:5000';

  constructor(private http: HttpClient) {
  }

  public uploadSpreadsheet(formData): Observable<UploadResults> {
    return this.http.post<UploadResults>(`${this.API_URL}/upload_api`, formData).do(console.log);
  }

}
