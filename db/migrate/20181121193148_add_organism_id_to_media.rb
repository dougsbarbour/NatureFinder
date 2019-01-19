class AddOrganismIdToMedia < ActiveRecord::Migration[5.2]
  def change
    add_column :media, :organism_id, :integer
    add_index :media, :organism_id
  end
end
