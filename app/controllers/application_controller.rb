class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session

  skip_before_filter :verify_authenticity_token

  before_filter :authenticate_user_from_token!

  private

    def authenticate_user_from_token!
      user_email = request.headers['X-Account-Name'].presence
      user = user_email && User.find_by_email(user_email)

      # Notice how we use Devise.secure_compare to compare the token
      # in the database with the token given in the params, mitigating
      # timing attacks.
      if user && Devise.secure_compare(user.authentication_token, request.headers['X-Api-Key'])
        sign_in user, store: false
      end
    end
end
