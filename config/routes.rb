Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: "registrations" }
  root to: "pages#home"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  resources :cards, except: %i[edit update] do
    member do
      post :toggle_favourites
      get :refresh_articles
    end
    resources :news_articles, only: %i[index show]
  end

  resources :favourites, only: :index
  resources :categories, only: %i[edit update]
  # Defines the root path route ("/")
  # root "articles#index"
end
