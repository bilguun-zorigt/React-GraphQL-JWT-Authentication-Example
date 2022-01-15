# React-GraphQL-JWT-Authentication-Example
React GraphQL JWT Authentication and silent Token Refresh setup
This repository is to help people new to react with setting up their authentication system.

** in this example I'm using separate graphql-end only because I didn't want to send refresh token cookie with each request, by setting the path property of cookie.

** this example only shows the frontend client setup (considering below safety points) and backend settings must be set considering the points below.


# Safety points to consider

https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/

1. To prevent data from being stolen:
   - BACKEND - send request over https only
   - BACKEND - set SECURE flag on cookie to only serve it over HTTPS
2. To prevent XSS attacks:
   - FRONTEND - tokens not to be stored in localstorage
   - BACKEND - tokens can be stored in cookie with httponly
3. To prevent csrf attacks:
   - BACKEND - tokens can be stored in cookie with samesite=strict or samesite=lax
4. For phone app support:
   - FRONTEND - save tokens in app state and send in request header instead of from cookie
5. To support multiple open tabs at once:
   - BACKEND - save refresh token in cookie for computer browsers with flags above
   - FRONTEND - for phone apps save refresh token also in the app state and send in request header
   - BACKEND - thus, backend must be able to read refresh token from both header and cookie
   - BACKEND - use long running refresh token saved on database for revocation purpose. it's more secure since without database old unexpired refresh token can still be valid.
6. To prevent sending refresh token with every request:
   - BACKEND - set path flag on the cookie pointing to refresh url (https://stackoverflow.com/questions/57650692/where-to-store-the-refresh-token-on-the-client)
7. BACKEND - since no session or db to record invalid JWT tokens set access token expiry time short and refresh tokens too
8. FRONTEND - make sure not to persist the tokens with app state persisting
9. FRONTEND - make sure to remove tokens from cookie and app state upon logout and
10. BACKEND - configure CORS properly
11. BACKEND - configure backend JWT settings properly
12. configure clickjacking prevention

Note that the new SameSite cookie spec which is getting increased support in most browsers will make Cookie based approaches safe from CSRF attacks.
It might not be a solution if your Auth and API servers are hosted on different domains, but it should work really well otherwise!
