class OrganismSerializer
  include FastJsonapi::ObjectSerializer
  attributes :common_name, :scientific_name, :color, :habitat, :notes,
             :habitat_description, :quick_facts, :season
  has_many :media
  has_many :map_locations

  def initialize(resource, options = {})
    options[:is_collection] = !resource.respond_to?(:id)
    options[:include] = [:media, :map_locations]
    super
  end
end
