class Api::V1::RoomsController < ApplicationController
  #before_action :set_room, only: [:show, :update, :destroy]

  # GET /rooms
  def index
    @rooms = Room.all

    #options = {include: [:reservations]}
    #render json: @rooms
    rooms_json = RoomSerializer.new(@rooms)
    render json: rooms_json
  end

  # GET /rooms/1
  def show
    
    # @room = Room.find_by(id: params[:id]) 

    # room_json = RoomSerializer.new(@room).serialized_json
    # render json: room_json

    @room = Room.find_by(id: params[:id])
    render json: @room
  end

  # POST /rooms
  def create
    @room = Room.new(room_params)

    if @room.save
      render json: @room, status: :created, location: @room
    else
      render json: @room.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /rooms/1
  def update
    if @room.update(room_params)
      render json: @room
    else
      render json: @room.errors, status: :unprocessable_entity
    end
  end

  # DELETE /rooms/1
  def destroy
    @room.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
   

    # Only allow a trusted parameter "white list" through.
    def room_params
      params.require(:room).permit(:room_number, :room_type, :location_id, :occupied_dates, :status)
    end
end
