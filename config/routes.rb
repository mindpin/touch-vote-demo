Rails.application.routes.draw do
  
  root 'games#index'
  
  resources :home do
    collection do
      post :receive
      get :show_game
    end
  end
end
