require 'test_helper'

class BirdsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @bird = create(:bird)
  end

  test "should get index" do
    get birds_url, as: :json
    assert_response :success
  end

  test "should show bird" do
    get bird_url(@bird), as: :json
    assert_response :success
  end
end
