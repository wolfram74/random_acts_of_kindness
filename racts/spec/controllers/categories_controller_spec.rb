require 'rails_helper'

RSpec.describe CategoriesController, type: :controller do

  feature 'Browsing categories' do
    describe "#index" do
      it "responds with a 200" do
        get :index
        expect(response.status).to eq 200
      end
    end
    describe "#index" do
      it do
        should route(:get, '/categories').
        to(action: :index)
      end
    end

    describe "#show" do
      it do
        should route(:get, 'categories/1').
        to(action: :show, id: 1)
      end
    end
  end
end

