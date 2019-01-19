class AddQuickFactsToOrganism < ActiveRecord::Migration[5.2]
  def change
    add_column :organisms, :quick_facts, :string
  end
end
