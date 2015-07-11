class CreateStages < ActiveRecord::Migration
  def change
    create_table :stages do |t|
      t.string :name
      t.text :description
      t.integer :plan_id
      t.integer :user_id
      t.integer :parent_stage_id

      t.timestamps null: false
    end
  end
end
