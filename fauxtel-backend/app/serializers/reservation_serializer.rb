class ReservationSerializer
  include FastJsonapi::ObjectSerializer
  attributes :start_date, :end_date, :user_id, :room_id, :location_id, :room, :location


 
 
 
end
