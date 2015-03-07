class AssignmentsController < ApplicationController
  def complete
    Assignment.find(params[:id]).complete
  end
end
