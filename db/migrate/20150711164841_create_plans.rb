class CreatePlans < ActiveRecord::Migration
  def change
    create_table :plans do |t|
      t.string :name
      t.text :description
      t.integer :goal_id
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
