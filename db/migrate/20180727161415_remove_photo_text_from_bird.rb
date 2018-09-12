class RemovePhotoTextFromBird < ActiveRecord::Migration[5.2]
  def change
    remove_column :birds, :photo_text1, :string
    remove_column :birds, :photo_text2, :string
  end
end
