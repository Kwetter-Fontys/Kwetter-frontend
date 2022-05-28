export interface AccessToken 
{
    access_token: string;
    expires_in: number;
    refresh_expires_in: number;
    token_type: string;
    not_before_policy: number;
    scope: string;
}