class Tree < ApplicationRecord
  include OrganismCommon
  acts_as :organism
end
