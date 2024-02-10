Rails.application.routes.draw do
  root 'home#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  resources :check_list_items, only: [:index, :create, :update, :destroy]
  # Defines the root path route ("/")
  # root "posts#index"
  patch '/check_list', to: 'check_list_items#update_check_list'
  get '/check_list', to: 'check_list_items#fetch_check_list'
  resources :check_list_items do
    post :reorder, on: :collection
  end
end
