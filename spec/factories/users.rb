FactoryBot.define do
  sequence(:email) {|n| "person-#{n}@example.com" }

  factory :user do
    email
    password '123456'
  end
end
