import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {DataFilterParam} from '../classes/data-filter-param.class';
import {AuthService} from '../auth.service';
import {Thing} from '../interfaces/thing.interface';
import {DataService} from '../classes/data-service.class';
import {share} from 'rxjs/operators';

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

  getAllLost(
    pageNumber: number = 1,
    pageSize: number = 20,
    sortBy: string = '',
    sortDirection: string = '',
    filters: DataFilterParam[] = []
  ): Observable<Thing[]> {
    return this.getData('/v1/thing/lost/public', pageNumber, pageSize, sortBy, sortDirection, filters);
  }

  getAllFound(
    pageNumber: number = 1,
    pageSize: number = 20,
    sortBy: string = '',
    sortDirection: string = '',
    filters: DataFilterParam[] = []
  ): Observable<Thing[]> {
    return this.getData('/v1/thing/found/public', pageNumber, pageSize, sortBy, sortDirection, filters);
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

  getThing(
    id: number,
  ): Observable<Thing> {
    return this.http.get<any>(
      '/v1/thing/' + id,
      {
        headers: new HttpHeaders(
          {'http_authorization': this.auth.getAuth()}
        ),
      }
    );
  }

  createFound(name, description, happened_at, location_text, location_center_lat, location_center_lng, location_radius, imageFile = null) {
    const fd = new FormData();
    fd.append('name', name);
    fd.append('description', description);
    fd.append('happened_at', happened_at);
    fd.append('location_text', location_text);
    fd.append('location_center_lat', location_center_lat);
    fd.append('location_center_lng', location_center_lng);
    fd.append('location_radius', location_radius);
    if (imageFile) {
      fd.append('imageFile', imageFile, imageFile.name);
    }
    return this.http.post<any>(
      '/v1/thing/found',
      fd,
      {
        headers: new HttpHeaders(
          {'http_authorization': this.auth.getAuth()}
        ),
      }
    );
  }

  createLost(name, description, happened_at, location_text, location_center_lat, location_center_lng, location_radius, imageFile = null) {
    const fd = new FormData();
    fd.append('name', name);
    fd.append('description', description);
    fd.append('happened_at', happened_at);
    fd.append('location_text', location_text);
    fd.append('location_center_lat', location_center_lat);
    fd.append('location_center_lng', location_center_lng);
    fd.append('location_radius', location_radius);
    if (imageFile) {
      fd.append('imageFile', imageFile, imageFile.name);
    }
    return this.http.post<any>(
      '/v1/thing/lost',
      fd,
      {
        headers: new HttpHeaders(
          {'http_authorization': this.auth.getAuth()}
        ),
      }
    );
  }
}
