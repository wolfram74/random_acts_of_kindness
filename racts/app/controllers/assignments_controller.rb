class AssignmentsController < ApplicationController
  def index
    output = User.find(params[:user_id]).assignments_to_tasks
    # p output
    render json: output
  end

  def complete
    assignment = Assignment.find(params[:id])
    assignment.complete
    render json: {status: "updated"}
  end
end
__END__
when a task is voted on, some visual representation of that vote is marked in the list
when a user returns to the list, that mark persists
to do this, in assembling the list, the object must be able to report on part of it's vote history