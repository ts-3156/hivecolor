FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "person-#{n}@example.com" }
    email
    password { '123456' }
  end
end
