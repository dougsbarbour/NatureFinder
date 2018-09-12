require 'csv'

class Organism < ApplicationRecord
  actable

  validates_presence_of :common_name, :genus

  def self.import(file)
    # Organism.import(File.open('GreenwayData.csv'))
    header_converter = lambda {|header| header.downcase.tr(' ','_')}
    # Excel translates " in data to ? in msdos CSV format
    converter = lambda {|field| field.tr('?','"') if field}
    CSV.foreach(file.path, headers: true, header_converters: header_converter, converters: converter) do |row|
      row_hash = row.to_hash
      row_hash['size'] = row_hash['size'].downcase if row_hash['size']
      row_hash['type'] = row_hash['type'].capitalize if row_hash['type']
      row_hash['color'] = row_hash['color'].downcase if row_hash['color']
      row_hash['habitat'] = row_hash['habitat'].downcase if row_hash['habitat']
      row_hash['tree_id'] = row_hash['tree_id'].downcase if row_hash['tree_id']
      row_hash['blooming_period'] = row_hash['blooming_period'].downcase if row_hash['blooming_period']
      row_hash['map_locations'] = JSON.parse(row_hash['map_locations']) if row_hash['map_locations']
      self.create_new! row_hash
    end
    file.close
    Config.instance.record
  end

  def self.create_new!(hash)
    class_for_new_instance = hash['type'].strip.constantize
    attr_names = class_for_new_instance.attribute_names.collect(&:to_s) +
                  self.attribute_names.collect(&:to_s)
    good_attrs = hash.delete_if do |each|
      !attr_names.include?(each) && each != 'family' && each != 'tree_id' && each != 'song_description'
    end
    return class_for_new_instance.create!(good_attrs)
  end

  def type=(arg)
    # do nothing, not an attribute
  end

  def size=(arg)
    # do nothing, not an attribute
  end

  def female_photo_type=(arg)
    # do nothing, not an attribute
  end

  def blooming_period=(arg)
    # do nothing, not an attribute
  end

  def tree_id=(arg)
    if arg
      self.specific.tree_type = arg[0].strip if arg.size >= 1
      self.specific.leaf_position = arg[2].strip if arg.size >= 3
      self.specific.leaf_structure = arg[4].strip if arg.size >= 5
      self.specific.leaf_type = arg[6].strip if arg.size >= 7
    end
  end

  def song_description=(arg)
    self.specific.sound_description = arg if self.specific.has_attribute?(:sound_description)
  end

  def family=(arg)
    # Latin, English
    if arg
      words = arg.split(",")
      self.family_latin = words.first.strip
      self.family_english = words.last.strip if words.size == 2
    end
  end

end
