require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe SortablesController do
  attr_reader :params, :model_ids
  before do
    @model_ids = (0..5).collect { |i| idea = Idea.create!(:title => "title#{i}", :description => "description#{i}", :completed => false); idea.id }
    @params = { "idea_list" => model_ids.reverse! }
  end

  describe "#extract_model_class" do
    it "sets the Model class" do
      xhr :post, :create, params
      controller.assigns["model_class"].should == Idea
    end

    it "sets the Sortable values" do
      xhr :post, :create, params
      controller.assigns["sortable_value"].should == params["idea_list"]
    end
  end

  it "sets the order field of all on the model class for all items passed" do
    xhr :post, :create, params
    ideas = Idea.find(:all, :conditions => ["id in (?)", model_ids], :order => :sort)

    ideas.size.should == model_ids.size
    ideas.each_with_index do |idea, i|
      idea.id.should == model_ids[i]
    end
  end
end
