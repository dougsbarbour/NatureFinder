require 'test_helper'

class AuthenticationControllerTest < ActionDispatch::IntegrationTest
  auth_token = nil
  user = nil
  setup do
    user = User.create!(email: 'example@mail.com' , password: '123123123' , password_confirmation: '123123123')
    post authenticate_url({"email":"example@mail.com","password":"123123123"}), as: :json
    assert_response :success
    auth_token = JSON.parse(response.body)['data']['authToken']
  end

  test "should get token" do
    assert_not_nil auth_token
    assert_equal user, User.find(JsonWebToken.decode(auth_token)[:user_id])
  end
end
