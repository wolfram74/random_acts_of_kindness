class Task < ActiveRecord::Base
  belongs_to :user
  has_many :listings
  has_many :categories, through: :listings
  has_many :assignments
  has_many :votes, as: :votable

  def assign(args)
    if args[:user_id].nil?
      return "error, no user id on task assignment"
    end

    if args[:listing_id]
      new_assignment ={}
      new_assignment[:user_id] = args[:user_id]
      new_assignment[:category_id] =  Listing.find_by(args[:listing_id]).category_id
      new_assignment[:task_id] = Listing.find_by(args[:listing_id]).task_id
      Assignment.create(new_assignment)
    elsif condition
    end
      
  end

end
