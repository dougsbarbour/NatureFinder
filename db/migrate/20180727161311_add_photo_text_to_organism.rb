class AddPhotoTextToOrganism < ActiveRecord::Migration[5.2]
  def change
    add_column :organisms, :photo_text_1, :string
    add_column :organisms, :photo_text_2, :string
  end
end
