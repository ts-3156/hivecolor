require 'rails_helper'

RSpec.describe User, type: :model do
  describe '#new' do
    it 'works!' do
      expect(User.new).to be_truthy
      expect{(create(:user))}.to change(User, :count).by(1)
    end
  end
end
