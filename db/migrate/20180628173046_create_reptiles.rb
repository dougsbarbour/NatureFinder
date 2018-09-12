class CreateReptiles < ActiveRecord::Migration[5.0]
  def change
    create_table :reptiles do |t|
      t.string :sound_description
      t.string :sound_clip_filename

    end
  end
end
