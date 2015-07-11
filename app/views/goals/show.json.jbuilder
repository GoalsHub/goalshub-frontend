json.extract! @goal, :id, :name, :description, :created_at, :updated_at
json.array!(@goal.plans) do |plan|
  json.extract! plan, :id, :name, :description
  json.array!(plan.stages) do |stage|
    json.extract! stage, :id, :name, :description
    json.array!(stage.steps) do |step|
      json.extract! step, :id, :name, :description, :done
    end
  end
end
