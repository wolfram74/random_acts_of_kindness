require 'rails_helper'

RSpec.describe ApplicationController, type: :controller do
  before(:each) do
    User.delete_all
    Category.delete_all
    Task.delete_all
    Subscription.delete_all
  end

   describe "#index" do
     it do
      should route(:get, '/').
      to(action: :index)
     end
   end

  describe "#login" do
    it "allows valid login" do
      test = FactoryGirl.create(:user)
      params = {credentials:{email: test.email, password: "farts"}}
      post :login, params
      expect(JSON.parse(response.body)["user"]).to eq(test.id)
    end

   it "reports failed login" do
      test = FactoryGirl.create(:user)
      params = {credentials:{email: test.email, password: "gofarts"}}
      post :login, params
      expect(JSON.parse(response.body)["success"]).to eq(false)
   end

  end
end
