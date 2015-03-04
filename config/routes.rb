Rails.application.routes.draw do
  
  root 'home#index'
  
  resources :home do
    collection do
      post :receive
      get :show_game
    end
  end
end
