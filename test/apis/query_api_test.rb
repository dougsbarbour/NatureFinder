require 'test_helper'

class QueryApiTest < ActionDispatch::IntegrationTest

  def setup
    Organism.import(File.open('test/fixtures/files/import.csv', mode = 'r'))

    @plural_model_names = ["amphibians", "birds", "fish", "flowers", "mammals", "reptiles", "trees"]
  end

  test "amphibian queries" do
    get "/finder/api/amphibians"
    assert_response :success
    parsed_body = @response.parsed_body
    assert_not_empty parsed_body
    domain_object = parsed_body[0]
    assert_common_domain_attributes(domain_object)
    assert_equal "Song description string", domain_object["soundDescription"]
    assert_equal "Sound Clip Filename String", domain_object["soundClipFilename"]
  end

  test "bird queries" do
    get "/finder/api/birds"
    assert_response :success
    parsed_body = @response.parsed_body
    assert_not_empty parsed_body
    domain_object = parsed_body[0]
    assert_common_domain_attributes(domain_object)
    assert_equal "Song description string", domain_object["songDescription"]
    assert_equal "Sound Clip Filename String", domain_object["soundClipFilename"]
    assert_equal 'size string', domain_object["size"]
    assert_equal 'Female Photo Type String', domain_object["femalePhotoType"]
    assert_domain_query("birds", "size", "size string")
  end

  test "fish queries" do
    get "/finder/api/fish"
    assert_response :success
    parsed_body = @response.parsed_body
    assert_not_empty parsed_body
    domain_object = parsed_body[0]
    assert_common_domain_attributes(domain_object)
    assert_equal 'size string', domain_object["size"]
    assert_domain_query("birds", "size", "size string")
  end

  test "flower queries" do
    get "/finder/api/flowers"
    assert_response :success
    parsed_body = @response.parsed_body
    assert_not_empty parsed_body
    domain_object = parsed_body[0]
    assert_common_domain_attributes(domain_object)
    assert_equal "blooming period string", domain_object["bloomingPeriod"]
    assert_equal [[0,0],[1,1]], domain_object["mapLocations"]
    assert_domain_query("flowers", "bloomingPeriod", "blooming period string")
    assert_domain_query("flowers", "bloomingPeriod", "blooming")
    assert_domain_query("flowers", "bloomingPeriod", "period")
    assert_domain_query("flowers", "bloomingPeriod", "string")
  end

  test "mammal queries" do
    get "/finder/api/mammals"
    assert_response :success
    parsed_body = @response.parsed_body
    assert_not_empty parsed_body
    domain_object = parsed_body[0]
    assert_common_domain_attributes(domain_object)
  end

  test "reptile queries" do
    get "/finder/api/reptiles"
    assert_response :success
    parsed_body = @response.parsed_body
    assert_not_empty parsed_body
    domain_object = parsed_body[0]
    assert_common_domain_attributes(domain_object)
  end

  test "tree queries" do
    get "/finder/api/trees"
    assert_response :success
    parsed_body = @response.parsed_body
    assert_not_empty parsed_body
    domain_object = parsed_body[0]
    assert_common_domain_attributes(domain_object)
    assert_equal 'a', domain_object["treeType"]
    assert_equal 'b', domain_object["leafPosition"]
    assert_equal 'c', domain_object["leafStructure"]
    assert_equal 'd', domain_object["leafType"]
    assert_domain_query("trees", "treeType", "a")
    assert_domain_query("trees", "leafPosition", "b")
    assert_domain_query("trees", "leafStructure", "c")
    assert_domain_query("trees", "leafType", "d")
  end

  test "common name queries" do
    assert_common_query("commonName", "Common Name String")
    assert_common_query("common_name_word_starting", "c")
    assert_common_query("common_name_word_starting", "n")
    assert_common_query("common_name_word_starting", "s")
  end

  test "genus queries" do
    assert_common_query("genus", "Genus String")
  end

  test "species queries" do
    assert_common_query("species", "Species String")
  end

  test "family queries" do
    assert_common_query("family", "Family")
    assert_common_query("familyLatin", "Family Latin String")
    assert_common_query("familyEnglish", "Family English String")
  end

  test "color queries" do
    assert_common_query("color", "red")
    assert_common_query("color", "green")
    assert_common_query("color", "blue")
  end

  test "habitat queries" do
    assert_common_query("habitat", "water")
    assert_common_query("habitat", "woods")
  end
end