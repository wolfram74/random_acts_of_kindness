class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.string :name
      t.string :description
      t.integer :cost_estimate
      t.integer :score
      t.boolean :public
      t.integer :user_id
      t.timestamps
    end
  end
end
