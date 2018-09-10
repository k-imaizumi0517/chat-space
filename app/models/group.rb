class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  # テキストの回答
  # validates :name, presence: true
end
