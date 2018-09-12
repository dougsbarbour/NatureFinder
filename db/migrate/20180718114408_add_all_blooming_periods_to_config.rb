class AddAllBloomingPeriodsToConfig < ActiveRecord::Migration[5.0]
  def change
    add_column :configs, :all_blooming_period_months, :string
  end
end
