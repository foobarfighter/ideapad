class IdeasController < ApplicationController
  before_filter :set_completed

  def index
    @ideas = Idea.find(:all, :conditions => { :completed => @completed }, :order => :sort)

    render :template => "ideas/_idea_list.html.erb", :layout => false if request.xhr?
  end

  def create
    @idea = Idea.create!(:title => params[:title], :description => params[:description], :completed => false)
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

  def set_completed
    @completed = case params[:completed]
    when "true": true
    when "false": false
    else false
    end
  end

end
