class Stage < ActiveRecord::Base
  has_many :steps
  belongs_to :plan
end
