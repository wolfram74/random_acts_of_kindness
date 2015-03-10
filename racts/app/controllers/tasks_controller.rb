class TasksController < ApplicationController
  def random
    choice = rand(Task.count)
    random_task = Task.offset(choice).first
    render json: random_task
  end

  def create #expects params-> :name, :description, :cost_estimate
    Task.create({
      name: params[:name], 
      description: params[:description], 
      cost_estimate: params[:cost_estimate], 
      public: false})
    render json: {}
  end
end
