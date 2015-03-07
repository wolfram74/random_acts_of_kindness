require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  describe "GET active_tasks" do

  end


  let(:user) {User.create({email: "xyz@gmail.com", password:"xyz", username: "xyzw"})}

  describe "GET show" do
    before(:each) do
      # @user = Factory(:user)
      get 'http://localhost:3000/users/1', :format => :json
    end

    it "should be successful" do
      response.should be_success
    end
  end

  # describe "#active_tasks" do
  #   it "renders the active_tasks template" do
  #     get :active_tasks
  #     expect(response).to render_template(:active_tasks)
  #   end
  # end
end
