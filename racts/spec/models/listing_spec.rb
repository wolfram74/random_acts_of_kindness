require 'rails_helper'

RSpec.describe Listing, type: :model do
  context "#associations" do
    it {should belong_to :category}
    it {should belong_to :task}
    it {should have_many :assignments}
  end  

end
