class CreateSubscriptions < ActiveRecord::Migration
  def change
    create_table :subscriptions do |t|
      t.integer :amount
      t.integer :period
      t.references :user, index: true
      t.references :category, index: true

      t.timestamps
    end
  end
end
