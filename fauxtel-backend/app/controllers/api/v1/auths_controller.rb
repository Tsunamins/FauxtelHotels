class Api::V1::AuthsController < ApplicationController

    #representing login
    def login
        #binding.pry
        @user = User.find_by(email: params[:email])

        if @user && @user.authenticate(params[:password])

            token = encode_token({id: @user.id})

           
            resp = {
                user: UserSerializer.new(@user),
                jwt: token
            }

            render json: resp
            

        else
            # resp = {
            #     error: "Invalid credentials",
            #     details: @user.errors.full_messages
            # }

            # render json: resp, status: :unauthorized
            render json: {
                error: "Invalid Credentials"
              }
        end
    end

    #representing retrieving the current user
    def get_current_user
        if logged_in?
            render json: {
                user: UserSerializer.new(current_user)
            }, status: :ok
        else
            render json: {error: "No current user"}
        end
    end


    
    
end
