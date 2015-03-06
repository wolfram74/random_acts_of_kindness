require 'rails_helper'

RSpec.describe Task, type: :model do
  context "#associations" do
    it {should have_many :categories}
    it {should belong_to :user}
  end  
end
