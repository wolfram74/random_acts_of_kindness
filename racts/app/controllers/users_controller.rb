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
    password_mismacth = params[:credentials][:password] != params[:credentials][:password_confirm]
    if password_mismatch
      render json: object
    end
    args = {email: params[:credentials][:email], password: params[:credentials][:password]}
    new_user = User.new(args)
    new_user.save
    # candidate = User.find_by(email: params[:credentials][:email])
    if new_user.errors.any?
    else 
      object[:success] = new_user.id
      render json: object
    end
  end


end
