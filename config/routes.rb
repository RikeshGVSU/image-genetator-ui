Rails.application.routes.draw do
  get 'about/index'
  get 'text_file/index'
  resources :code_downloads
  resources :filters

  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'home#index'
end
