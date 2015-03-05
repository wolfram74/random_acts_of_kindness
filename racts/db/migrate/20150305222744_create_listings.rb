class CreateListings < ActiveRecord::Migration
  def change
    create_table :listings do |t|
      t.integer :category_id
      t.integer :task_id
      t.timestamps
    end
  end
end
