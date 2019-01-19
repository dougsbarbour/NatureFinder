class MediumSerializer
  include FastJsonapi::ObjectSerializer
  attributes :file_name, :title, :credits, :caption, :tag_name
  belongs_to :organism
end