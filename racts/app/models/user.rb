require 'bcrypt'

class User < ActiveRecord::Base
  # has_many :followers, through: :relationships
  has_many :subscriptions
  has_many :categories
  has_many :tasks
  has_many :assignments
  has_many :votes

  # users.password_hash in the database is a :string
  include BCrypt

  def password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end

  def subscribe(args)
    args[:user_id] = self.id
    Subscription.create(args)
    self.subscriptions.last.assign_new_tasks
  end

  def public_tasks #fetch public tasks that are not yours
    # all_public = Task.where(public: true)
  end

  def active_tasks #fetch unfinished tasks
    assignments = Assignment.active_assignments({user_id: self.id})
    tasks = assignments.map do |assignment|
      Task.find(assignment.task_id)
    end
    output = {}
    assignments.each_with_index do |assignment, index|
      output[assignment.to_json] = tasks[index]
    end
    return output
  end

  def update_subscriptions
    self.subscriptions.each do |subscription|
      subscription.update
    end
  end
end
