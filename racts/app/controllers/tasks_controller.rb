class TasksController < ApplicationController
  def index
    @user = User.find(params[:id])
    @task = User.tasks.all
  end

  def new
    @user = User.find(params[:user_id])
    @task = @user.tasks.new
  end

  def create
    @user = User.find(params[:user_id])
    @task = @user.tasks.create(task_params)
    redirect_to tasks_path(@task)
  end

  def edit
    @user = User.find(params[:user_id])
    @task = @user.tasks.find(params[:id])
  end

  def update
    @user = User.find(params[:user_id])
    @task = @user.tasks.update(task_params)
    render 'edit'
  end

  def destroy
    @user= User.find(params[:user_id])
    @task = @user.tasks.find(params[:id])
    @task.destroy

    redirect_to tasks_path
  end

  private

  def task_params
    params.require(:task).permit(:name, :description, :cost_estimate, :public)
  end
end
