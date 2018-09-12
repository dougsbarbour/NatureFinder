class AddMapLocationsToFlowers < ActiveRecord::Migration[5.2]
  def change
    add_column :flowers, :map_locations, :string
  end
end
