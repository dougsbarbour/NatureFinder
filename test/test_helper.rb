ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require 'json'

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  include FactoryBot::Syntax::Methods

  # Add more helper methods to be used by all tests here...
  def assert_common_domain_attributes(domain_object)
    assert_equal "Common Name String", domain_object["commonName"]
    assert_equal "Genus String", domain_object["genus"]
    assert_equal "Species String", domain_object["species"]
    assert_equal "Family Latin String", domain_object["familyLatin"]
    assert_equal "Family English String", domain_object["familyEnglish"]
    assert_equal "red,green,blue", domain_object["color"]
    assert_equal "water,woods", domain_object["habitat"]
    assert_equal "Photo Filename String", domain_object["photoFilename"]
    assert_equal "2000-01-01", domain_object["photoDate"]
    assert_equal "Video Filename String", domain_object["videoFilename"]
    assert_equal "Notes String", domain_object["notes"]
    assert_equal "Photo Text 1 String", domain_object["photoText1"]
    assert_equal "Photo Text 2 String", domain_object["photoText2"]
  end

  def assert_domain_query(plural_model_name, attr, attr_value)
    get "/finder/api/" + plural_model_name + "?" + attr + "=" + attr_value
    assert_response :success
    parsed_body = @response.parsed_body
    assert_not_empty parsed_body
    get "/finder/api/" + plural_model_name + "?" + attr + "=" + attr_value + "&sortBy=common_name"
    assert_response :success
    parsed_body = @response.parsed_body
    assert_not_empty parsed_body
    get "/finder/api/" + plural_model_name + "?" + attr + "=XXXX"
    assert_response :success
    parsed_body = @response.parsed_body
    assert_empty parsed_body
  end

  def assert_common_query(attr, attr_value)
    @plural_model_names.each do |plural_model_name|
      assert_domain_query(plural_model_name, attr, attr_value)
    end
  end
end
