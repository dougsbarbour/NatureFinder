require 'test_helper'

class TreesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @tree = create(:tree)
  end

  test "should get index" do
    get trees_url, as: :json
    assert_response :success
  end

  test "should create tree" do
    assert_difference('Tree.count') do
      post trees_url, params: { common_name: @tree.common_name, genus: @tree.genus, leaf_position: @tree.leaf_position, leaf_structure: @tree.leaf_structure, leaf_type: @tree.leaf_type, tree_type: @tree.tree_type }, as: :json
    end

    assert_response 201
  end

  test "should show tree" do
    get tree_url(@tree), as: :json
    assert_response :success
  end

  test "should update tree" do
    patch tree_url(@tree), params: { leaf_position: @tree.leaf_position, leaf_structure: @tree.leaf_structure, leaf_type: @tree.leaf_type, tree_type: @tree.tree_type }, as: :json
    assert_response 200
  end

  test "should destroy tree" do
    assert_difference('Tree.count', -1) do
      delete tree_url(@tree), as: :json
    end

    assert_response 204
  end
end
