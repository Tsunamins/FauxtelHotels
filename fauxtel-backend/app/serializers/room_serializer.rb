class RoomSerializer
  include FastJsonapi::ObjectSerializer
  attributes :room_number, :room_type, :location_id, :occupied_dates, :status, :description, :reservations, :location

  
  



end
