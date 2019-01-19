require 'test_helper'

class AmphibiansControllerTest < ActionDispatch::IntegrationTest
  setup do
    @amphibian = create(:amphibian)
  end

  test "should get index" do
    get amphibians_url, as: :json
    assert_response :success
  end

  test "should show amphibian" do
    get amphibian_url(@amphibian), as: :json
    assert_response :success
  end
end
