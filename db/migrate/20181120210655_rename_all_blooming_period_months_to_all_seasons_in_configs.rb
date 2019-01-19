class RenameAllBloomingPeriodMonthsToAllSeasonsInConfigs < ActiveRecord::Migration[5.2]
  def change
    rename_column :configs, :all_blooming_period_months, :all_seasons
  end
end
