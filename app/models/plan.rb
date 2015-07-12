class Plan < ActiveRecord::Base
  has_many :stages
  belongs_to :goal
end
