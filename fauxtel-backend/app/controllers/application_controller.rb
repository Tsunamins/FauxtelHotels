class ApplicationController < ActionController::API
  #before_action :authorized
    # def user_object(user)
    #     UserSerializer.new(user)
    # end

    def encode_token(payload)
        JWT.encode(payload, ENV['JWT_TOKEN_SECRET'])
    end

    def decode_token_and_get_user_id
        JWT.decode(request.headers["Authorization"], ENV['JWT_TOKEN_SECRET'])[0]["id"]

    end

    def current_user
        begin
          @current_user ||= User.find(decode_token_and_get_user_id)
        rescue
          return nil
        end
      end
    
      def logged_in?
        !!current_user
      end

      def authorized
        render json: { message: 'Please log in' }, status: :unauthorized unless logged_in?
      end






end
