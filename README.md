# FauxtelHotels
A React Single Page Web Application, idealizing a hotel booking based app for a hotel brand.
Associated blog post: https://tsunamins.github.io/fauxtel_hotels_-_the_final_project

Video demo: https://youtu.be/G4u_KgDfBYI

Skills utilized for this project: Ruby, Ruby on Rails, Typescript, React, Redux Toolkit, React Router, React Day Picker ActiveMailer, JWT authorization

Recently updated to latest: Ruby, Rails, related dependencies; React 18, React Router Dom and related dependencies

Local installation pre-reqs:
- NPM and Node
- Ruby and/or Rails commands available in terminal (setup varies)
- postgres installed

### Starting backend (will run on port 3003):
`cd fauxtel-backend`
`bundle install`
`rake db:create`
`rake db:migrate`
`rails s`

### Starting frontend (will run on port 5173):
`cd fauxtel-frontend`
`npx vite`

### Next ideas I'm working on
1) More newb refactor
2) Responsive styling from mobile through large TV, likely with Styled Components for fun
- although latest styled components + latest ts + react scripts might be causing some issues
- other thought is css modules
2b) consider moving away from react-scripts in some way
- some ideas
-- build your own boilerplate: https://dev.to/nikhilkumaran/don-t-use-create-react-app-how-you-can-set-up-your-own-reactjs-boilerplate-43l0
-- using vite: https://cathalmacdonnacha.com/migrating-from-create-react-app-cra-to-vite
-- https://www.freecodecamp.org/news/how-to-migrate-from-create-react-app-to-vite/
3) Better generation of matching rooms through backend rather than frontend
4) Something more sophisticated with regard to authorization/authentication
5) Adding testing
6) building a second or 3rd backend in other languages maybe splitting the ruby off into it's own repo
7) creating a more streamlined demo experience by using docker