class TasksController < ApplicationController
  def index
    @category = Category.find(params[:category_id])
    @tasks = @category.tasks.all
    @private_tasks = @tasks.find_by_public(false)
    @public_tasks = @tasks.find_by_public(true)
    render json: {category: @category, tasks: @tasks, private_tasks: @private_tasks, public_tasks: @public_tasks}
  end

  def new
    @category = Category.find(params[:category_id])
    @task = @category.tasks.new
  end

  def create
    @category = Category.find(params[:category_id])
    @task = @category.tasks.create(task_params)
    render json: {category: @category, task: @task}
  end

  def edit
    @category = Category.find(params[:category_id])
    @task = @category.tasks.find(params[:id])
  end

  def update
    @category = Category.find(params[:category_id])
    @task = @category.tasks.update(task_params)
    render json: {category: @category, task: @task}
  end

  def destroy
    @category= Category.find(params[:category_id])
    @task = @category.tasks.find(params[:id])
    @task.destroy
    render json: {category: @category, task: Task.all}
  end

  private

  def task_params
    params.require(:task).permit(:name, :description, :cost_estimate, :public)
  end
end
