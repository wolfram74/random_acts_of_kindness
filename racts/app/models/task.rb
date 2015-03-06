class Task < ActiveRecord::Base
  belongs_to :user
  has_many :listings
  has_many :categories, through: :listings
  has_many :assignments
  has_many :votes, as: :votable

  def assign(args)
    new_assignment ={}
    new_assignment[:user_id] = args[:user_id]
    new_assignment[:category_id] = args[:category_id]
    new_assignment[:task_id] = args[:task_id]
    Assignment.create(new_assignment)
  end

end
