class Fish < ApplicationRecord
  include OrganismCommon
  acts_as :organism
end
