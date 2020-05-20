class Api::V1::ReservationsController < ApplicationController
  before_action :set_reservation, only: [:show, :update, :destroy]

  # GET /reservations
  def index

    @reservations = Reservation.all 
    render json: @reservations

    # if logged_in?
    #   @reservations = current_user.reservations

    #   render json: @reservations, status: : ok
    # else
    #   render json: {
    #     error: "not logged in", status: :unauthorized
    #   }
   
  end

  # GET /reservations/1
  def show
    render json: @reservation
  end

  # POST /reservations
  def create
    @reservation = Reservation.new(reservation_params)

    if @reservation.save
       u_id = @reservation.user_id
      
       @user = User.find_by(id: u_id)
      
      
       #ReservationMailer.with(reservation: @reservation, user: @user).reservation_confirmation.deliver_now
      
      render json: @reservation, status: :created, reservation: @reservation


    else
      render json: @reservation.errors, status: :unprocessable_entity
    end
    # binding.pry
    # if logged_in?
     
    #   @reservation = current_user.reservations.build(reservation_params)
     
    #     if @reservation.save
    #       render json: @reservation, status: :created, location: @reservation
    #     else
    #       render json: @reservation.errors, status: :unprocessable_entity
    #     end
     
    #   end
  end

  # PATCH/PUT /reservations/1
  def update
    if @reservation.update(reservation_params)
      render json: @reservation
    else
      render json: @reservation.errors, status: :unprocessable_entity
    end
  end

  # DELETE /reservations/1
  def destroy
    #change later if using based on no login, but a reservation code generator, change based on incoming params, i.e. am_wine_reviewer/index
     @user = current_user
    
     if @user.id != @reservation.user_id
      render json: {
        error: "not logged in", status: :unauthorized
      }
     else
      @reservation.destroy
      render json: { data: "Reservation cancelled" }, status: :ok
     end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_reservation
      @reservation = Reservation.find_by(id: params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def reservation_params
      params.require(:reservation).permit(:start_date, :end_date, :date_range, :user_id, :room_id, :location_id)
    end
end
