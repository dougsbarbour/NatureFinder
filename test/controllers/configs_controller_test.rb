require 'test_helper'

class ConfigsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @config = Config.instance
  end

  test "should get index" do
    get config_url, as: :json
    assert_response :success
  end

  test "should show config" do
    get config_url(@config), as: :json
    assert_response :success
  end
end
