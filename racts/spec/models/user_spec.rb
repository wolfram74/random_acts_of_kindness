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

    it "users can subscribe to a category" do
      user = FactoryGirl.create(:user)
      category = FactoryGirl.create(:category)
      category_id = Category.first.id
      amount = 3
      period = 1
      args = {category_id: category_id, amount: amount, period: period}
      expect{user.subscribe(args)}.to change{Subscription.count}
    end

    it "users subscriptions update assignments upon creation" do
      user = FactoryGirl.create(:user)
      category = FactoryGirl.create(:category)
      category_id = category.id
      amount = 3
      period = 1
      args = {category_id: category_id, amount: amount, period: period}
      5.times{category.tasks << FactoryGirl.create(:task)}
      expect{user.subscribe(args)}.to change{Assignment.count}
    end

    it "users can find their active tasks" do
      user = FactoryGirl.create(:user)
      category = FactoryGirl.create(:category)
      category_id = category.id
      amount = 3
      period = 1
      args = {category_id: category_id, amount: amount, period: period}
      5.times{category.tasks << FactoryGirl.create(:task)}
      user.subscribe(args)
      expect(user.active_tasks[1].length).to_not eq(0)
    end
  end

  context "meta tests" do
    it "has a valid factory" do
      expect(FactoryGirl.build(:user)).to be_valid
    end
  end

end
