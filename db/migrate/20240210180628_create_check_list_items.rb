class CreateCheckListItems < ActiveRecord::Migration[7.1]
  def change
    create_table :check_list_items do |t|
      t.text :text
      t.boolean :completed
      t.references :check_list, null: false, foreign_key: true

      t.timestamps
    end
  end
end
