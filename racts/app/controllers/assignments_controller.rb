class AssignmentsController < ApplicationController
  def index
    output = User.find(params[:user_id]).assignments_to_tasks
    render json: output
  end

  def complete
    assignment = Assignment.find(params[:id])
    assignment.complete
    render json: {status: "updated"}
  end
end
