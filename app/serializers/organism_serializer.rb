class OrganismSerializer
  include FastJsonapi::ObjectSerializer
  attributes :common_name, :scientific_name, :color, :habitat, :notes,
             :habitat_description, :quick_facts, :season
  has_many :media, object_method_name: :sorted_media, id_method_name: :sort_media_ids
  has_many :map_locations, object_method_name: :sorted_map_locations, id_method_name: :sort_map_location_ids

  def initialize(resource, options = {})
    options[:is_collection] = !resource.respond_to?(:id)
    options[:include] = [:media, :map_locations]
    super
  end
end
