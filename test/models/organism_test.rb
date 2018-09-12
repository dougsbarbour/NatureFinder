require 'test_helper'

class OrganismTest < ActiveSupport::TestCase

  def setup
    @common_attributes = [
        [:common_name, 'Common Name String'], [:genus, 'Genus String'], [:species, 'Species String'],
        [:family_english, 'Family English String'], [:family_latin, 'Family Latin String'],
        [:color, 'red,green,blue'], [:photo_date, Date.new(2000,1,1)], [:habitat, 'water,woods'],
        [:notes, 'Notes String'], [:photo_filename, 'Photo Filename String'], [:photo_text_1, 'Photo Text 1 String'],
        [:photo_text_2, 'Photo Text 2 String'], [:video_filename, 'Video Filename String']
    ]
    Organism.import(File.open('test/fixtures/files/import.csv', mode='r'))
  end

  def test_amphibians
    amphibian = Amphibian.first
    assert_not_nil amphibian
    @common_attributes.each do |array|
      selector = array[0]
      expected_value = array[1]
      assert_equal  expected_value, amphibian.send(selector)
    end
    assert_equal 'Song description string', amphibian.sound_description
    assert_equal 'Sound Clip Filename String', amphibian.sound_clip_filename
  end

  def test_birds
    bird = Bird.first
    assert_not_nil bird
    @common_attributes.each do |array|
      selector = array[0]
      expected_value = array[1]
      assert_equal  expected_value, bird.send(selector)
    end
    assert_equal 'Song description string', bird.song_description
    assert_equal 'Sound Clip Filename String', bird.sound_clip_filename
    assert_equal 'size string', bird.size
    assert_equal 'Female Photo Type String', bird.female_photo_type
  end

  def test_fish
    fish = Fish.first
    assert_not_nil fish
    @common_attributes.each do |array|
      selector = array[0]
      expected_value = array[1]
      assert_equal  expected_value, fish.send(selector)
    end
    assert_equal 'size string', fish.size
  end

  def test_flowers
    flower = Flower.first
    assert_not_nil flower
    @common_attributes.each do |array|
      selector = array[0]
      expected_value = array[1]
      assert_equal  expected_value, flower.send(selector)
    end
    assert_equal 'blooming period string', flower.blooming_period
    assert_equal [[0,0],[1,1]], flower.map_locations
  end

  def test_mammals
    mammal = Mammal.first
    assert_not_nil mammal
    @common_attributes.each do |array|
      selector = array[0]
      expected_value = array[1]
      assert_equal  expected_value, mammal.send(selector)
    end
  end

  def test_reptiles
    reptile = Reptile.first
    assert_not_nil reptile
    @common_attributes.each do |array|
      selector = array[0]
      expected_value = array[1]
      assert_equal  expected_value, reptile.send(selector)
    end
  end

  def test_trees
    tree = Tree.first
    assert_not_nil tree
    @common_attributes.each do |array|
      selector = array[0]
      expected_value = array[1]
      assert_equal  expected_value, tree.send(selector)
    end
    assert_equal 'a', tree.tree_type
    assert_equal 'b', tree.leaf_position
    assert_equal 'c', tree.leaf_structure
    assert_equal 'd', tree.leaf_type
  end

end
