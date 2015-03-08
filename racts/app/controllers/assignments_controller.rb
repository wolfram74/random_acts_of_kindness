class AssignmentsController < ApplicationController
  def complete
    assignment = Assignment.find(params[:id])
    assignment.complete
    render json: {status: "updated"}
  end
end
