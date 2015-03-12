require 'rails_helper'

RSpec.describe TasksController, type: :controller do
  context "routes" do 
    it "can hit #random route" do
      get "random"
      expect(response.status).to eq(200)
    end

    it "returns different random task(may fail 1 in 900 times)" do
      30.times{FactoryGirl.create(:task)}
      responses = []
      get "random"
      responses << JSON.parse(response.body)
      get "random"
      responses << JSON.parse(response.body)
      get "random"
      responses << JSON.parse(response.body)
      results = responses.map {|task| task["id"]}
      results.sort!
      expect(results.first).to_not eq(results.last)
    end

    it "can hit post route" do
      post "create", {details: {}}
      expect(response.status).to eq(200)
    end
    it "can create with post route" do
      args = {name: "%x" % rand(10**6), description:"a thing", cost_estimate: 5}
      expect{
        post "create",  {details: args}
      }.to change{Task.count}
    end
  end

end
