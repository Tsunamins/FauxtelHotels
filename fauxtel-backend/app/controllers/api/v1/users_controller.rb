class Api::V1::UsersController < ApplicationController
  skip_before_action :authorized, only: [:create]

  # GET /users
  def index
    @users = User.all

    #render json: @users
    users_json = UserSerializer.new(@users).serialized_json
    render json: users_json
  end

  # GET /users/1
  def show
    #render json: @user
    user_json = UserSerializer.new(@user).serialized_json
    render json: user_json
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      token = encode_token({id: @user.id})
      render json: { user: UserSerializer.new(@user), jwt: token }, status: :accepted
    else
      render json: { message: 'Invalid username or password' }, status: :unauthorized
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
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:email, :password_digest, :first_name, :last_name)
    end
end
