import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import * as _ from 'lodash';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {SubmissionEnvelope} from "./submissionEnvelope";
import {ListResult} from "./hateoas";
import {Summary} from "./welcome/summary";

@Injectable()
export class IngestService {

  //API_URL: string = 'http://192.168.99.100:31763';
  API_URL: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  public getAllSubmission(): Observable<SubmissionEnvelope[]> {
    return this.http.get(`${this.API_URL}/user/submissionEnvelopes`)
      .map((data: ListResult<SubmissionEnvelope>) => _.values(data._embedded.submissionEnvelopes))
      .do(console.log);
  }

  public getAllSubmissionHAL(): Observable<ListResult<SubmissionEnvelope>> {
    return this.http.get(`${this.API_URL}/user/submissionEnvelopes`)
      .map((data: ListResult<SubmissionEnvelope>) => _.values(data))
      .do(console.log);
  }

  public getSummary(): Observable<Summary> {
    return this.http.get(`${this.API_URL}/user/summary`)
      .map((data: Summary) => _.values(data))
      .do(console.log);
  }
}