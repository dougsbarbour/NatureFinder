require 'csv'

class Organism < ApplicationRecord
  actable
  has_many :media, -> {order('id ASC')}
  has_many :map_locations

  validates_presence_of :common_name

  def self.import(file)
    # Organism.import(File.open('GreenwayData.csv'))
    header_converter = lambda {|header| header.downcase.tr(' ', '_')}
    # Excel translates " in data to ? in msdos CSV format
    converter = lambda {|field| field.tr('?', '"') if field}
    CSV.foreach(file.path, headers: true, header_converters: header_converter, converters: converter) do |row|
      row_hash = row.to_hash
      row_hash['size'] = row_hash['size'].downcase if row_hash['size']
      row_hash['type'] = row_hash['type'].capitalize if row_hash['type']
      row_hash['color'] = row_hash['color'].downcase if row_hash['color']
      row_hash['habitat'] = row_hash['habitat'].downcase if row_hash['habitat']
      row_hash['tree_id'] = row_hash['tree_id'].downcase if row_hash['tree_id']
      row_hash['season'] = row_hash['season'].downcase if row_hash['season']
      row_hash['map_locations'] = self.process_map_locations(row_hash['map_locations'])
      self.process_media(row_hash)
      self.create_new!(row_hash)
    end
    file.close
    Config.instance.record
  end

  def self.create_new!(hash)
    class_for_new_instance = hash['type'].strip.constantize
    attr_names = class_for_new_instance.attribute_names.collect(&:to_s) +
        class_for_new_instance.reflect_on_all_associations.map {|assoc| assoc.name.to_s} +
        self.attribute_names.collect(&:to_s)
    good_attrs = hash.delete_if do |each|
      !attr_names.include?(each) && each != 'tree_id' && each != 'song_description'
    end
    return class_for_new_instance.create!(good_attrs)
  end

  def self.process_media(hash)
    # Media File Name 1, Media Tag 1, Media Title 1, Media Caption 1, Media Credits 1
    keys = hash.keys.select {|key| key.include?('media') && hash[key] && !hash[key].empty?}
    hash['media'] = [] unless keys.empty?
    media = hash['media']
    keys.sort_by {|key| key.last}
    keys.each do |key|
      sub_values = key.split('_')
      sub_values.shift
      index = sub_values.pop.to_i - 1
      attribute_name = sub_values.join('_')
      media[index] = Medium.new if media[index].nil?
      media[index].send((attribute_name + '='), hash[key])
    end
  end

  def self.process_map_locations(json_array)
    # [[x_percentage, y_percentage], ...]
    json_array ||= '[]'
    JSON.parse(json_array).map do |attrs|
      loc = MapLocation.new
      loc.x_percentage = attrs.first.to_d
      loc.y_percentage = attrs.last.to_d
      loc
    end
  end

  def type=(arg)
    # do nothing, not an attribute
  end

  def size=(arg)
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

end
