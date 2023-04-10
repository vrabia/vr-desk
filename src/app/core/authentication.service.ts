import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { DeviceAuthenticationCodes } from "@shared/models/device.model";
import { environment } from "@environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl = `${environment.vrauthServiceUrl}/auth`;
  grantType = "urn:ietf:params:oauth:grant-type:device_code";

  constructor(private http: HttpClient) { }

  public requestAuthenticationCodes(clientId: string): Observable<DeviceAuthenticationCodes> {
    // this.http.post<DeviceAuthenticationCodes>(`${this.baseUrl}/device`, {clientId})
    //   .toPromise().then((response) => {
    //     debugger
    // })
    return this.http.post<DeviceAuthenticationCodes>(`${this.baseUrl}/device`, {clientId});
  }

  public requestAuthenticatedUser(authenticationCodes: DeviceAuthenticationCodes, clientId: string): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(`${this.baseUrl}/device/step2`,
      {
        deviceCode: authenticationCodes.deviceCode,
        clientId,
        grantType: this.grantType,
      },
      {observe: 'response'}
    );
  }
}
