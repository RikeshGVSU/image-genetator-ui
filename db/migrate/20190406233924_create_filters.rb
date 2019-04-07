class CreateFilters < ActiveRecord::Migration[5.2]
  def change
    create_table :filters do |t|
      t.string :name
      t.string :function_name
      t.text :description
      t.integer :num_parameters
      t.string :example

      t.timestamps
    end
  end
end
