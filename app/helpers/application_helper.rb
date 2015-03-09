module ApplicationHelper

  def show_list(type, things)
    render "home/#{type}_list", :show_things => things
  end

end
