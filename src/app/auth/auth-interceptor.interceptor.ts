import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler){

    if(req.url.includes('official-joke-api')){
      return next.handle(req);
    }

    const authToken = this.authService.getToken();
    const authRequest = req.clone( {
      headers: req.headers.set('authorization', 'Bearer '+ authToken)
    });

    return next.handle(authRequest);
  }

}
