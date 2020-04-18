class Location < ApplicationRecord
    has_many :rooms
    has_many :reservations
end
