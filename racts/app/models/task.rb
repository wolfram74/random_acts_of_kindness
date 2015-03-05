class Task < ActiveRecord::Base
  belongs_to :user
  has_many :listings
  has_many :categories, through: :listings

end
