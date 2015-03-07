class Category < ActiveRecord::Base
  belongs_to :user
  has_many :listings
  has_many :tasks, through: :listings
  has_many :subscriptions
  has_many :assignments
  has_many :votes, as: :votable

end
