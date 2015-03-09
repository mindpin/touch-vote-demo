module ApplicationHelper

  def show_list(type, things, result)
    case type
    when 'vote'
      render 'home/vote_list', :show_things => things, :result => result
    when 'weibo'
      render 'home/weibo_list', :show_things => things, :result => result
    else
      render 'home/vote_list', :show_things => things, :result => result
    end
  end

end
