require 'test_helper'

class MammalsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @mammal = create(:mammal)
  end

  test "should get index" do
    get mammals_url, as: :json
    assert_response :success
  end

  test "should show mammal" do
    get mammal_url(@mammal), as: :json
    assert_response :success
  end
 end
