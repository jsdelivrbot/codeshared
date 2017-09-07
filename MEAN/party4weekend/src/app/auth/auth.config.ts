import { ENV } from '../../core/env.config';

interface AuthConfig {
    CLIENT_ID: string;
    CLIENT_DOMAIN: string;
    AUDIENCE: string;
    REDIRECT: string;
    SCOPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
    CLIENT_ID: 'iw4kY5C4tbXLVxW11At3NsoQWz2a28vl',
    CLIENT_DOMAIN: 'dannydns.au.auth0.com',
    AUDIENCE: 'http://localhost:3000/api/',
    REDIRECT: `${ENV.BASE_URI}/callback`,
    SCOPE: 'openid profile email'
};

