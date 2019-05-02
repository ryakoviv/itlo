import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import {Observable} from 'rxjs';
import {DataFilterParam} from './data-filter-param.class';
import {AuthService} from '../auth.service';

export class DataService {

  constructor(protected http: HttpClient, protected auth: AuthService) {}

  private createSortParameter(sortBy: string, sortDirection: string) {
    if (sortDirection && sortBy) {
      if (sortDirection === 'desc') {
        return '-' + sortBy;
      } else {
        return sortBy;
      }
    }
    return '';
  }

  private createHttpParams(
    pageNumber: number = 1,
    pageSize: number = 20,
    sortBy: string = '',
    sortDirection: string = '',
    filters: DataFilterParam[]
  ) {
    let httpParams = new HttpParams().set('page', pageNumber.toString())
      .set('per-page', pageSize.toString())
      .set('sort', this.createSortParameter(sortBy, sortDirection));
    filters.forEach((el) => {
      httpParams = httpParams.set(el.name, el.value);
    });

    return httpParams;
  }

  getData(
    url: string,
    pageNumber: number = 1,
    pageSize: number = 20,
    sortBy: string = '',
    sortDirection: string = '',
    filters: DataFilterParam[]
  ): Observable<any[]> {
    return this.http.get<any[]>(
      url,
      {
        params: this.createHttpParams(pageNumber, pageSize, sortBy, sortDirection, filters),
        headers: new HttpHeaders(
          {'http_authorization': this.auth.getAuth()}
        )
      });
  }
}
