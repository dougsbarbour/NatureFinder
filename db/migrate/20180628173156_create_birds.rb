class CreateBirds < ActiveRecord::Migration[5.0]
  def change
    create_table :birds do |t|
      t.string :sound_clip_filename
      t.string :song_description
      t.string :size
      t.string :photo_text1
      t.string :photo_text2
      t.string :female_photo_type

    end
  end
end
