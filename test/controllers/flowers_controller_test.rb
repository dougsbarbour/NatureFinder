require 'test_helper'

class FlowersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @flower = create(:flower)
  end

  test "should get index" do
    get flowers_url, as: :json
    assert_response :success
  end

  test "should show flower" do
    get flower_url(@flower), as: :json
    assert_response :success
  end

end
