require 'rails_helper'

RSpec.describe Category, type: :model do
  context "#associations" do
    it {should belong_to :user}
    it {should have_many :tasks}
  end  
end
