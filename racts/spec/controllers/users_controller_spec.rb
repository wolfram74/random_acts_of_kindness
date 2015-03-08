require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  it "responds to active list route" do
    should route(:get, '/users/1/active').
    to(action: :active_tasks, id: 1)
  end

  it "responds to personal user page" do
    should route(:get, '/users/1').
    to(action: :show, id: 1)
  end

  it "#create" do
      test = FactoryGirl.build(:user)
      params = {credentials:{email: test.email, password: "farts", password_confirm: "farts"}}
      expect{
       post "create", params
      }.to change{User.count}
      expect(JSON.parse(response.body)["user"]).to_not eq(nil)
  end
end
