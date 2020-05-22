class LocationSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :city, :state, :description, :rooms
end
