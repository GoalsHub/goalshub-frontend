json.array!(@plans) do |plan|
  json.extract! plan, :id, :name, :description, :goal_id, :user_id
  json.url plan_url(plan, format: :json)
end
