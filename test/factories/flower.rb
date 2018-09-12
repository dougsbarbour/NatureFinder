FactoryBot.define do
  factory :flower, parent: :organism, class: Flower do
    blooming_period 'January February March'
  end
end