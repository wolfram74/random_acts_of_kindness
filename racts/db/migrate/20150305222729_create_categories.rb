class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.string :name
      t.string :description
      t.integer :cost_estimate
      t.integer :score, default: 0
      t.boolean :public, default: true
      t.integer :user_id
      t.timestamps
    end
  end
end
