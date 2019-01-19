class RemoveFemalePhotoTypeFromBirds < ActiveRecord::Migration[5.2]
  def change
    remove_column :birds, :female_photo_type
  end
end
