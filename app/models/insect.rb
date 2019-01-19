class Insect < ApplicationRecord
  include OrganismCommon
  acts_as :organism
end
