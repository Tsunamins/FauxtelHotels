class ApplicationController < ActionController::API
    def encode_token(payload)
        JWT.encode(payload, ENV['JWT_TOKEN_SECRET'])
    end

    def decode_token_and_get_user_id
        token = ''
        if request.headers["Authorization"].include? 'Bearer'
            token = request.headers["Authorization"].split(' ')[1]
        else
            token = request.headers["Authorization"]
        end

        JWT.decode(token, ENV['JWT_TOKEN_SECRET'])[0]["id"]
          
    end

    def current_user
        begin
            puts "did this run???"
          User.find(decode_token_and_get_user_id)
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
