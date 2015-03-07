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

  end

end
