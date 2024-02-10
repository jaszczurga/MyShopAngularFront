export default {

  oidc: {
    //clientId is the "Application ID" generated when you registered the app with Okta
    clientId: "",
    //issuer is the "Issuer URI" generated when you registered the app with Okta
    issuer: '',
    //redirectUri is the URL where Okta will redirect the browser after authentication has been completed
    redirectUri: 'http://localhost:4200/login/callback',
    //scopes are the permissions you are requesting from the user
    scopes: ['openid', 'profile', 'email']
  }
}
