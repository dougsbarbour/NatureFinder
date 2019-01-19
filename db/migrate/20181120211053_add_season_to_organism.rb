class AddSeasonToOrganism < ActiveRecord::Migration[5.2]
  def change
    add_column :organisms, :season, :string
  end
end
