require 'rails_helper'

RSpec.describe Task, type: :model do
  context "#associations" do
    it {should have_many :categories}
    it {should have_many :assignments}
    it {should have_many :votes}
    it {should have_many :listings}
    it {should belong_to :user}
  end  
end
