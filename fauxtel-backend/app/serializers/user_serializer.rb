class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :email, :first_name, :last_name, :reservations, :rooms
 
  has_many :reservations, serializer: ReservationSerializer
  
end
