class UsersController < ApplicationController
  def index
    @user = User.all
  end

  def new
    @user = User.new
  end

  def show
    @user = User.find(params[:id])
  end

  def create
    @user = User.create(user_params)
    render json: @user
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id]).update(user_params)
    render json: @user
  end

  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    render json: { users: User.all }
  end

  private

  def user_params
    params.require(:user).permit(:email, :password_hash, :username)
  end
end
