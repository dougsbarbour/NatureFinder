class CreateTrees < ActiveRecord::Migration[5.0]
  def change
    create_table :trees do |t|
      t.string :tree_type
      t.string :leaf_position
      t.string :leaf_structure
      t.string :leaf_type

    end
  end
end
