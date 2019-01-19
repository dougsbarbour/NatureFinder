class ConfigSerializer
  include FastJsonapi::ObjectSerializer
  attributes :all_colors, :all_habitats, :all_sizes, :all_seasons
end