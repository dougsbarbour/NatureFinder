class RemoveOrganismFields < ActiveRecord::Migration[5.2]
  def change
    remove_column :organisms, :photo_filename, :string
    remove_column :organisms, :photo_date, :date
    remove_column :organisms, :video_filename, :string
    remove_column :organisms, :photo_text_1, :string
    remove_column :organisms, :photo_text_2, :string
  end
end
