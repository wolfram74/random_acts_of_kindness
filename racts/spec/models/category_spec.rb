require 'rails_helper'

RSpec.describe Category, type: :model do
  context "#associations" do
    it {should belong_to :user}
    it {should have_many :tasks}
    it {should have_many :votes}
    it {should have_many :subscriptions}
    it {should have_many :assignments}
  end  
  context "meta tests" do
    it "has a valid factory" do
      expect(FactoryGirl.build(:category)).to be_valid
    end
  end
end
