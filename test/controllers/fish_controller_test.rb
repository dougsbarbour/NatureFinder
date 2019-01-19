require 'test_helper'

class FishControllerTest < ActionDispatch::IntegrationTest
  setup do
    @fish = create(:fish)
  end

  test "should get index" do
    get fish_index_url, as: :json
    assert_response :success
  end

  test "should show fish" do
    get fish_url(@fish), as: :json
    assert_response :success
  end

end
