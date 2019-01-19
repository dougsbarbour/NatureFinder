class CreateMapLocations < ActiveRecord::Migration[5.2]
  def change
    create_table :map_locations do |t|
      t.decimal :x_percentage, precision: 64, scale: 15
      t.decimal :y_percentage, precision: 64, scale: 15
      t.integer :organism_id

      t.timestamps
    end
    add_index :map_locations, :organism_id
  end
end
