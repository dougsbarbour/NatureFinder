class RemoveSoundFromSubclasses < ActiveRecord::Migration[5.2]
  def change
    remove_column :amphibians, :sound_description, :string
    remove_column :amphibians, :sound_clip_filename, :string
    remove_column :birds, :song_description, :string
    remove_column :birds, :sound_clip_filename, :string
    remove_column :reptiles, :sound_description, :string
    remove_column :reptiles, :sound_clip_filename, :string
  end
end
