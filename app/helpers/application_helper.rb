module ApplicationHelper

  def show_list(type, things)
    case type
    when 'vote'
      render 'home/vote_list', :show_things => things
    when 'weibo'
      render 'home/weibo_list', :show_things => things
    else
      render 'home/vote_list', :show_things => things
    end
  end

end
