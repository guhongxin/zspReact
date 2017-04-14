var HeaderNav=React.createClass({
	getInitialState:function(){
//		alert('getInitialState');
		var _username=sessionStorage.getItem('username');
		return {
			username:_username,
		}
	},
	componentWillMount:function(){
		//在渲染前调用
//		alert('componentWillMount');
	},
	componentDidMount:function(){
		// 第一次渲染后调用，组件已经生成了对应的DOM结构
//		alert('componentDidMount');
//		
	},
	oneMenu:function(e){
		var $doc=$(e.target);
		if(!$doc.next('.systemSettings-menu').is(':visible')){
			$doc.next('.systemSettings-menu').css({'display':'inline-block'});
		}else{
			$doc.next('.systemSettings-menu').css({'display':'none'});
		}
		
	},
	twoMenu:function(e){
		var $doc=$(e.target);
		if(!$doc.next('.systemSettings-menu').is(':visible')){
			$doc.next('.systemSettings-menu').css({'display':'inline-block'});
		}else{
			$doc.next('.systemSettings-menu').css({'display':'none'});
		}
	},
	render:function(){
		var userName=this.state.username;
		return (
			<div id="header">
		        <div className="nav">
		            <div className="nav-title">
		                <p>台州市交警局科技装备五小件管理</p>
		            </div>
		            <div className="nav-menu">
		                <ul>
		                    <li><a href="/orgstructure">设备查看</a></li>
		                    <li><a href="/dataanalysis">工作概况</a></li>
		                    <li>
		                        <a id="one-menu" onClick={this.oneMenu}>实时状况
		                            <i className="glyphicon glyphicon-triangle-bottom"></i>
		                        </a>
		                        <div className="systemSettings-menu" style={{zIndex:5}}>
		                            <ul>
		                                <li><a href="/index">车载视频</a></li>
		                                <li><a href="/policepass">警务通</a></li>
		                            </ul>
		                        </div>
		                    </li>
		                    <li><a href="/alramManagement">告警管理</a></li>
		                    <li><a href="/dataManagement">数据统计</a></li>
		                    <li>
		                        <a id="two-menu" onClick={this.twoMenu}>系统设置<i className="glyphicon glyphicon-triangle-bottom"></i></a>
		                        <div className="systemSettings-menu" style={{zIndex:5}}>
		                            <ul>
		                                <li><a>账户管理</a></li>
		                                <li><a href="/userManagement">用户管理</a></li>
		                                <li><a href="/userqxSettings">权限管理</a></li>
		                                <li><a href="/deviceManagement">设备管理</a></li>
		                            </ul>
		                        </div>
		                    </li>
		                    <li className="userInfor">
		                        <a href="/#" style={{fontSize:'14px'}}>
		                            <img src="../../img/user1.png" />
		                            <span>{userName}</span>
		                            <span>|</span>
		                            <span>退出系统</span>
		                        </a>
		                    </li>
		                </ul>
		            </div>
		        </div>
		    </div>
		)
	}
});
ReactDOM.render(
	<HeaderNav />,
	document.getElementById("nav")
);
