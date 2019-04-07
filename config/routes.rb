Rails.application.routes.draw do
  resources :filters
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'filters#index'
end
