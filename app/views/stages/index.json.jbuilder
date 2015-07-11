json.array!(@stages) do |stage|
  json.extract! stage, :id, :name, :description, :plan_id, :user_id
  json.url stage_url(stage, format: :json)
end
