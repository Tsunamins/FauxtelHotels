class User < ApplicationRecord
    has_secure_password
    has_many :reservations
    has_many :rooms, through: :reservations

    validates :email, :first_name, :last_name, presence: true
    validates :email, uniqueness :ture
end
