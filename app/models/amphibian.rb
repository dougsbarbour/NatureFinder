class Amphibian < ApplicationRecord
  include OrganismCommon
  acts_as :organism
end
