json.extract! filter, :id, :name, :function_name, :description, :num_parameters, :example, :created_at, :updated_at
json.url filter_url(filter, format: :json)
