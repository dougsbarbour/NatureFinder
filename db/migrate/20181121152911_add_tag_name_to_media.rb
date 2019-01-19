class AddTagNameToMedia < ActiveRecord::Migration[5.2]
  def change
    add_column :media, :tag_name, :string
  end
end
