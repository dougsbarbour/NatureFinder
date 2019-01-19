require 'test_helper'

class ReptilesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @reptile = create(:reptile)
  end

  test "should get index" do
    get reptiles_url, as: :json
    assert_response :success
  end


  test "should show reptile" do
    get reptile_url(@reptile), as: :json
    assert_response :success
  end

 end
