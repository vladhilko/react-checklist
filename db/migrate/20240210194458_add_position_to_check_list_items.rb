class AddPositionToCheckListItems < ActiveRecord::Migration[7.1]
  def change
    add_column :check_list_items, :position, :integer
  end
end
