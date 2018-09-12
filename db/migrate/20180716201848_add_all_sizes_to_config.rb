class AddAllSizesToConfig < ActiveRecord::Migration[5.0]
  def change
    add_column :configs, :all_sizes, :string
  end
end
