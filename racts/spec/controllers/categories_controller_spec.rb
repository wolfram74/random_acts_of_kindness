require 'rails_helper'

RSpec.describe CategoriesController, type: :controller do

  feature 'Browsing categories' do
    let(:category) {Category.create({name: "Kind", description:"be kind", public: true})}

    describe "#index" do
      it "responds with a 200" do
        get :index
        expect(response.status).to eq 200
      end
    end

  #   describe "#show" do
  #     it "renders the show template" do
  #       get :show
  #       expect(page).to render_template(:show)
  #     end
  #   end

  #   scenario "A user can see the list of all the public categories" do
  #       visit '/categories'
  #       expect(page).to have_link category.name
  #   end

  #   scenario "A user can see all the tasks related to that category" do
  #       @tasks = category.tasks << Task.create({name: "vacuum", description:"vacuum the floor", cost_estimate: 1 ,public: true})
  #       visit '/categories/:id'
  #       expect(page).to have_content 'vacuum'
  #   end
  end
end

