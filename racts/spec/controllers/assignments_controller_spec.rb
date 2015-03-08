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
      #put 'complete', id: assignment.id
      #assignment.reload
      #expect(assignment.completed_on).to be_present
      expect{
        put 'complete', id: assignment.id 
        #fix the routing to be a bit more conventionally violating convention.
      }.to change{ Assignment.last.completed_on }
      # should route(put: url).to(action: :complete, id: assignment.id)
      # expect{put :complete_assignment, {id: assignment.id}}.to change{user.active_tasks.length}
      # route = "assignments/%d" % assignment.id
      # put put_event: {id: assignment.id}
      # expect(Assignment.last.completed_on.nil?).to eq(false)
    end
  end
end
