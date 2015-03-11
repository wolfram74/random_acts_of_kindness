require 'rails_helper'

RSpec.describe AssignmentsController, type: :controller do

  context "#index" do
    it "can hit the route" do
      user = FactoryGirl.create(:user)
      get "index", {user_id: user.id}
      expect(response.status).to eq(200)
    end

    it "returns completed assignments" do
      user = FactoryGirl.create(:user)
      category = FactoryGirl.create(:category)
      category_id = category.id
      amount = 3
      period = 1
      args = {category_id: category_id, amount: amount, period: period}
      5.times{category.tasks << FactoryGirl.create(:task)}
      user.subscribe(args)
      assignment = Assignment.last
      put 'complete', id: assignment.id
      actives = user.active_tasks
      get 'index', {user_id: user.id}
      expect(JSON.parse(response.body).length).to eq(1)
    end
    it "returns favorable sentiment" do
      user = FactoryGirl.create(:user)
      category = FactoryGirl.create(:category)
      category_id = category.id
      amount = 3
      period = 1
      args = {category_id: category_id, amount: amount, period: period}
      5.times{category.tasks << FactoryGirl.create(:task)}
      user.subscribe(args)
      assignment = Assignment.last
      put 'complete', id: assignment.id
      actives = user.active_tasks
      Vote.create({user_id: user.id, votable_id: assignment.task_id, votable_type: "Task", magnitude: 1})
      get 'index', {user_id: user.id}
      data = JSON.parse(response.body)
      expect(data[0]["past_vote"]).to eq(1)
    end
    it "returns favorable sentiment" do
      user = FactoryGirl.create(:user)
      category = FactoryGirl.create(:category)
      category_id = category.id
      amount = 3
      period = 1
      args = {category_id: category_id, amount: amount, period: period}
      5.times{category.tasks << FactoryGirl.create(:task)}
      user.subscribe(args)
      assignment = Assignment.last
      put 'complete', id: assignment.id
      actives = user.active_tasks
      Vote.create({user_id: user.id, votable_id: assignment.task_id, votable_type: "Task", magnitude: -1})
      get 'index', {user_id: user.id}
      data = JSON.parse(response.body)
      expect(data[0]["past_vote"]).to eq(-1)
    end
  end

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
        put 'complete', id: assignment.id 
      }.to change{ Assignment.last.completed_on }
    end
  end
end
