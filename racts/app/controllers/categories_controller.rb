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

  def subscribe
    args = {}
    args[:category_id] = params[:category_id]
    args[:amount] = params[:amount]||1
    args[:period] = params[:period]|| 4
    User.find(params[:user_id]).subscribe(args)
  end

end
