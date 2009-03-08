class Idea < ActiveRecord::Base
  named_scope :incomplete, :conditions => { :completed => false }
end
