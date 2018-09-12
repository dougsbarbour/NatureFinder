class CreateFlowers < ActiveRecord::Migration[5.0]
  def change
    create_table :flowers do |t|
      t.string :blooming_period

    end
  end
end
