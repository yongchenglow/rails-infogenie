Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: "registrations" }
  root to: "pages#home"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  require "sidekiq/web"
  authenticate :user, ->(user) { user.admin? } do
    mount Sidekiq::Web => '/sidekiq'
  end

  resources :cards, except: %i[edit update] do
    member do
      post :toggle_favourites
    end
  end

  resources :favourites, only: :index
  resources :categories, only: %i[edit update]
  # Defines the root path route ("/")
  # root "articles#index"
end
