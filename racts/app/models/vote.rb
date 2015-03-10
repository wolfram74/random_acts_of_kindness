class Vote < ActiveRecord::Base
  belongs_to :user
  belongs_to :votable, polymorphic: true

  def self.update_object(object_class, object_id)
    target = object_class.constantize.find(object_id)
    score = 0
    target.votes.each do |vote|
      score += vote.magnitude
    end
    target.update_attributes({score: score})
  end

  def magnitude_finder(past_votes, sign)
    delta = 0
    past_votes.each do |vote|
      if vote.magnitude < 0
        delta -= 1
      else
        delta +=1
      end
    end
    sign*10*10**(-1*sign*delta.to_f/10)
  end
end
