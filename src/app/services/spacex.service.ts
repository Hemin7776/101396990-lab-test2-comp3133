import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpacexService {
  private baseUrl = 'https://api.spacexdata.com/v3/launches';

  constructor(private http: HttpClient) {}

  getAllLaunches(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  getLaunchesByYear(year: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?launch_year=${year}`);
  }

  getLaunchByFlightNumber(flightNumber: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${flightNumber}`);
  }
}
