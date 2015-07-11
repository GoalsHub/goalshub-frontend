class CreateSteps < ActiveRecord::Migration
  def change
    create_table :steps do |t|
      t.string :name
      t.text :description
      t.integer :stage_id
      t.boolean :done
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
