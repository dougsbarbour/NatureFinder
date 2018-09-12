class Bird < ApplicationRecord
  include OrganismCommon
  acts_as :organism
end
