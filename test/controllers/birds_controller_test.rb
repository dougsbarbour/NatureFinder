require 'test_helper'

class BirdsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @bird = create(:bird)
  end

  test "should get index" do
    get birds_url, as: :json
    assert_response :success
  end

  test "should create bird" do
    assert_difference('Bird.count') do
      post birds_url, params: {common_name: @bird.common_name, genus: @bird.genus, female_photo_type: @bird.female_photo_type, photo_text_1: @bird.photo_text_1, photo_text_2: @bird.photo_text_2, size: @bird.size, song_description: @bird.song_description}, as: :json
    end

    assert_response 201
  end

  test "should show bird" do
    get bird_url(@bird), as: :json
    assert_response :success
  end

  test "should update bird" do
    patch bird_url(@bird), params: {female_photo_type: @bird.female_photo_type, photo_text_1: @bird.photo_text_1, photo_text_2: @bird.photo_text_2, size: @bird.size, song_description: @bird.song_description}, as: :json
    assert_response 200
  end

  test "should destroy bird" do
    assert_difference('Bird.count', -1) do
      delete bird_url(@bird), as: :json
    end

    assert_response 204
  end
end
