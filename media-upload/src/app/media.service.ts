import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
	private baseUrl = 'http://localhost:8000/';

	getList(): Observable<[]> {
	  return this.http.get<[]>(this.baseUrl+'list');
	}

	upload(file): Observable<any>{
		return this.http.post<any>(this.baseUrl+'upload',file)
		// .subscribe(res =>{
		// 	// console.log(res);
		// 	// return res;
		// }
		// );
	}

	getBaseUrl(){
		return this.baseUrl;
	}

  constructor(private http: HttpClient) { }
}
