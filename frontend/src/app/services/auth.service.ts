import {Injectable} from "@angular/core";
import {map} from 'rxjs/operators';
import {ApiService} from "./api.service";
import {authToken, authTokenExpiresAt, removeAuthToken, setAuthToken} from "../dsb-utils";
import * as moment from "moment";

@Injectable()
export class AuthService {

  constructor(private api: ApiService) {
  }

  login(email: string, password: string) {
    return this.api.post('authenticate', {email: email, password: password})
      .pipe(
        map((result: {data: {authToken: string}}) => {
          setAuthToken(result.data);
          return true;
        }),
      );
  }

  logout() {
    removeAuthToken();
  }

  public isLoggedIn(): boolean {
    const expired = moment().isSameOrAfter(authTokenExpiresAt());
    if (expired) this.logout();
    return (authToken() !== null);
  }

}
