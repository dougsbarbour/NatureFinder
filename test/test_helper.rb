ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require 'json'
require 'facets/string'

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  include FactoryBot::Syntax::Methods

  # Add more helper methods to be used by all tests here...
  def assert_common_camelcase_domain_attributes(domain_object)
    assert_common_domain_attributes(domain_object, converter = :camelcase) do |hash, key|
      return(hash['attributes'][key]) if hash['attributes'][key]
      return(hash['relationships'][key])
    end
  end

  def assert_common_snakecase_domain_attributes(domain_object)
    assert_common_domain_attributes(domain_object, converter = :snakecase) {|domain_object, selector| domain_object.send(selector)}
  end

  def assert_common_domain_attributes(domain_object, converter = :snakecase, &block)
    assert_equal 'Common Name String', block.call(domain_object, 'commonName'.send(converter))
    assert_equal 'Scientific Name String', block.call(domain_object, 'scientificName'.send(converter))
    assert_equal 'red,green,blue', block.call(domain_object, 'color'.send(converter))
    assert_equal 'water,woods', block.call(domain_object, 'habitat'.send(converter))
    assert_equal 'Habitat Description String', block.call(domain_object, 'habitatDescription'.send(converter))
    assert_equal 'Quick Facts String', block.call(domain_object, 'quickFacts'.send(converter))
    assert_equal 'Notes String', block.call(domain_object, 'notes'.send(converter))
    assert_equal 'season1, season2', block.call(domain_object, 'season'.send(converter))
    block.call(domain_object, 'sorted_media').each_with_index do |medium, index|
      assert_equal "Media File Name #{index + 1} String", block.call(medium, 'fileName'.send(converter))
      assert_equal "Media Tag Name #{index + 1} String", block.call(medium, 'tagName'.send(converter))
      assert_equal "Media Title #{index + 1} String", block.call(medium, 'title'.send(converter))
      assert_equal "Media Caption #{index + 1} String", block.call(medium, 'caption'.send(converter))
      assert_equal "Media Credits #{index + 1} String", block.call(medium, 'credits'.send(converter))
    end
    block.call(domain_object, 'sorted_map_locations').each_with_index do |map_location, index|
      assert_equal index, block.call(map_location, 'xPercentage'.send(converter))
      assert_equal index, block.call(map_location, 'yPercentage'.send(converter))
    end
  end

  def assert_domain_query(plural_model_name, attr, attr_value)
    get '/finder/api/' + plural_model_name + '?' + attr + '=' + attr_value
    assert_response :success
    parsed_body = @response.parsed_body
    assert_not_empty parsed_body['data']
    get '/finder/api/' + plural_model_name + '?' + attr + '=' + attr_value + '&sortBy=common_name'
    assert_response :success
    parsed_body = @response.parsed_body
    assert_not_empty parsed_body['data']
    get '/finder/api/' + plural_model_name + '?' + attr + '=XXXX'
    assert_response :success
    parsed_body = @response.parsed_body
    assert_empty parsed_body['data']
  end

  def assert_common_query(attr, attr_value)
    @plural_model_names.each do |plural_model_name|
      assert_domain_query(plural_model_name, attr, attr_value)
    end
  end

  def assert_equal_domain_values(expected_value, domain_value)
    if expected_value.kind_of?(Array)

    else
      assert_equal expected_value, domain_value
    end
  end

  def get_included_map(included_array)
    map = Hash.new {|hash, key| hash[key] = {}}
    included_array.each do |each|
      map[each['type']][each['id']] = each
    end
    return(map)
  end

  def populate_relationships(domain_object, included_map)
    domain_object['relationships'].each_pair do |type, relHash|
      relHash['data'].each do |objHash|
        objHash['attributes'] = included_map[objHash['type']][objHash['id']]['attributes']
      end
    end
  end
end
