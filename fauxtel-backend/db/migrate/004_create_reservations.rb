class CreateReservations < ActiveRecord::Migration[6.0]
    def change
      create_table :reservations do |t|
        t.date :start_date
        t.date :end_date
        t.date 'date_range', array: true, default: []
        t.belongs_to :user, foreign_key: true
        t.belongs_to :room, foreign_key: true
        t.belongs_to :location, foreign_key: true
  
        t.timestamps
      end
      #the idea of add_index here is to speed up query performance with gin
      #add_index :reservations, :date_range, using: 'gin'
    end
  end