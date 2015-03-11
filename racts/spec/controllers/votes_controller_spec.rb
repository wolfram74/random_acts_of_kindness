require 'rails_helper'

RSpec.describe VotesController, type: :controller do
  context "#cast_vote" do  
    it "can hit the route" do
      user = FactoryGirl.create(:user)
      task = FactoryGirl.create(:task)
      post "cast_vote", {user_id: user.id, class_name: task.class.to_s, id: task.id, change: -1}
      expect(response.status).to eq(200)
    end
    it "hitting route changes score" do
      user = FactoryGirl.create(:user)
      task = FactoryGirl.create(:task)
      expect{
        post "cast_vote", {user_id: user.id, class_name: task.class.to_s, id: task.id, change: -1}
        }.to change{Task.last.score}
    end
    it "hitting route over rides old vote" do
      user = FactoryGirl.create(:user)
      task = FactoryGirl.create(:task)
      post "cast_vote", {user_id: user.id, class_name: task.class.to_s, id: task.id, change: -1}
      expect{
        post "cast_vote", {user_id: user.id, class_name: task.class.to_s, id: task.id, change: 1}
        }.to_not change{Vote.count}
    end

  end
end
