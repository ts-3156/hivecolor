Rails.application.routes.draw do
  root to: 'devise/registrations#new'
  devise_for :users
end
