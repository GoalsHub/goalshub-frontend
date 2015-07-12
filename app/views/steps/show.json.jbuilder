json.extract! @step, :id, :name, :description, :stage_id, :done, :user_id, :created_at, :updated_at
json.parent_id @step.stage_id
json.parent_type 'stage'
