class Api::V1::AuthsController < ApplicationController

    #representing login
    def create
        @user = User.find_by(email: params[:user][:email])
        
        if @user && @user.authenticate(params[:user][:password])
        else
        end
    end

    #representing retrieving the current user
    def get_current_user
    end


    
    
end
