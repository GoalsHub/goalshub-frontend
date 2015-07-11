module Api::V1
  class TokensController < Api::ApplicationController

    resource_description do
      short 'API authentication'
      formats ['json', 'xml']
      #api_version "v1"
      error 406, "Invalid format. Json or xml requests are expected."
    end

    api! 'This method authenticates you using your e-mail and password'
    param :email, String, :desc => "E-mail used for registration", :required => true
    param :password, String, :desc => "Your password", :required => true
    error :code => 400, :desc => "Required params were not submitted"
    error :code => 401, :desc => "Authentication failed"

    def create

      if request.format != :json && request.format != :xml
        render :status => 406, request.format.symbol => {:message => "The request must be json or xml"}
        return
      end

      email = request.format == :xml ? params[:xml][:email] : params[:email]
      password = request.format == :xml ? params[:xml][:password] : params[:password]

      if email.nil? or password.nil?
        render :status => 400,
               request.format.symbol => {:message => "The request must contain the user email and password."}
        return
      end

      @user=User.find_by_email(email.downcase)

      if @user.nil?
        logger.info("User #{email} failed signin, user cannot be found.")
        render :status => 401, request.format.symbol => {:message => "Invalid email or passoword."}
        return
      end

      # http://rdoc.info/github/plataformatec/devise/master/Devise/Models/TokenAuthenticatable
      @user.ensure_authentication_token!

      if not @user.valid_password?(password)
        logger.info("User #{email} failed signin, password \"#{password}\" is invalid")
        render :status => 401, request.format.symbol => {:message => "Invalid email or passoword."}
      else
        render :status => 200, request.format.symbol => {:token => @user.authentication_token}
      end
    end


    api! 'This method invalidates your authentication token'

    def destroy
      @user=User.find_by_authentication_token(params[:id])
      if @user.nil?
        logger.info("Token not found.")
        render :status => 404, :json => {:message => "Invalid token."}
      else
        @user.reset_authentication_token!
        render :status => 200, :json => {:token => params[:id]}
      end
    end

    def skip_auth?
      true
    end

  end
end