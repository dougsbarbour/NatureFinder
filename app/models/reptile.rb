class Reptile < ApplicationRecord
  include OrganismCommon
  acts_as :organism
end
