class RemoveGenusSpeciesFamilyLatinFamilyEnglishFromOrganism < ActiveRecord::Migration[5.2]
  def change
    remove_column :organisms, :genus, :string
    remove_column :organisms, :species, :string
    remove_column :organisms, :family_latin, :string
    remove_column :organisms, :family_english, :string
  end
end
