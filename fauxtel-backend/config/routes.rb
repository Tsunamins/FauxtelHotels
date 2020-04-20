Rails.application.routes.draw do

  get "/api/v1/login", to: "auths#create"
  
  
  
  namespace :api do
    namespace :v1 do
      resources :users
      resources :reservations
      resources :locations
      resources :rooms
      #resources :auths
    end
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
