class UsersController < ApplicationController
  #get "/users/:id", to: 'users#show'
  def show
    @user = User.find(params[:id])
  end
####################
  def active_tasks  #/user/:id/active
    @user = User.find(params[:id])
    @user.update_subscriptions
    @data = @user.active_tasks.to_json
    render json: @data
  end

end
