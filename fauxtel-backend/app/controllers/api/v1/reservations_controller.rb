class Api::V1::ReservationsController < ApplicationController
  #before_action :set_reservation, only: [:show, :update, :destroy]

  # GET /reservations
  def index
    @reservations = Reservation.all

    render json: @reservations
    # resos_json = RoomSerializer.new(@reservations)
    # render json: resos_json
  end

  # GET /reservations/1
  def show
    render json: @reservation
  end

  # POST /reservations
  def create
 
    if current_user
     
      @reservation = current_user.reservations.build(reservation_params)
     
        if @reservation.save
          render json: @reservation, status: :created, location: @reservation
        else
          render json: @reservation.errors, status: :unprocessable_entity
        end
     
      end
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
    @reservation.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_reservation
      @reservation = Reservation.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def reservation_params
      params.require(:reservation).permit(:start_date, :end_date, :date_range, :user_id, :room_id, :location_id)
    end
end
