class AssignmentsController < ApplicationController
  def index
    render json: {}
  end

  def complete
    assignment = Assignment.find(params[:id])
    assignment.complete
    render json: {status: "updated"}
  end
end
