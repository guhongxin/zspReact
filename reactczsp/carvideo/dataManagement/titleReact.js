var TitleZj=React.createClass({
	render:function(){
		return(
			<div className="current-page-title">
	        	<h3>{this.props.title}</h3>
	        </div>
	   	)
	}
});
ReactDOM.render(
	<TitleZj  title='数据信息管理' />,
	document.getElementById('titleZj')
)

