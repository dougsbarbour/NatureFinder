class CreateConfigs < ActiveRecord::Migration[5.0]
  def change
    create_table :configs do |t|
      t.string :all_colors
      t.string :all_habitats

      t.timestamps
    end
  end
end
