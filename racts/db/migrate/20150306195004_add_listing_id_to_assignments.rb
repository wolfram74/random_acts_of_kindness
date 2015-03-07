class AddListingIdToAssignments < ActiveRecord::Migration
  def change
    add_column :assignments, :listing_id, :integer
  end
end
