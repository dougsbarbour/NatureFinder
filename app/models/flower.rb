class Flower < ApplicationRecord
  include OrganismCommon
  acts_as :organism

  scope :blooming_period_like, ->(arg) {where('blooming_period like ?', "%#{arg}%")}
end
