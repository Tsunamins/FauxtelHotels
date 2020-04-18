class CreateRooms < ActiveRecord::Migration[6.0]
  def change
    create_table :rooms do |t|
      t.integer :room_number
      t.string :room_type
      t.belongs_to :location, foreign_key: true
      #idea to specify dates of occupancy
      t.date 'occupied_dates', array: true, default: []
      
      #status is idea of future admin function to show, cleaned, cleaning, needs cleaned, currently occupied, currently vacant
      t.string :status

      t.timestamps
    end
    #add_index :rooms, :occupied_dates, using: 'gin'
  end
end