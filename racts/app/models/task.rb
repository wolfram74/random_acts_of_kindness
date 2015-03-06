class Task < ActiveRecord::Base
  belongs_to :user
  has_many :listings
  has_many :categories, through: :listings
  has_many :assignments
  has_many :votes, as: :votable

  

end
