class TasksController < ApplicationController
  def random
    choice = rand(Task.count)
    random_task = Task.offset(choice).first
    render json: random_task
  end

  def create #expects params-> :name, :description, :cost_estimate
    args = params[:details]
    args[:public] = false
    Task.create(name: args[:name],
                description: args[:description],
                cost_estimate: args[:cost_estimate],
                public: args[:public],)
    render json: {succes: true}
  end
end
