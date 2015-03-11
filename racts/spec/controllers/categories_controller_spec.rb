require 'rails_helper'

RSpec.describe CategoriesController, type: :controller do

  feature 'Browsing categories' do
    describe "#index" do
      it "responds with a 200" do
        get :index
        expect(response.status).to eq 200
      end
      it "responds with a 200" do
        test = FactoryGirl.create(:user)
        get :index, {user_id: test.id}
        expect(response.status).to eq 200
      end
    end
    describe "#index" do
      it do
        should route(:get, '/categories').
        to(action: :index)
      end
    end

    describe "#show" do
      it do
        should route(:get, 'categories/1').
        to(action: :show, id: 1)
      end
    end
  end
 context "post routes" do
  it "can subscribe to new categories" do
    user = FactoryGirl.create(:user)
    category = FactoryGirl.create(:category)
    category_id = Category.first.id
    amount = 3
    period = 1
    args = { user_id:user.id, id:category.id ,amount: amount, period: period}
    post "subscribe", args
    expect(JSON.parse(response.body)["status"]).to eq("success")
    
  end
 end
    # post(route).should route_to("categories#subscribe", user_id: user.id, id:category_id)
    # expect do
    #   post(route, args )
    # end.to change{Subscription.count}

end

