require 'rails_helper'

RSpec.describe User, type: :model do
  context "#associations" do
    # it {should have_many :followers}
    it {should have_many :categories}
    it {should have_many :tasks}
    it {should have_many :votes}
    it {should have_many :assignments}
    it {should have_many :subscriptions}

  end

  context "creation" do
    it "allows creation using password" do
      expect{
        name = "%04x" % rand(10000)
        User.create({email: name +"@place.com", password: "farts"})
        }.to change{User.count}
    end
  end

  context "#subscribe" do

    pending "users can subscribe to a category" do
      user = Factory.build
      category_id = Category.first.id
      amount = 3
      period = 1
      expect{user.subscribe(category_id, amount, period)}.to change{Subscription.count}
    end

  end

end
