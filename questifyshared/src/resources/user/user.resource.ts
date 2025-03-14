export class User{
    name?: string;
    email?: string;
    password?: string;
    role?: string;
}

export class Credentials{
    email?: string;
    password?: string;
}

export class AccessToken{
    accessToken?: string;
}

export class UserSessionToken{
    id?: number;
    name?: string;
    email?: string;
    accessToken?: string;
    expiration?: number;
}