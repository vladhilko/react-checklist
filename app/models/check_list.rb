class CheckList < ApplicationRecord
  has_many :check_list_items, dependent: :destroy
end
