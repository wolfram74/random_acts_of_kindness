class Category < ActiveRecord::Base
  belongs_to :user
  has_many :listings
  has_many :tasks, through: :listings

  def choose_tasks(integer)
    self.tasks.sample(integer)
  end
end
