FactoryBot.define do
  factory :fish, parent: :organism, class: Fish do
    size { 'small' }
  end
end