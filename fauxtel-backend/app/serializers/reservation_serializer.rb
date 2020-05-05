class ReservationSerializer
  include FastJsonapi::ObjectSerializer
  attributes :start_date, :end_date, :date_range, :user_id, :room_id, :location_id
  belongs_to :user
  belongs_to :room
  belongs_to :location
end
