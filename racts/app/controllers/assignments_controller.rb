class AssignmentsController < ApplicationController
  def complete
    assignment = Assignment.find(params[:id])
    assignment.complete
    puts 'yes'
    puts assignment.to_yaml
    render json: {status: "updated"}
  end
end
