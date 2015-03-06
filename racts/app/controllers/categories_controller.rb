class CategoriesController < ApplicationController
  def index
    @user = User.find(params[:id])
    @categories = User.categories.all
    render json: @categories
  end

  def new
    @user = User.find(params[:user_id])
    @category = @user.categories.new
  end

  def create
    @user = User.find(params[:user_id])
    @category = @user.categories.create(category_params)
    render json: @category
  end

  def edit
    @user = User.find(params[:user_id])
    @category = @user.categories.find(params[:id])
  end

  def update
    @user = User.find(params[:user_id])
    @category = @user.categories.update(categories_path)
    render json: @category
  end

  def destroy
    @user= User.find(params[:user_id])
    @category = @user.categories.find(params[:id])
    @category.destroy
    render json: {categories: Category.all}
  end

  private

  def category_params
    params.require(:category).permit(:name, :description, :cost_estimate, :public)
  end
end
