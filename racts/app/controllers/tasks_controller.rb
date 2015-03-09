class TasksController < ApplicationController
  def random
    choice = rand(Task.count)
    random_task = Task.offset(choice).first
    render json: random_task
  end
end
