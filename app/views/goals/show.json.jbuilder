json.extract! @goal, :name, :description
json.type 'goal'
json.id "goal#{@goal.id}"
json.entity_id @goal.id
json.children @goal.plans do |plan|
  json.extract! plan, :name, :description
  json.type 'plan'
  json.id "plan#{plan.id}"
  json.entity_id plan.id
  json.parent_id @goal.id
  json.parent_type 'goal'
  json.children plan.stages do |stage|
    json.extract! stage, :name, :description
    json.type 'stage'
    json.id "stage#{stage.id}"
    json.entity_id stage.id
    json.parent_id plan.id
    json.parent_type 'plan'
    json.children stage.steps do |step|
      json.extract! step, :name, :description, :done
      json.type 'step'
      json.id "step#{step.id}"
      json.entity_id step.id
      json.parent_id stage.id
      json.parent_type 'stage'
    end
  end
end
