import { Injectable, Inject } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpUrlEncodingCodec
} from '@angular/common/http';

import { API_URL } from '../api-url.token';
import { Observable } from 'rxjs';
import { AppointmentEntity } from './calendar.models';

/**
 * Override Angular default query string encoding strategy because ISO formatted dates aree not properly passed to the server
 */
export class QueryEncoder extends HttpUrlEncodingCodec {
  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }

  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}

@Injectable({ providedIn: 'root' })
export class CalendarApi {
  constructor(
    private readonly http: HttpClient,
    @Inject(API_URL) private readonly apiUrl: string
  ) {}

  fetch(from: Date, to: Date): Observable<{ data: AppointmentEntity[] }> {
    const params = new HttpParams({
      fromObject: {
        from: from.toISOString(),
        to: to.toISOString()
      },
      encoder: new QueryEncoder()
    });
    return this.http.get(`${this.apiUrl}/appointments`, {
      params
    }) as Observable<{ data: AppointmentEntity[] }>;
  }
}
