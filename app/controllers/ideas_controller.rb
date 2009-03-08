class IdeasController < ApplicationController
  def index
    @idea_list = Idea.find(:all, :conditions => { :completed => false })
  end

  def create
    puts params
    render :text => ""
  end

  private

end
