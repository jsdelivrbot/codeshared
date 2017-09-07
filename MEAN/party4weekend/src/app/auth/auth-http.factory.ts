// This factory will allow us to use an authHttp method in the place of
// httpwhen we want to send an authenticated request. The angular2-jwt
// package will look for an access_token in local storage and use this
// as a Bearer Authorization header.

import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

export let AuthHttpFactory = (http: Http, options: RequestOptions) => {
    return new AuthHttp(new AuthConfig({
        tokenName: 'token',
        tokenGetter: () => localStorage.getItem('access_token')
    }), http, options);
};




