FactoryBot.define do
  factory :bird, parent: :organism, class: Bird do
    size { 'small' }
  end
end