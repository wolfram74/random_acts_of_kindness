require 'bcrypt'

class User < ActiveRecord::Base
  # has_many :followers, through: :relationships
  has_many :subscriptions
  has_many :categories
  has_many :tasks
  has_many :assignments
  has_many :votes
  validates :email, presence: true, uniqueness: true
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

  def active_tasks #fetch unfinished tasks
    assignments = Assignment.active_assignments({user_id: self.id})
    tasks = assignments.map do |assignment|
      task  = Task.find(assignment.task_id)
      task = task.to_json
      new_format = JSON.parse(task)
      new_format[:assignment_id] = assignment.id
      new_format
    end
    return tasks
  end

  def assignments_to_tasks()
    assignments = self.assignments
    tasks = assignments.map do |assignment|
      task  = Task.find(assignment.task_id)
      task = task.to_json
      new_format = JSON.parse(task)
      new_format[:assignment_id] = assignment.id
      new_format
    end
    return tasks
  end

  def subscribed_categories(args) #fetch categories user has subscribed to
    subscriptions = self.subscriptions#.map {|subscription| Category.find(subscription.category_id)}
    json = args.fetch(:json, true)
    if !json
      return subscriptions.map {|subscription| Category.find(subscription.category_id)}
    else
      categories = subscriptions.map do |subscription|
        category = Category.find(subscription.category_id)
        category = category.to_json
        category = JSON.parse(category)
        category[:subscription_id] = subscription.id
        p category
        category
      end
    end
    return categories
  end

  def update_subscriptions
    self.subscriptions.each do |subscription|
      subscription.update
    end
  end
end
