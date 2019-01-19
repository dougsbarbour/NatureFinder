require 'test_helper'

class QueryApiTest < ActionDispatch::IntegrationTest

  def setup
    Organism.import(File.open('test/fixtures/files/import.csv', mode = 'r'))

    @plural_model_names = ['amphibians', 'birds', 'fish', 'flowers', 'mammals', 'reptiles', 'trees', 'insects']
  end

  test 'amphibian queries' do
    get '/finder/api/amphibians'
    assert_response :success
    parsed_body = @response.parsed_body
    assert_not_empty parsed_body['data']
    domain_object = parsed_body['data'][0]
    populate_relationships(domain_object, get_included_map(parsed_body['included']))
    assert_common_camelcase_domain_attributes(domain_object)
  end

  test 'bird queries' do
    get '/finder/api/birds'
    assert_response :success
    parsed_body = @response.parsed_body
    assert_not_empty parsed_body['data']
    domain_object = parsed_body['data'][0]
    populate_relationships(domain_object, get_included_map(parsed_body['included']))
    assert_common_camelcase_domain_attributes(domain_object)
    assert_equal 'size string', domain_object['attributes']['size']
    assert_domain_query('birds', 'size', 'size string')
  end

  test 'fish queries' do
    get '/finder/api/fish'
    assert_response :success
    parsed_body = @response.parsed_body
    assert_not_empty parsed_body['data']
    domain_object = parsed_body['data'][0]
    populate_relationships(domain_object, get_included_map(parsed_body['included']))
    assert_common_camelcase_domain_attributes(domain_object)
    assert_equal 'size string', domain_object['attributes']['size']
    assert_domain_query('birds', 'size', 'size string')
  end

  test 'flower queries' do
    get '/finder/api/flowers'
    assert_response :success
    parsed_body = @response.parsed_body
    assert_not_empty parsed_body['data']
    domain_object = parsed_body['data'][0]
    populate_relationships(domain_object, get_included_map(parsed_body['included']))
    assert_common_camelcase_domain_attributes(domain_object)
  end

  test 'mammal queries' do
    get '/finder/api/mammals'
    assert_response :success
    parsed_body = @response.parsed_body
    assert_not_empty parsed_body['data']
    domain_object = parsed_body['data'][0]
    populate_relationships(domain_object, get_included_map(parsed_body['included']))
    assert_common_camelcase_domain_attributes(domain_object)
  end

  test 'reptile queries' do
    get '/finder/api/reptiles'
    assert_response :success
    parsed_body = @response.parsed_body
    assert_not_empty parsed_body['data']
    domain_object = parsed_body['data'][0]
    populate_relationships(domain_object, get_included_map(parsed_body['included']))
    assert_common_camelcase_domain_attributes(domain_object)
  end

  test 'tree queries' do
    get '/finder/api/trees'
    assert_response :success
    parsed_body = @response.parsed_body
    assert_not_empty parsed_body['data']
    domain_object = parsed_body['data'][0]
    populate_relationships(domain_object, get_included_map(parsed_body['included']))
    assert_common_camelcase_domain_attributes(domain_object)
    assert_equal 'a', domain_object['attributes']['treeType']
    assert_equal 'b', domain_object['attributes']['leafPosition']
    assert_equal 'c', domain_object['attributes']['leafStructure']
    assert_equal 'd', domain_object['attributes']['leafType']
    assert_domain_query('trees', 'treeType', 'a')
    assert_domain_query('trees', 'leafPosition', 'b')
    assert_domain_query('trees', 'leafStructure', 'c')
    assert_domain_query('trees', 'leafType', 'd')
  end

  test 'common name queries' do
    assert_common_query('commonName', 'Common Name String')
    assert_common_query('common_name_word_starting', 'c')
    assert_common_query('common_name_word_starting', 'n')
    assert_common_query('common_name_word_starting', 's')
  end

  test 'color queries' do
    assert_common_query('color', 'red')
    assert_common_query('color', 'green')
    assert_common_query('color', 'blue')
  end

  test 'habitat queries' do
    assert_common_query('habitat', 'water')
    assert_common_query('habitat', 'woods')
  end

  test 'season queries' do
    assert_common_query('season', 'season1')
    assert_common_query('season', 'season2')
  end
end