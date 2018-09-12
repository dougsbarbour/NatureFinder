module OrganismCommon
  def self.included(base)
    base.class_eval do
      scope :habitat_like, ->(arg) {eager_load(:'organism').where('lower(organisms.habitat) like ?', "%#{arg.downcase}%")}
      scope :common_name_like, ->(arg) {eager_load(:'organism').where('lower(organisms.common_name) like ?', "%#{arg.downcase}%")}
      scope :genus_like, ->(arg) {eager_load(:'organism').where('lower(organisms.genus) like ?', "%#{arg.downcase}%")}
      scope :species_like, ->(arg) {eager_load(:'organism').where('lower(organisms.species) like ?', "%#{arg.downcase}%")}
      scope :family_latin_like, ->(arg) {eager_load(:'organism').where('lower(organisms.family_latin) like ?', "%#{arg.downcase}%")}
      scope :family_english_like, ->(arg) {eager_load(:'organism').where('lower(organisms.family_english) like ?', "%#{arg.downcase}%")}
      scope :family_like, ->(arg) {family_latin_like(arg).or(family_english_like(arg))}
      scope :color_like, ->(arg) {eager_load(:'organism').where('lower(organisms.color) like ?', "%#{arg.downcase}%")}
      scope :common_name_word_starting_like, ->(arg) {eager_load(:'organism').where("' ' || lower(organisms.common_name) like '% ' || ? || '%'", arg.downcase)}
    end
  end
end