require 'test_helper'

class TreesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @tree = create(:tree)
  end

  test "should get index" do
    get trees_url, as: :json
    assert_response :success
  end

  test "should show tree" do
    get tree_url(@tree), as: :json
    assert_response :success
  end

end
