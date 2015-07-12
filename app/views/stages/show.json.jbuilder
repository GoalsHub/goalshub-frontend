json.extract! @stage, :id, :name, :description, :plan_id, :user_id, :created_at, :updated_at
json.parent_id @stage.plane_id
json.parent_type 'plan'
