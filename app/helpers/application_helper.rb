module ApplicationHelper

  def show_list(type, compare_list)
    render "home/#{type}_list", :compare_list => compare_list
  end

end
