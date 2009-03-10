class SortablesController < ApplicationController
  before_filter :extract_model_class

  def create
    results = @sortable_value.enum_for(:each_with_index).collect do |id, index|
      model = @model_class.find_by_id(id)
      @sortable_value[index] = nil unless model
      model
    end
    results = results.delete_if { |model| model.nil? }
    @sortable_value = @sortable_value.delete_if { |id| id.nil? }

    record_hash = results.inject({}) do |memo, record|
      memo[record.id] = record
      memo
    end  
    @sortable_value.each_with_index do |id, sort_index|
      record_hash[id.to_i].update_attributes!(:sort => sort_index)
    end

    respond_to do |format|
      format.js { render :json => record_hash.collect { |k, v| k }.to_json }
    end
  end

  private

  # Precondition: There is only one parameter
  def extract_model_class
    sortable_param, sortable_value = params.find { |k, v| k != "controller" && k != "action" }
    @model_class = sortable_param.split("_").first.camelize.constantize
    @sortable_value = sortable_value
  end
end
