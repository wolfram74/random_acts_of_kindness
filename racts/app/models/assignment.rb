class Assignment < ActiveRecord::Base
  belongs_to :user
  belongs_to :task
  belongs_to :category
end
