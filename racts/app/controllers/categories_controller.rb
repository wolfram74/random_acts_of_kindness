class CategoriesController < ApplicationController
  def index #/categories
    @public_categories = Category.where(public: true)
    render json:{list: @public_categories}
  end
  
  # /categories/:id
  def show
    @category = Category.find(params[:id])
    @tasks = @category.tasks
    render json: {@category.to_json => @tasks}
  end

  def new
    @user = User.find(params[:user_id])
    @category = @user.categories.new
  end

  def create
    @user = User.find(params[:user_id])
    @category = @user.categories.create(category_params)
    render json: {user: @user, category: @category}
  end

  def edit
    @user = User.find(params[:user_id])
    @category = @user.categories.find(params[:id])
  end

  def update
    @user = User.find(params[:user_id])
    @category = @user.categories.update(categories_path)
    render json: {user: @user, category: @category}
  end

  def destroy
    @user= User.find(params[:user_id])
    @category = @user.categories.find(params[:id])
    @category.destroy
    render json: {user: @user, categories: Category.all}
  end

  private

  def category_params
    params.require(:category).permit(:name, :description, :cost_estimate, :public)
  end
end
