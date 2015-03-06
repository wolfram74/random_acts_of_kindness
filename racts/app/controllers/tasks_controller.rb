class TasksController < ApplicationController
  def index
    @category = Category.find(params[:category_id])
    @task = @category.tasks.all
  end

  def new
    @category = Category.find(params[:category_id])
    @task = @category.tasks.new
  end

  def create
    @category = Category.find(params[:category_id])
    @task = @category.tasks.create(task_params)
    redirect_to tasks_path(@task)
  end

  def edit
    @category = Category.find(params[:category_id])
    @task = @category.tasks.find(params[:id])
  end

  def update
    @category = Category.find(params[:category_id])
    @task = @category.tasks.update(task_params)
    render 'edit'
  end

  def destroy
    @category= Category.find(params[:category_id])
    @task = @category.tasks.find(params[:id])
    @task.destroy

    redirect_to tasks_path
  end

  private

  def task_params
    params.require(:task).permit(:name, :description, :cost_estimate, :public)
  end
end
