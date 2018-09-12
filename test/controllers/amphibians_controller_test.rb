require 'test_helper'

class AmphibiansControllerTest < ActionDispatch::IntegrationTest
  setup do
    @amphibian = create(:amphibian)
  end

  test "should get index" do
    get amphibians_url, as: :json
    assert_response :success
  end

  test "should create amphibian" do
    assert_difference('Amphibian.count') do
      post amphibians_url, params: {common_name: @amphibian.common_name, genus: @amphibian.genus, sound_clip_filename: @amphibian.sound_clip_filename, sound_description: @amphibian.sound_description}, as: :json
    end

    assert_response 201
  end

  test "should show amphibian" do
    get amphibian_url(@amphibian), as: :json
    assert_response :success
  end

  test "should update amphibian" do
    patch amphibian_url(@amphibian), params: {sound_clip_filename: @amphibian.sound_clip_filename, sound_description: @amphibian.sound_description}, as: :json
    assert_response 200
  end

  test "should destroy amphibian" do
    assert_difference('Amphibian.count', -1) do
      delete amphibian_url(@amphibian), as: :json
    end

    assert_response 204
  end
end
