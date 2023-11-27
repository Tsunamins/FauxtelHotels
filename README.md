# FauxtelHotels
A React Single Page Web Application, idealizing a hotel booking based app for a hotel brand.
Associated blog post: https://tsunamins.github.io/fauxtel_hotels_-_the_final_project

Video demo: https://youtu.be/G4u_KgDfBYI

Local installation pre-reqs:
- NPM and Node
- Ruby and/or Rails commands available in terminal (setup varies)
- postgres installed

Starting backend:
cd fauxtel-backend
rake db:create
rake db:migrate
rails s

Starting frontend:
cd fauxtel-frontend
npm start

Rails on default 3000, so npm will ask to run on 3001 instead, select 'Y' (yes)
