json.array!(@steps) do |step|
  json.extract! step, :id, :name, :description, :stage_id, :done, :user_id
  json.url step_url(step, format: :json)
end
