import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MainService {
    private dailyCountUrl = SERVER_API_URL + 'api/daily-count';
    constructor(private http: HttpClient) {}

    getDailyCount(): Observable<any> {
        return this.http.get<any>(this.dailyCountUrl, { observe: 'response' });
    }
}
