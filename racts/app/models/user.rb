require 'bcrypt'

class User < ActiveRecord::Base
  # has_many :followers, through: :relationships
  has_many :subscriptions
  has_many :categories
  has_many :tasks
  has_many :assignments

  # users.password_hash in the database is a :string
  include BCrypt

  def password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end

  def public_tasks #fetch public tasks that are not yours
    # all_public = Task.where(public: true)
  end

  def active_tasks #fetch unfinished tasks
    # active_assignments = Assignment.where(:completed_on nil)
  end
end
