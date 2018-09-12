require 'test_helper'

class ReptilesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @reptile = create(:reptile)
  end

  test "should get index" do
    get reptiles_url, as: :json
    assert_response :success
  end

  test "should create reptile" do
    assert_difference('Reptile.count') do
      post reptiles_url, params: {common_name: @reptile.common_name, genus: @reptile.genus, sound_description: @reptile.sound_description}, as: :json
    end

    assert_response 201
  end

  test "should show reptile" do
    get reptile_url(@reptile), as: :json
    assert_response :success
  end

  test "should update reptile" do
    patch reptile_url(@reptile), params: {sound_description: @reptile.sound_description}, as: :json
    assert_response 200
  end

  test "should destroy reptile" do
    assert_difference('Reptile.count', -1) do
      delete reptile_url(@reptile), as: :json
    end

    assert_response 204
  end
end
