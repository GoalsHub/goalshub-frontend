json.extract! @goal, :id, :name, :description
json.plans @goal.plans do |plan|
  json.extract! plan, :id, :name, :description
  json.stages plan.stages do |stage|
    json.extract! stage, :id, :name, :description
    json.steps stage.steps do |step|
      json.extract! step, :id, :name, :description, :done
    end
  end
end
