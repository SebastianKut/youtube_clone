https://www.youtube.com/watch?v=hPck3Q13wdE

start from 2:30

figure out how to display errors from axios - maybe dnt use fuckin react-query, do it normal way instead with axios and useState

1. After login user still doesnt show we have to refresh the page - figure it out - maybe cuz login function is async and Im not awaiting it

1. Do proper error handling on the server - different errors come from zod validation and different from route handeler, unify it all so it can be easily interpreted on the client. If its a zod error have to find a way to capture that zod error object on the server and make it into nice serialized Error

1. Handle validation errors on the client as well as handeler errors (maybe put it in the onError callback in the notification)

1. Add tests to server for route handelers

1. Change client to make it look like youtube - read mantine documentation about custom css

For the initial page load, getInitialProps will run on the server only. getInitialProps will then run on the client when navigating to a different route via the next/link component or by using next/router. However, if getInitialProps is used in a custom \_app.js, and the page being navigated to implements getServerSideProps, then getInitialProps will run on the server.
