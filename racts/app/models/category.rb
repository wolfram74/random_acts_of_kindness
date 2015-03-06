class Category < ActiveRecord::Base
  belongs_to :user
  has_many :listings
  has_many :tasks, through: :listings
  has_many :subscriptions

end
