class VotesController < ApplicationController
  def cast_vote
    shift = params[:change].to_i
    if shift < 0
      sign = -1
    else
      sign = 1
    end
    history = User.find(params[:user_id]).votes.last(10)
    vote = Vote.new({user_id: params[:user_id], votable_id: params[:id], votable_type: params[:class_name]})
    magnitude = vote.magnitude_finder(history, sign)
    vote.magnitude = magnitude
    vote.save
    Vote.update_object(params[:class_name], params[:id])
    render json: {success: true}
  end
end
