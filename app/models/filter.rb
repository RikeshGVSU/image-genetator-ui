class Filter < ApplicationRecord
    validates :name, presence: true, length: {minimum: 3, maximum: 60}
    validates :function_name, presence: true, length: {minimum: 3, maximum: 60}
    validates :num_parameters, numericality: {greater_than_or_equal_to: 0}
end
