json.array!(@goals) do |goal|
  json.extract! goal, :id, :name, :description
  json.url goal_url(goal, format: :json)
end
