class Api::V1::UsersController < ApplicationController
  #skip_before_action :authorized, only: [:create]

  # GET /users
  def index
    @users = User.all

    #render json: @users
    users_json = UserSerializer.new(@users).serialized_json
    render json: users_json
  end

  # GET /users/1
  def show
    @user = User.find_by(id: params[:id]) 
    #render json: @user
    user_json = UserSerializer.new(@user).serialized_json
    render json: user_json
  end

  # POST /users
  def create
    @user = User.create(user_params)
    
    #respond_to do |format| #mailer addition
      if @user.valid?

        UserMailer.with(user: @user).welcome_email.deliver_now #mailer addition
        # format.html { redirect_to(@user, notice: 'User was successfully created.') }
        # format.json { render json: @user, status: :created, location: @user }
      
        token = encode_token({id: @user.id})
        resp = {
            user: UserSerializer.new(@user),
            jwt: token
        }
        render json: resp
      else
        #mailer additions
        # format.html { render action: 'new' }
        # format.json { render json: @user.errors, status: :unprocessable_entity }
      
        resp = {
          error: @user.errors.full_messages.to_sentence
        }      
        render json: resp, status: :unprocessable_entity
      end
    #end #end respond_to
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
