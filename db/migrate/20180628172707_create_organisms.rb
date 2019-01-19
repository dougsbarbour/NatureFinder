class CreateOrganisms < ActiveRecord::Migration[5.0]
  def change
    create_table :organisms do |t|
      t.actable
      t.string :common_name
      t.string :scientific_name
      t.string :habitat_description
      t.string :quick_facts
      t.string :color
      t.string :habitat
      t.string :notes

      t.timestamps
    end
  end
end
