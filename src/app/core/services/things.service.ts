import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {Observable} from 'rxjs';
import {DataFilterParam} from '../classes/data-filter-param.class';
import {AuthService} from '../auth.service';
import {Thing} from '../interfaces/thing.interface';
import {DataService} from '../classes/data-service.class';

@Injectable({
  providedIn: 'root'
})
export class ThingsService extends DataService {

  constructor(http: HttpClient, auth: AuthService) {
    super(http, auth);
  }

  getAll(
    pageNumber: number = 1,
    pageSize: number = 20,
    sortBy: string = '',
    sortDirection: string = '',
    filters: DataFilterParam[] = []
  ): Observable<Thing[]> {
    return this.getData('/v1/thing/public', pageNumber, pageSize, sortBy, sortDirection, filters);
  }

  getAllForUser(
    pageNumber: number = 1,
    pageSize: number = 20,
    sortBy: string = '',
    sortDirection: string = '',
    filters: DataFilterParam[] = []
  ): Observable<Thing[]> {
    return this.getData('/v1/thing', pageNumber, pageSize, sortBy, sortDirection, filters);
  }

  getFoundByUser(
    pageNumber: number = 1,
    pageSize: number = 20,
    sortBy: string = '',
    sortDirection: string = '',
    filters: DataFilterParam[] = []
  ): Observable<Thing[]> {
    return this.getData('/v1/thing/found', pageNumber, pageSize, sortBy, sortDirection, filters);
  }

  getLostByUser(
    pageNumber: number = 1,
    pageSize: number = 20,
    sortBy: string = '',
    sortDirection: string = '',
    filters: DataFilterParam[] = []
  ): Observable<Thing[]> {
    return this.getData('/v1/thing/lost', pageNumber, pageSize, sortBy, sortDirection, filters);
  }
}
