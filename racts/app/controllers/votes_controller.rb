class VotesController < ApplicationController
  def cast_vote
    old_vote = Vote.find_by({user_id: params[:user_id], votable_id: params[:id], votable_type: params[:class_name]})
    shift = params[:change].to_i
    if shift < 0
      sign = -1
    else
      sign = 1
    end
    history = User.find(params[:user_id]).votes.last(10)
    if old_vote
      magnitude = old_vote.magnitude_finder(history, sign)
      old_vote.magnitude = magnitude
      old_vote.save
    else
      vote = Vote.new({user_id: params[:user_id], votable_id: params[:id], votable_type: params[:class_name]})
      magnitude = vote.magnitude_finder(history, sign)
      vote.magnitude = magnitude
      vote.save
    end
    result = Vote.find_by({user_id: params[:user_id], votable_id: params[:id], votable_type: params[:class_name]})
    Vote.update_object(params[:class_name], params[:id])
    render json: {success: true, object: result}
  end
end
