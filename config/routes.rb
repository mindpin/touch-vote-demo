Rails.application.routes.draw do
  
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  root 'games#index'
  
  resources :home do
    collection do
      post :receive
      get :show_game
    end
  end
end
