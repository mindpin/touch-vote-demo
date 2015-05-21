# touch-vote-demo

## 需求来源
1. https://github.com/mindpin/TouchIdea/issues/1
2. https://github.com/mindpin/touch-vote-demo/issues/2





## Installation

1. bundle install
2. rails s
3. open http://localhost:3000


## Guide
1. 上传 yaml 文件到， 代码根目录 / data 路径下
2. 创建相应的 view, 比如上传的yaml文件名为 weibo.yml ，则在 home view 下创建一个 _weibo_list.html.erb, 显示相应的字段
3. http://localhost:3000/home?number=3&type=book&prepare_fields=count

### url 参数说明
1. number: 要显示的条目数量
2. type: 上传的 yml 文件名
3. prepare_fields: 要比较的字段，如果是多个用逗号隔开, etc: http://localhost:3000/home?number=3&type=book&prepare_fields=fans_count,weibo_count
