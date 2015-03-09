class VotesController < ApplicationController
  def cast_vote
    shift = params[:change] 
    render json: {}
  end
end
