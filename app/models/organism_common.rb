module OrganismCommon
  def self.included(base)
    base.class_eval do
      scope :with_all, -> {eager_load(organism: [:media, :map_locations])}
      scope :habitat_like, ->(arg) {eager_load(:'organism').where('lower(organisms.habitat) like ?', "%#{arg.downcase}%")}
      scope :common_name_like, ->(arg) {eager_load(:'organism').where('lower(organisms.common_name) like ?', "%#{arg.downcase}%")}
      scope :color_like, ->(arg) {eager_load(:'organism').where('lower(organisms.color) like ?', "%#{arg.downcase}%")}
      scope :season_like, ->(arg) {eager_load(:'organism').where('lower(organisms.season) like ?', "%#{arg.downcase}%")}
      scope :common_name_word_starting_like, ->(arg) {eager_load(:'organism').where("' ' || lower(organisms.common_name) like '% ' || ? || '%'", arg.downcase)}
    end
  end
end