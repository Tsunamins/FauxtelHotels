class Api::V1::ReservationsController < ApplicationController
    before_action :set_reservation, only: [:show, :update, :destroy]

    # GET /reservations
    def index
        @reservations = Reservation.all 
        res_json = ReservationSerializer.new(@reservations).serialized_json
        render json: res_json
    end

    # GET /reservations/1
    def show   
        @reservation = Reservation.find_by(id: params[:id]) 
        res_json = ReservationSerializer.new(@reservation).serialized_json
        render json: res_json
    end

  # POST /reservations
  def create
    @reservation = Reservation.new(reservation_params)

    if @reservation.save
        u_id = @reservation.user_id
        @user = User.find_by(id: u_id)
        ReservationMailer.with(reservation: @reservation, user: @user).reservation_confirmation.deliver_now
        render json: @reservation, status: :created, reservation: @reservation
    else
      render json: @reservation.errors, status: :unprocessable_entity
    end
  end

    # PATCH/PUT /reservations/1
    def update
        @user = current_user
        puts '!!!!!!!!!!!!!!!! '
        if @user.id == @reservation.user_id
          puts reservation_params
      
            if @reservation.update(reservation_params)
                render json:  ReservationSerializer.new(@reservation), status: :ok
            end
        else
            render json: {
                error: "not logged in", status: :unauthorized
            }
        end
    end

  # DELETE /reservations/1
  def destroy
    # todo, using basic delete reservation for now, later change to the current user, maybe add on an admin layer, also 
    # considering a email based login that will allow user to be automatically logged in and view/update/cancel their reserv
    @reservation.destroy
    #  @user = current_user
    #  if @user.id != @reservation.user_id
    #   render json: {
    #     error: "not logged in", status: :unauthorized
    #   }
    #  else
    #   @reservation.destroy
    #   render json: { data: "Reservation cancelled" }, status: :ok
    #  end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_reservation
      @reservation = Reservation.find_by(id: params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def reservation_params
      params.require(:reservation).permit(:start_date, :end_date, :user_id, :room_id, :location_id)
    end
end
