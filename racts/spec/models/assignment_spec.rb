require 'rails_helper'

RSpec.describe Assignment, type: :model do
  context "#associations" do
    it {should belong_to :user}
    it {should belong_to :category}
    it {should belong_to :task}
  end
end
