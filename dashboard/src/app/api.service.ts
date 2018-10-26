import {Headers, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

/* tslint:disable:no-unused-variable member-ordering */

import {map, catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {API_SERVER} from './global.config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // protected basePath = globals.REST_URL + '/api/v1';
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      // 'Authorization': 'my-auth-token'
    })
  };


  constructor(private  httpClient: HttpClient) {
  }


  private build_url(link, coin) {
    return API_SERVER + '/api/v1/' + link + '' + coin;
  }


  public get_orders(coin, period, interval, start_date, min): Observable<any> {
    console.log("API Called");
    console.log(coin);
    let body = {
      'period': period,
      'interval': interval,
      'start_date': start_date,
      'min': min,
    };
    console.log(body);
    return this.httpClient.post(this.build_url('orders/', coin), JSON.stringify(body), this.httpOptions)
      .pipe(
        catchError(err => this.handleError(err, 'getOrders'))
      );
  }

  public get_time_orders(coin, period, interval, start_date, min): Observable<any> {
    let body = {
      'period': period,
      'interval': interval,
      'start_date': start_date,
      'min': min,
    };
    return this.httpClient.post(this.build_url('orders/', coin), JSON.stringify(body), this.httpOptions)
      .pipe(
        catchError(err => this.handleError(err, 'getTimeOrders'))
      );
  }

  public get_volume_orders(coin, period, interval, start_date, min): Observable<any> {
    let body = {
      'period': period,
      'interval': interval,
      'start_date': start_date,
      'min': min,
    };
    return this.httpClient.post(this.build_url('orders/', coin), JSON.stringify(body), this.httpOptions)
      .pipe(
        catchError(err => this.handleError(err, 'getVolumeOrders'))
      );
  }


  // public modify_service(id, body): Observable<any> {
  //   return this.httpClient.put(this.build_url('services/' + id),
  //     JSON.stringify(body), this.httpOptions)
  //     .pipe(
  //       catchError(err => this.handleError(err, 'modifyService:' + id))
  //     );
  //
  // }


  private handleError(error, operation) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error(`An error occurred when doing ${operation}:`, error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };


  // /**
  //  * Add/Activate the firewall Rule.
  //  * @param body the name.
  //  */
  // public firewallPost (body: any, extraHttpRequestParams?: any ) : Observable<Array<any>> {
  //   const path = this.basePath + '/firewall';
  //
  //   let queryParameters = new URLSearchParams();
  //   let headerParams = this.defaultHeaders;
  //   // verify required parameter 'body' is not null or undefined
  //   if (body === null || body === undefined) {
  //     throw new Error('Required parameter body was null or undefined when calling datasourcePut.');
  //   }
  //   let requestOptions: RequestOptionsArgs = {
  //     method: 'POST',
  //     headers: headerParams,
  //     search: queryParameters
  //   };
  //   requestOptions.body = JSON.stringify(body);
  //
  //   return this.http.request(path, requestOptions)
  //     .map((response: Response) => {
  //       if (response.status === 204) {
  //         return undefined;
  //       } else {
  //         return response.json();
  //       }
  //     });
  // }
  //
  //
  // /**
  //  * Get the firewall status.
  //  */
  // public firewallGet (extraHttpRequestParams?: any ) : Observable<Array<any>> {
  //   const path = this.basePath + '/firewall';
  //
  //   let queryParameters = new URLSearchParams();
  //   let headerParams = this.getHeaders;
  //   // verify required parameter 'body' is not null or undefined
  //   // if (body === null || body === undefined) {
  //   //   throw new Error('Required parameter body was null or undefined when calling datasourcePut.');
  //   // }
  //   let requestOptions: RequestOptionsArgs = {
  //     method: 'GET',
  //     headers: headerParams,
  //     search: queryParameters
  //   };
  //
  //   return this.http.request(path, requestOptions)
  //     .map((response: Response) => {
  //       if (response.status === 204) {
  //         return undefined;
  //       } else {
  //         return response.json();
  //       }
  //     });
  // }
  //
  // /**
  //  * Disable the firewall.
  //  */
  //
  // public firewallDelete (extraHttpRequestParams?: any ) : Observable<Array<any>> {
  //   const path = this.basePath + '/firewall';
  //
  //   let queryParameters = new URLSearchParams();
  //   let headerParams = this.getHeaders;
  //   // verify required parameter 'body' is not null or undefined
  //   // if (body === null || body === undefined) {
  //   //   throw new Error('Required parameter body was null or undefined when calling datasourcePut.');
  //   // }
  //   let requestOptions: RequestOptionsArgs = {
  //     method: 'DELETE',
  //     headers: headerParams,
  //     search: queryParameters
  //   };
  //
  //   return this.http.request(path, requestOptions)
  //     .map((response: Response) => {
  //       if (response.status === 204) {
  //         return undefined;
  //       } else {
  //         return response.json();
  //       }
  //     });
  // }
  //
  //
  // /**
  //  * Add/Activate the AppRoute Rule.
  //  * @param body the name.
  //  */
  // public appRoutePost (body: any, extraHttpRequestParams?: any ) : Observable<Array<any>> {
  //   const path = this.basePath + '/app_route';
  //
  //   let queryParameters = new URLSearchParams();
  //   let headerParams = this.defaultHeaders;
  //   // verify required parameter 'body' is not null or undefined
  //   if (body === null || body === undefined) {
  //     throw new Error('Required parameter body was null or undefined when calling datasourcePut.');
  //   }
  //   let requestOptions: RequestOptionsArgs = {
  //     method: 'POST',
  //     headers: headerParams,
  //     search: queryParameters
  //   };
  //   requestOptions.body = JSON.stringify(body);
  //
  //   return this.http.request(path, requestOptions)
  //     .map((response: Response) => {
  //       if (response.status === 204) {
  //         return undefined;
  //       } else {
  //         return response.json();
  //       }
  //     });
  // }
  //
  //
  // /**
  //  * Get the approute status.
  //  */
  // public appRouteGet (extraHttpRequestParams?: any ) : Observable<Array<any>> {
  //   const path = this.basePath + '/app_route';
  //
  //   let queryParameters = new URLSearchParams();
  //   let headerParams = this.getHeaders;
  //   // verify required parameter 'body' is not null or undefined
  //   // if (body === null || body === undefined) {
  //   //   throw new Error('Required parameter body was null or undefined when calling datasourcePut.');
  //   // }
  //   let requestOptions: RequestOptionsArgs = {
  //     method: 'GET',
  //     headers: headerParams,
  //     search: queryParameters
  //   };
  //
  //   return this.http.request(path, requestOptions)
  //     .map((response: Response) => {
  //       if (response.status === 204) {
  //         return undefined;
  //       } else {
  //         return response.json();
  //       }
  //     });
  // }
  //
  // /**
  //  * Disable the firewall.
  //  */
  //
  // public appRouteDelete (extraHttpRequestParams?: any ) : Observable<Array<any>> {
  //   const path = this.basePath + '/app_route';
  //
  //   let queryParameters = new URLSearchParams();
  //   let headerParams = this.getHeaders;
  //   // verify required parameter 'body' is not null or undefined
  //   // if (body === null || body === undefined) {
  //   //   throw new Error('Required parameter body was null or undefined when calling datasourcePut.');
  //   // }
  //   let requestOptions: RequestOptionsArgs = {
  //     method: 'DELETE',
  //     headers: headerParams,
  //     search: queryParameters
  //   };
  //
  //   return this.http.request(path, requestOptions)
  //     .map((response: Response) => {
  //       if (response.status === 204) {
  //         return undefined;
  //       } else {
  //         return response.json();
  //       }
  //     });
  // }
  //
  //
  // /**
  //  * Get the device list.
  //  */
  // public deviceGet (extraHttpRequestParams?: any ) : Observable<Array<any>> {
  //   const path = this.basePath + '/devices';
  //
  //   let queryParameters = new URLSearchParams();
  //   let headerParams = this.getHeaders;
  //   // verify required parameter 'body' is not null or undefined
  //   // if (body === null || body === undefined) {
  //   //   throw new Error('Required parameter body was null or undefined when calling datasourcePut.');
  //   // }
  //   let requestOptions: RequestOptionsArgs = {
  //     method: 'GET',
  //     headers: headerParams,
  //     search: queryParameters
  //   };
  //
  //   return this.http.request(path, requestOptions)
  //     .map((response: Response) => {
  //       if (response.status === 204) {
  //         return undefined;
  //       } else {
  //         return response.json();
  //       }
  //     });
  // }
  //
  //
  // /**
  //  * Get the device Intf list.
  //  */
  // public deviceIntfGet (intf_name: string,extraHttpRequestParams?: any ) : Observable<Array<any>> {
  //   const path = this.basePath + '/devices/' + intf_name;
  //
  //   let queryParameters = new URLSearchParams();
  //   let headerParams = this.getHeaders;
  //   // verify required parameter 'body' is not null or undefined
  //   // if (body === null || body === undefined) {
  //   //   throw new Error('Required parameter body was null or undefined when calling datasourcePut.');
  //   // }
  //   let requestOptions: RequestOptionsArgs = {
  //     method: 'GET',
  //     headers: headerParams,
  //     search: queryParameters
  //   };
  //
  //   return this.http.request(path, requestOptions)
  //     .map((response: Response) => {
  //       if (response.status === 204) {
  //         return undefined;
  //       } else {
  //         return response.json();
  //       }
  //     });
  // }
  //
  //
  // /**
  //  * Get the traffic of the intf.
  //  * @param body including device and intf.
  //  */
  // public trafficPost (body: any, extraHttpRequestParams?: any ) : Observable<Array<any>> {
  //   const path = this.basePath + '/traffic';
  //
  //   let queryParameters = new URLSearchParams();
  //   let headerParams = this.defaultHeaders;
  //   // verify required parameter 'body' is not null or undefined
  //   if (body === null || body === undefined) {
  //     throw new Error('Required parameter body was null or undefined when calling trafficPost.');
  //   }
  //   let requestOptions: RequestOptionsArgs = {
  //     method: 'POST',
  //     headers: headerParams,
  //     search: queryParameters
  //   };
  //   requestOptions.body = JSON.stringify(body);
  //
  //   return this.http.request(path, requestOptions)
  //     .map((response: Response) => {
  //       if (response.status === 204) {
  //         return undefined;
  //       } else {
  //         return response.json();
  //       }
  //     });
  // }
  //
  //
  // /**
  //  * Get the app_vis of the intf.
  //  * @param body including device.
  //  */
  // public appvisPost (body: any, extraHttpRequestParams?: any ) : Observable<Array<any>> {
  //   const path = this.basePath + '/app_vis';
  //
  //   let queryParameters = new URLSearchParams();
  //   let headerParams = this.defaultHeaders;
  //   // verify required parameter 'body' is not null or undefined
  //   if (body === null || body === undefined) {
  //     throw new Error('Required parameter body was null or undefined when calling trafficPost.');
  //   }
  //   let requestOptions: RequestOptionsArgs = {
  //     method: 'POST',
  //     headers: headerParams,
  //     search: queryParameters
  //   };
  //   requestOptions.body = JSON.stringify(body);
  //
  //   return this.http.request(path, requestOptions)
  //     .map((response: Response) => {
  //       if (response.status === 204) {
  //         return undefined;
  //       } else {
  //         return response.json();
  //       }
  //     });
  // }


}
