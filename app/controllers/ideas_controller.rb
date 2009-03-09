class IdeasController < ApplicationController
  def index
    @idea_list = Idea.find(:all, :conditions => { :completed => false })
  end

  def create
    @idea = Idea.create!(:title => params[:title], :description => params[:description])
    respond_to do |format|
      format.js { render :json => @idea }
    end
  end

  def update
    @idea = Idea.find(params[:id])
    @idea.update_attributes!(:title => params[:title], :description => params[:description])
    respond_to do |format|
      format.js { render :json => @idea }
    end
  end

  def destroy
    Idea.find(params[:id]).destroy
  end

  def show
    respond_to do |format|
      format.js { render :json => Idea.find(params[:id]) }
    end
  end
  

  private

end
