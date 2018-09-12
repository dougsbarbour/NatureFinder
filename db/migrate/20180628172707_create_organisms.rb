class CreateOrganisms < ActiveRecord::Migration[5.0]
  def change
    create_table :organisms do |t|
      t.actable
      t.string :common_name
      t.string :genus
      t.string :species
      t.string :family_latin
      t.string :family_english
      t.string :color
      t.string :habitat
      t.string :photo_filename
      t.date :photo_date
      t.string :video_filename
      t.string :notes

      t.timestamps
    end
  end
end
