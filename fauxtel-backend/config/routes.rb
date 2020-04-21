Rails.application.routes.draw do

  post '/api/v1/login', to: 'auths#create'
  delete '/api/v1/logout', to: 'auths#destroy'
  get '/api/v1/get_current_user', to: 'auths#get_current_user'
  
  
  
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
