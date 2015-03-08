class AssignmentsController < ApplicationController
  def complete
    Assignment.find(params[:id]).complete
    render json: {status: "updated"}
  end
end
