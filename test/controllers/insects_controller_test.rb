require 'test_helper'

class InsectsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @insect = create(:insect)
  end

  test "should get index" do
    get insects_url, as: :json
    assert_response :success
  end

  test "should show insect" do
    get insect_url(@insect), as: :json
    assert_response :success
  end

end
