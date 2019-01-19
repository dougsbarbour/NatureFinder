require 'test_helper'

class OrganismTest < ActiveSupport::TestCase

  def setup
    Organism.import(File.open('test/fixtures/files/import.csv', mode = 'r'))
  end

  def test_amphibians
    amphibian = Amphibian.first
    assert_not_nil amphibian
    assert_common_snakecase_domain_attributes(amphibian)
  end

  def test_birds
    bird = Bird.first
    assert_not_nil bird
    assert_common_snakecase_domain_attributes(bird)
    assert_equal 'size string', bird.size
  end

  def test_fish
    fish = Fish.first
    assert_not_nil fish
    assert_common_snakecase_domain_attributes(fish)
    assert_equal 'size string', fish.size
  end

  def test_flowers
    flower = Flower.first
    assert_not_nil flower
    assert_common_snakecase_domain_attributes(flower)
  end

  def test_mammals
    mammal = Mammal.first
    assert_not_nil mammal
    assert_common_snakecase_domain_attributes(mammal)
  end

  def test_reptiles
    reptile = Reptile.first
    assert_not_nil reptile
    assert_common_snakecase_domain_attributes(reptile)
  end

  def test_insects
    insect = Insect.first
    assert_not_nil insect
    assert_common_snakecase_domain_attributes(insect)
  end

  def test_trees
    tree = Tree.first
    assert_not_nil tree
    assert_common_snakecase_domain_attributes(tree)
    assert_equal 'a', tree.tree_type
    assert_equal 'b', tree.leaf_position
    assert_equal 'c', tree.leaf_structure
    assert_equal 'd', tree.leaf_type
  end

end
