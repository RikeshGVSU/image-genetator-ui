class CreateCodeDownloads < ActiveRecord::Migration[5.2]
  def change
    create_table :code_downloads do |t|
      t.string :versions
      t.text :description

      t.timestamps
    end
  end
end
