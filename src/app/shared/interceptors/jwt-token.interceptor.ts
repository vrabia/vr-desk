import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from "@ngxs/store";
import { UserState } from "@shared/redux/user-state/user.state";

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {

  constructor(private store: Store) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authToken = this.store.selectSnapshot(UserState.token);

    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: "Bearer " + authToken
        }
      });
    }
    return next.handle(request);
  }
}
