class Flower < ApplicationRecord
  include OrganismCommon
  acts_as :organism
  serialize :map_locations
  after_initialize :set_defaults

  scope :blooming_period_like, ->(arg) {where('blooming_period like ?', "%#{arg}%")}

  def set_defaults
    self.map_locations ||= []
  end
end
