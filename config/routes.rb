Rails.application.routes.draw do
  
  root 'home#index'
  
  resources :home do
    collection do
      post :receive
    end
  end
end
