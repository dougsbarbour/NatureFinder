class RemoveBloomingPeriodFromFlowers < ActiveRecord::Migration[5.2]
  def change
    remove_column :flowers, :blooming_period
  end
end
