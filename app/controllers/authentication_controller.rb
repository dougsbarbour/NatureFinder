class AuthenticationController < ApplicationController
  def authenticate
    command = AuthenticateUser.new(params[:email], params[:password]).call
    if command.success?
      render json: {data: {auth_token: command.result, expires_at: command.expiration}}
    else
      render json: {data: {error: command.errors}}, status: :unauthorized
    end
  end
end
