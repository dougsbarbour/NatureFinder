class Mammal < ApplicationRecord
  include OrganismCommon
  acts_as :organism
end
