class CreateAssignments < ActiveRecord::Migration
  def change
    create_table :assignments do |t|
      t.integer :user_id
      t.integer :task_id
      t.datetime :completed_on
      t.timestamps
    end
  end
end
