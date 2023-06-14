A simple MVP showing how proxy server in dev could be implemented

- server -> simple server returning a JSON with "fake 5000ms startup delay"
- proxy -> proxy that you can request and will just wait for the server to respond and return
- client next app with 2 examples
  - /no-proxy -> direct connection
  - /proxy -> with proxy
