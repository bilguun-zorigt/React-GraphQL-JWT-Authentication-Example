# React-GraphQL-JWT-Authentication-Example
React GraphQL JWT Authentication and silent Token Refresh setup
This repository is to help people new to react with setting up their authentication system.


# Safety points to consider

https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/

1. To prevent data from being stolen:
   send request over https only
   set SECURE flag on cookie to only serve it over HTTPS
2. To prevent XSS attacks:
   tokens not to be stored in localstorage
   tokens can be stored in cookie with httponly
3. To prevent csrf attacks:
   tokens can be stored in cookie with samesite=strict or samesite=lax
4. For phone app support:
   save tokens in app state and send in request header instead of from cookie
5. To support multiple open tabs at once:
   save refresh token in cookie for computer browsers with flags above
   for phone apps save refresh token also in the app state and send in request header
   thus, backend must be able to read refresh token from both header and cookie
   use long running refresh token saved on database for revokation purpose. it's more secure since without database old unexpired refresh token can still be valid.
6. To prevent sending refresh token with every request:
   set path flag on the cookie pointing to refresh url (https://stackoverflow.com/questions/57650692/where-to-store-the-refresh-token-on-the-client)
7. since no session or db to record invalid JWT tokens set access token expiry time short and refresh tokens too
8. make sure not to persist the tokens with app state persisting
9. make sure to remove tokens from cookie and app state upon logout and
10. configure CORS properly
11. configure backend JWT settings properly
12. configure clickjacking prevention

Note that the new SameSite cookie spec which is getting increased support in most browsers will make Cookie based approaches safe from CSRF attacks.
It might not be a solution if your Auth and API servers are hosted on different domains, but it should work really well otherwise!
