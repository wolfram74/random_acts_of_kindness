require 'rails_helper'

RSpec.describe ApplicationController, type: :controller do
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
