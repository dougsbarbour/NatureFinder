# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

Rails.application.routes.draw do

  scope 'finder/api' do
    resources :amphibians
    resource :config
    resources :birds
    resources :mammals
    resources :reptiles
    resources :fish
    resources :trees
    resources :flowers
    resources :insects
    resources :organisms
    post 'authenticate', to: 'authentication#authenticate'
  end

  get '/import' => 'organisms#import'

  get '/finder/*path' => 'finder#index'
end
