json.extract! @goal, :id, :name, :description
json.type 'goal'
json.children @goal.plans do |plan|
  json.extract! plan, :id, :name, :description
  json.type 'plan'
  json.children plan.stages do |stage|
    json.extract! stage, :id, :name, :description
    json.type 'stage'
    json.children stage.steps do |step|
      json.extract! step, :id, :name, :description, :done
      json.type 'step'
    end
  end
end
