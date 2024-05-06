class Api::V1::UsersController < ApplicationController
    #skip_before_action :authorized, only: [:create]

    # GET /users
    def index
        @users = User.all
        users_json = UserSerializer.new(@users).serialized_json
        render json: users_json
    end

    # GET /users/1
    def show
        @user = User.find_by(id: params[:id]) 
        user_json = UserSerializer.new(@user).serialized_json
        render json: user_json
    end

    # POST /users
    def create
        @user = User.create(user_params)

        if @user.valid?
            UserMailer.with(user: @user).welcome_email.deliver_now #mailer addition
        
            token = encode_token({id: @user.id})
            resp = {
                user: UserSerializer.new(@user),
                jwt: token
            }
            render json: resp
        else
            resp = {
            error: @user.errors.full_messages.to_sentence
            }      
            render json: resp, status: :unprocessable_entity
        end
    end

    # PATCH/PUT /users/1
    def update
        if @user.update(user_params)
            render json: @user
        else
            render json: @user.errors, status: :unprocessable_entity
        end
    end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:email, :password, :first_name, :last_name)
    end
end
