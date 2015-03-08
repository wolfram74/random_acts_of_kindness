Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'application#index'
  post '/login', to: 'application#login'
  get "/users/:id/active", to: 'users#active_tasks' , as: 'active_tasks'
  get "/users/:id", to: 'users#show'
  get "/users/:user_id/subscriptions", to: 'subscriptions#index' , as: 'subscriptions'
  post "/users", to: 'users#create'
  get "/users/:user_id/subscriptions/:id", to: 'subscriptions#show' 
  get "/categories", to: 'categories#index'
  get "/categories/:id", to: 'categories#show' 
  put '/assignments/:id/complete', to: 'assignments#complete' , as: 'complete_assignment'
  post '/users/:user_id/categories/:id/subscribe', to: 'categories#subscribe'  , as: 'new_subscription'

  # resources :users do
  #   resources :subscriptions
  # end


  # resources :categories do
  #     resources :tasks
  # end

  # get '/logged-in', to: 'categories#index'
  # get '/random', to: 'tasks#index'
  # get '/active-tasks', to: 'tasks#index'
  # get '/private', to: 'tasks#index'
  # get '/public', to: 'tasks#index'





  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
