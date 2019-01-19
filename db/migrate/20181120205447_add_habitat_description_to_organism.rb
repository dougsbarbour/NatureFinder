class AddHabitatDescriptionToOrganism < ActiveRecord::Migration[5.2]
  def change
    add_column :organisms, :habitat_description, :string
  end
end
