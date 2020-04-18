class CreateLocations < ActiveRecord::Migration[6.0]
    def change
      create_table :locations do |t|
        t.string :name
        t.string :city
        t.string :state
        t.string :address
        t.string :phone
        t.string :description
  
        t.timestamps
      end
    end
  end