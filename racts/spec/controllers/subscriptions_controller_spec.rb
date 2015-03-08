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

 context "post routes" do

 end
end
