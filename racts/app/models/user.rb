class User < ActiveRecord::Base
  has_many :followers, through: :relationships
  has_many :categories
  has_many :tasks
end
