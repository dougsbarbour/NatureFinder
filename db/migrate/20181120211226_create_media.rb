class CreateMedia < ActiveRecord::Migration[5.2]
  def change
    create_table :media do |t|
      t.string :file_name
      t.string :title
      t.string :credits
      t.string :caption

      t.timestamps
    end
  end
end
