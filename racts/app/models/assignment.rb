 class Assignment < ActiveRecord::Base
  belongs_to :user
  belongs_to :task
  belongs_to :category
  belongs_to :listing

  def self.active_assignments(args)
    Assignment.where(user_id: args[:user_id], completed_on: nil)
  end

  def complete
    self.update_attributes(completed_on: DateTime.now)
  end

end
