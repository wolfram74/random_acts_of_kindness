class Assignment < ActiveRecord::Base
  belongs_to :user
  belongs_to :task
  belongs_to :category

  def self.active_assignments(args)
    active = Assignment.where(user_id: args[:user_id], )
  end
end
