Rails.application.routes.draw do


  
  delete '/api/v1/logout', to: 'api/v1/auths#destroy'
  get '/api/v1/get_current_user', to: 'api/v1/auths#get_current_user'
  
  
  
  namespace :api do
    namespace :v1 do
      resources :users
      resources :reservations
      resources :locations
      resources :rooms
      post '/login', to: 'auths#login'
      #resources :auths
    end
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
