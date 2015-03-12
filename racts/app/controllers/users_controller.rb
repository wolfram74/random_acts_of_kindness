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

  def create
    object = {success: false,user: nil}
    password_mismatch = params[:credentials][:password] != params[:credentials][:password_confirm]
    if password_mismatch
      render json: object
    else
      args = {email: params[:credentials][:email], password: params[:credentials][:password], username: params[:credentials][:username]}
      new_user = User.new(args)
      new_user.save
      if new_user.errors.any?
        render json: object
      else
        object[:success] = true
        object[:user] = new_user.id
        render json: object
      end
    end
  end


end
