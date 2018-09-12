class CreateFish < ActiveRecord::Migration[5.0]
  def change
    create_table :fish do |t|
      t.string :size

    end
  end
end
