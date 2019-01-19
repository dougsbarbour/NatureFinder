class MapLocationSerializer
  include FastJsonapi::ObjectSerializer
  attributes :x_percentage, :y_percentage
  belongs_to :organism
end
