class Config < ApplicationRecord
  acts_as_singleton
  serialize :all_colors
  serialize :all_habitats
  serialize :all_sizes
  serialize :all_seasons

  def record
    self.all_colors = self.fetch_all_colors
    self.all_habitats = self.fetch_all_habitats
    self.all_sizes = self.fetch_all_sizes
    self.all_seasons = self.fetch_all_seasons
    self.save
  end

  def fetch_all_sizes
    size_descriptions = {Bird: {small: 'Sparrow or Smaller', medium: 'About Robin Size', large: 'Crow or Larger'}}
    size_descriptions.default_proc = proc {|hash, key| hash[key] = Hash.new {|hash2, key2| key2.to_s}}
    result = Hash.new {|hash, key| hash[key] = Set.new}
    Organism.all.includes(:actable).each do |each|
      if each.specific.respond_to?('size') && each.specific.size
        result[each.specific.class.name]
            .add({queryValue: each.specific.size.strip,
                  displayValue: size_descriptions[each.specific.class.name.to_sym][each.specific.size.strip.to_sym]})
      end
    end
    result.keys.clone.each {|key| result[key] = result[key].to_a.sort {|a, b| b[:queryValue] <=> a[:queryValue]}}
    result
  end

  def fetch_all_seasons
    result = Hash.new {|hash, key| hash[key] = Set.new}
    Organism.all.includes(:actable).each do |each|
      if each.specific.season
        result[each.specific.class.name].merge(each.specific.season.split(',').collect(&:strip))
      end
    end
    result.keys.clone.each {|key| result[key] = result[key].to_a.sort}
    result
  end

  def fetch_all_colors
    result = Hash.new {|hash, key| hash[key] = Set.new}
    Organism.all.includes(:actable).each do |each|
      # regex below splits on commas
      result[each.specific.class.name].merge(each.color.split(',').collect(&:strip)) if each.color
    end
    result.keys.clone.each {|key| result[key] = result[key].to_a.sort}
    result
  end

  def fetch_all_habitats
    result = Hash.new {|hash, key| hash[key] = Set.new}
    Organism.all.includes(:actable).each do |each|
      # regex below splits on commas
      result[each.specific.class.name].merge(each.habitat.split(',').collect(&:strip)) if each.habitat
    end
    result.keys.clone.each {|key| result[key] = result[key].to_a.sort}
    result
  end
end
