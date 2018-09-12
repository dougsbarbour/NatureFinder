require 'test_helper'

class MammalsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @mammal = create(:mammal)
  end

  test "should get index" do
    get mammals_url, as: :json
    assert_response :success
  end

  test "should create mammal" do
    assert_difference('Mammal.count') do
      post mammals_url, params: {common_name: @mammal.common_name, genus: @mammal.genus}, as: :json
    end

    assert_response 201
  end

  test "should show mammal" do
    get mammal_url(@mammal), as: :json
    assert_response :success
  end

  test "should update mammal" do
    patch mammal_url(@mammal), params: {common_name: @mammal.common_name}, as: :json
    assert_response 200
  end

  test "should destroy mammal" do
    assert_difference('Mammal.count', -1) do
      delete mammal_url(@mammal), as: :json
    end

    assert_response 204
  end
end
