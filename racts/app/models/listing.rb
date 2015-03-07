class Listing < ActiveRecord::Base
  belongs_to :category
  belongs_to :task
  has_many :assignments
end
