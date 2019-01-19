class RemoveMapLocationsFromFlowers < ActiveRecord::Migration[5.2]
  def change
    remove_column :flowers, :map_locations, :string
  end
end
