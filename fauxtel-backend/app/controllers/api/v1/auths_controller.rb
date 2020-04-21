class Api::V1::AuthsController < ApplicationController

    #representing login
    def create
        @user = User.find_by(email: params[:user][:email])

        if @user && @user.authenticate(params[:user][:password])

            token = encode_token({id: @user.id})

            resp = {
                user: user_object(@user),
                jwt: token
            }
            render json: resp

        else
            resp = {
                error: "Invalid credentials",
                details: @user.errors.full_messages
            }

            render json: resp, status: :unauthorized
        end
    end

    #representing retrieving the current user
    def get_current_user
        if logged_in?
            render json: {
                user: user_object(current_user)
            }, status: :ok
        else
            render json: {error: "No current user"}
        end
    end


    
    
end
