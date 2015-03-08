require 'rails_helper'

RSpec.describe AssignmentsController, type: :controller do

  context "#complete" do
    it "complete route works" do
      user = FactoryGirl.create(:user)
      category = FactoryGirl.create(:category)
      category_id = category.id
      amount = 3
      period = 1
      args = {category_id: category_id, amount: amount, period: period}
      5.times{category.tasks << FactoryGirl.create(:task)}
      user.subscribe(args)
      assignment = Assignment.last
      url = "assignments/%d" % assignment.id
      expect{
        put url
      }.to change{Assignment.last}
      # should route(put: url).to(action: :complete, id: assignment.id)
      # expect{put :complete_assignment, {id: assignment.id}}.to change{user.active_tasks.length}
      # route = "assignments/%d" % assignment.id
      # put put_event: {id: assignment.id}
      # expect(Assignment.last.completed_on.nil?).to eq(false)
    end
  end
end
