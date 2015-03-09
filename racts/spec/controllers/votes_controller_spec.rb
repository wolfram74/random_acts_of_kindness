require 'rails_helper'

RSpec.describe VotesController, type: :controller do
  context "#cast_vote" do  
    it "can hit the route" do
      user = FactoryGirl.create(:user)
      task = FactoryGirl.create(:task)
      get "cast_vote", {user_id: user.id, class_name: task.class.to_s, id: task.id}
      expect(response.status).to eq(200)
    end
    it "can hit the route" do
      user = FactoryGirl.create(:user)
      task = FactoryGirl.create(:task)
      get "cast_vote", {user_id: user.id, class_name: task.class.to_s, id: task.id}
      expect(response.status).to eq(200)
    end
  end
end
