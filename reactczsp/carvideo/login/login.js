function createCode() {
    var code = "";
    var codeLength = 4; //验证码的长度
    var checkCode = document.getElementById("checkCode");
    var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //所有候选组成验证码的字符，当然也可以用中文的
    for (var i = 0; i < codeLength; i++)
    {
        var charNum = Math.floor(Math.random() * 52);
        code += codeChars[charNum];
    }
    if (checkCode)
    {
        checkCode.className = "code";
        checkCode.innerHTML = code;
    }
    return code;
}
//报警 ele:document txt:报警内容
function  createUserAlarm($ele,txt){
    var $doc=$ele;
    var _arlarmHtml='<label id="VerificationCode-error" class="error"  style="display: inline-block;">'+txt+'</label>';
	$doc.addClass("input_danger");
    $doc.after(_arlarmHtml);
}
//禁止输入空格
function  delespace(ele){
    var _value=ele.value.trim();
    ele.value=_value;
}
//密码最小长度验证
function input_minlenthtest(ele) {
	var $ele=$(ele)
	var _is=false;
	var _val=$ele.val();
	if($ele.attr("minlength")){
		var _minlength=parseInt($ele.attr("minlength"));
		if(_val.length<_minlength){
         	createUserAlarm($ele,"长度至少为"+_minlength)
        }
	}
	if($ele.attr("data-yzm")){
		var _yzmlength=parseInt($ele.attr("data-yzm"));
		if(_val.length<_yzmlength){
         	createUserAlarm($ele,"长度为"+_yzmlength);
       	}
	}    
}

var LoginForm = React.createClass({
	getInitialState:function(){
		return {
			username:'',
			password:'',
			iyzm:'',
			yzm:createCode(),
		}
	},
//	componentDidMount:function(){
//		this.serverRequest=$.get('../../test/1.json',function(result){
//			var lastGist=result;
//			debugger;
//			console.log(lastGist);
//		})
//		console.log('------',this.serverRequest);//同步执行
//	},
	inputfocus:function(e){
		//聚焦
		console.log(1);
		var $doc=$(e.target);
		if($doc.is(".input_danger")){
            $doc.next().remove();
            $doc.removeClass("input_danger");
        }
	},
	inputblur:function(e){
		//失去焦点
		var $doc=$(e.target)
		if($doc.val()===''){
			if($doc.is(".input_danger")){
	            $doc.next().remove();
	            $doc.removeClass("input_danger");
	        }
		}else{
			if($doc.is('.input_danger')){
				return ;
			}
			input_minlenthtest(e.target);
		}
		
	},
	changeUsername:function(e){
		//用户名
		delespace(e.target);
		this.setState({username:e.target.value});
		//console.log(this.state.username);这里是打印不出username值
		
	},
	changePassword:function(e){
		//输入密码
		delespace(e.target);
		this.setState({password:e.target.value});
	},
	changeCode:function(e){
		//输入验证码
		delespace(e.target);
		this.setState({iyzm:e.target.value});
	},
	loginBtn:function(e){
		var _yzm=this.state.iyzm;
		if($('.error').length>0){
			return;
		}
		var userNameDom=this.refs.userName;
		var passwordDom=this.refs.password;
		var inputcheckCodeDom=this.refs.inputcheckCode;
		
		var userNameValue=userNameDom.value;
		var passwordValue= passwordDom.value.toUpperCase();
		var inputcheckCodeValue=inputcheckCodeDom.value.toUpperCase();
		
		if(!(userNameValue&&passwordValue&&inputcheckCodeValue)){
			return ;
		}
		var checkCodeDom=this.refs.checkCode;
		var checkCodeDomtxt=checkCodeDom.innerText.toUpperCase();
		
		if(inputcheckCodeValue!=checkCodeDomtxt){
			createUserAlarm($(inputcheckCodeDom),'验证码错误');
			this.setState({yzm:createCode()});
			return;
		}else{
//			this.setState({yzm:createCode()});
			this.serverRequest=$.get('../../test/1.json',function(result){
				this.setState({yzm:createCode()});//写在回调函数报错
				var lastGist=result;
				if(lastGist.success){
					//跳转到指定的页面
					sessionStorage.setItem('username',lastGist.userName)
					window.location.href='../dataManagement/dataManagement.html';
				}else{
					var _errorCode=lastGist.Errorinfor;
					switch(_errorCode){
						case '0x1000':createUserAlarm($(passwordDom),'密码错误');break;
						case '0x2000':createUserAlarm($(userNameDom),'用户不存在');break;
					}
				}
			}.bind(this))
		}	
	},
	checkCodeClick:function(e){
		this.setState({yzm:createCode()});
	},
    render: function() {
	    return (
		    	<div className="loginForm">
                    <div style={{display: 'table-cell',verticalAlign:'middle'}}>
                        <div className="loginbox">
                        
                    		<div className="form-header">
                                <h3>科技五小件监管平台</h3>
                            </div>
                            <div className="form-content">
                                <div className="form-infor">
                                    <form role="form">
                                        <div className="form-group">
                                            <label htmlFor="userName">用户名:</label>
                                            <input type="text" placeholder="请输入用户名" className="form-control" id="userName" onChange={this.changeUsername} ref='userName' onFocus={this.inputfocus} onBlur={this.inputblur} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="userpassword">密&nbsp;&nbsp;&nbsp;码:</label>
                                            <input type="password" placeholder="请输入密码" className="form-control" id="userpassword" minLength="5" onChange={this.changePassword} onFocus={this.inputfocus} onBlur={this.inputblur} ref='password' />
                                        </div>
                                        <div className="form-group" style={{position:'relative'}}>
                                            <label htmlFor="userpassword">验证码:</label>
                                            <input type="password" placeholder="请输入验证码" className="form-control" id="checkpassword" data-yzm="4" maxLength="4" onChange={this.changeCode} onFocus={this.inputfocus} onBlur={this.inputblur} ref='inputcheckCode' />
                                            <div className="code" id="checkCode" ref='checkCode' onClick={this.checkCodeClick}>{this.state.yzm}</div>
                                        </div>
                                        <div className="form-group">
                                            <label  style={{opacity:0}}>请记住</label>
                                            <div className="form-control" style={{border:'transparent',boxShadow:'inset 0 0px 0px',textAlign: 'left',padding:'0px'}}>
                                                <input type="checkbox" id="remberpassword" style={{marginLeft:'5px'}} /><span>记住用户名和密码</span>
                                            </div>
                                        </div>
                                        <div className="form-group"  >
                                            <button  type="button" className="btn btn-primary " id="loginBtn" onClick={this.loginBtn}>登录</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
		   	)
        }
  });
ReactDOM.render(
	<LoginForm />,
	document.getElementById("content2")
);