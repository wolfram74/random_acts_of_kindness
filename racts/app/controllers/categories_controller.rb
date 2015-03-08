class CategoriesController < ApplicationController
  def index #/categories
    @public_categories = Category.where(public: true)
    render json:{list: @public_categories}
  end
  
  # /categories/:id
  def show
    @category = Category.find(params[:id])
    @tasks = @category.tasks
    render json: @tasks#{@category.id => @tasks}
  end

  def subscribe
    p params
    args = {}
    args[:category_id] = params[:id]
    args[:amount] = params[:amount] || 1
    args[:period] = params[:period] || 4
    User.find(params[:user_id]).subscribe(args)
    render json: {status: "success"}
  end

end
