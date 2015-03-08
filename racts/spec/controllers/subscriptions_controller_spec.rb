require 'rails_helper'

RSpec.describe SubscriptionsController, type: :controller do
  context"get routes" do
    it"show all subscriptions for a user" do
      should route(:get, '/users/1/subscriptions').
      to(action: :index, user_id: 1)
    end

    it "show specific subscriptions" do
      should route(:get, '/users/1/subscriptions/1').
      to(action: :show, user_id: 1, id: 1)
    end
  end

  context "#delete" do
    it "delete route removes subscription" do
      user = FactoryGirl.create(:user)
      category = FactoryGirl.create(:category)
      category_id = Category.first.id
      amount = 3
      period = 1
      args = {category_id: category_id, amount: amount, period: period}
      expect{
        user.subscribe(args)
        delete "destroy", {user_id: user.id, id: Subscription.last}
        }.to_not change{Subscription.count}
    end
  end

end
