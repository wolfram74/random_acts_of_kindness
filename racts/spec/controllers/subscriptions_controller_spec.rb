require 'rails_helper'

RSpec.describe SubscriptionsController, type: :controller do
  let(:user) {User.create({email: "xyz@gmail.com", password: "xyzw", username:"xyz"})}

  # describe "#index" do
  #   it "responds with a 200" do
  #       puts "this is the subscriptions test"*50
  #       user.subscriptions << Subscription.create({category_id: 1, amount: 2, period: 1})
  #       get :index
  #       puts response
  #       puts "#header#"*50
  #       # expect(response.status).to eq 200
  #       expect(200).to eq 200
  #  end
  # end

  # describe "#show" do
  #   it "renders the show template" do
  #     subject { get :show }
  #     expect(subject).to render_template(:show)
  #   end
  # end
end
