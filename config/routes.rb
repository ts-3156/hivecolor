Rails.application.routes.draw do
  # resources :posts, except: [:show]
  resources :posts, param: :id, path: '/id/', only: [:show]
  root to: 'posts#index'
  # devise_for :users
end
