require 'rails_helper'

RSpec.describe SubscriptionsController, type: :controller do

   it do
    should route(:get, '/users/1/subscriptions').
    to(action: :index, user_id: 1)
   end

   it do
    should route(:get, '/users/1/subscriptions/1').
    to(action: :show, user_id: 1, id: 1)
   end

end
