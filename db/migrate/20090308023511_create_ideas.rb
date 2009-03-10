class CreateIdeas < ActiveRecord::Migration
  def self.up
    create_table :ideas do |t|
      t.string :title
      t.string :description
      t.integer :completed
      t.integer :sort
      t.timestamps
    end
  end

  def self.down
    drop_table :ideas
  end
end
