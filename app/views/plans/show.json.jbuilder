json.extract! @plan, :id, :name, :description, :goal_id, :user_id, :created_at, :updated_at
json.parent_id @plan.goal_id
json.parent_type 'goal'