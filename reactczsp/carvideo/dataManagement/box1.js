
//创建页码
function createpagination(totle,that) {
    if(totle>0){
        $(".M-box").css({"display":"inline-block"})
    }
    $('.M-box').pagination({
        totalData:totle,
        showData:10,
        coping:true,
        callback:function(api){
            var data1 = {
                page: api.getCurrent(),
                name: 'mss',
                say: 'oh'
            };
            if(this.totalData>0){
                $(".M-box").css({"display":"inline-block"})
            }
            that.setState({'currentpage':data1.page})
            that.setState({'xsdata':that.state.data.slice((data1.page-1)*10,data1.page*10)});
        }
    });
}

var Box1=React.createClass({
	getInitialState:function(){
		return {
			sbname:'all',
			iscp:true,
			data:[],
			xsdata:[],
			editdata:[],
			currentpage:1,
			islicensePlate:true,
		}
	},
	componentWillMount:function(){
		//在渲染前调用
	},
	componentDidMount:function(){
		// 第一次渲染后调用，组件已经生成了对应的DOM结构
		var that=this;
		this.serverRequest=$.get('../../test/2.json',function(result){
			var _data=result;
			this.setState({'data':_data});
			this.setState({'xsdata':_data.slice(0,10)});
			createpagination(_data.length,that);
		}.bind(this));
		
	},
	sbxzChange:function(e){
		var $doc=$(e.target);
		switch($doc.val()){
			case 'all':  this.setState({'sbname':'all'});break;
			case 'czsp': this.setState({'sbname':'车载视频'});break;
			case 'jwt':  this.setState({'sbname':'警务通'});this.setState({'iscp':false});break;
		}
		var that=this;
		this.serverRequest=$.get('../../test/2.json',function(result){
			var _data=[];
			//注意：此处的this
			if(that.state.sbname==='all'){
				_data=result;
				that.setState({'iscp':true});
				that.setState({'data':_data});
				that.setState({'xsdata':_data.slice(0,10)});
			}else{
				result.map(function(obj){
					if(obj.deviceName===that.state.sbname){
						_data.push(obj);
					}
				})
				that.setState({'data':_data});
				that.setState({'xsdata':_data.slice(0,10)});
			}
			createpagination(_data.length,that);
		})
	},
	Editbtn:function(e){
		var _id=$(e.target).attr('data-id');
		var _data=this.state.data
		var _editdata=_data.filter(function(currentValue){
			return  currentValue._id==_id;
		})
		this.setState({'editdata':_editdata});
	},
	searchinput:function(e){
		if(e.keyCode==13){
            var $doc=$(e.target);
            var _content=$doc.val();
            //
            var regx = new RegExp(_content,'i')
            var _data=this.state.data;
            var that=this;
            var _xsdata=_data.filter(function(currentValue){
				return  regx.test(currentValue.deviceNo)||regx.test(currentValue.contacts)||regx.test(currentValue.telephone);
			})
            this.setState({'xsdata':_xsdata});
            createpagination(_xsdata.length,that);
        }
	},
	render:function(){
		var tableData=this.state.xsdata;
		var _iscp=this.state.iscp;
		console.log(_iscp);
		var _editdata=this.state.editdata;
		var _currentpage=(this.state.currentpage-1)==0?'':(this.state.currentpage-1).toString();
		console.log('_currentpage',_currentpage)
		var editModel;
		if(_editdata.length==0){
			editModel=<EditDeviceModle />;
		}else{
			var porps={};
			porps.deviceNo=_editdata[0].deviceNo;
			porps.licensePlate=_editdata[0].licensePlate;
			if((typeof porps.licensePlate)==='undefined'){
				porps.islicensePlate=false;
			}else{
				porps.islicensePlate=true;
			}
			porps.brigade=_editdata[0].brigade;
			porps.squadron=_editdata[0].squadron;
			porps.contacts=_editdata[0].contacts;
			porps.telephone=_editdata[0].telephone;
			
			editModel= <EditDeviceModle {...porps} />
		}
		var that=this;
		return(
		<div>
			<div className="publicpage" id="deviceManagement">
				<div id='titleZj'></div>
		        <div className="search-condition">
		        	<SeachHead />
		        	<SearchContent x1={this.sbxzChange} />
		        </div>
		        <div className="search-result">
		            <div className="search-head clearfix">
		                <div className="search-condition-title">
		                    <i className="glyphicon glyphicon-th-list"></i>
		                    <span>绑定设置</span>
		                </div>
		                <div className="seach-box">
		                    <div className="input-group">
		                        <input type="text" className="form-control" placeholder="请输入设备编号/车辆号码/联系人信息" onKeyDown={this.searchinput}  />
		                        <span className="input-group-btn">
		                            <button className="btn btn-default" type="button"><i className="glyphicon glyphicon-search"></i></button>
		                         </span>
		                    </div>
		                </div>
		            </div>
		           {/*表格*/}
		            <div className="table-responsive">
		                <table className="table table-striped dataTables-example" id="search-result-table">
		                    <thead>
		                    <tr>
		                        <th>序号</th>
		                        <th>设备编号</th>
		                         {/*在JSX中不能使用if else*/}
		                        {_iscp?<th>车牌号码</th>:null}
		                        <th>所属单位</th>
		                        <th>所属部门</th>
		                        <th>联系人</th>
		                        <th>联系电话</th>
		                        <th>操作</th>
		                    </tr>
		                    </thead>
		                    <tbody>
		                    { 
		                    	/*通过map遍历,当前被传递元素,索引*/
		                    	tableData.map(function(obj,index){
		                    	/*如果数组或迭代每一项都是HTML标签或组件,必须拥有唯一的key*/
			                    return( <tr key={index}>
					                        <td>
					                            <span>{_currentpage+(index+1)}</span>
					                        </td>
					                        <td>
					                            <span>{obj.deviceNo}</span>
					                        </td>
					                        
				                        	{_iscp?(<td>
							                            <span>{obj.licensePlate}</span>
							                        </td>):null}
					                        <td>
					                            <span>{obj.brigade}</span>
					                        </td>
					                        <td>
					                            <span>{obj.squadron}</span>
					                        </td>
					                        <td>
					                            <span>{obj.contacts}</span>
					                        </td>
					                        <td>
					                            <span>{obj.telephone}</span>
					                        </td>
					                        <td>
					                            <a href="#" className="btn btn-sm btn-primary edit-btn" data-id={obj._id} data-target="#editDeviceModle" data-toggle="modal" onClick={that.Editbtn} >编辑</a>
					                            <a href="#" className="btn btn-sm btn-primary delet-btn" data-target="#deletDeviceModle" data-toggle="modal">删除</a>
					                        </td>
				                    	</tr>
				                   )
			                    })
		                    }
		                    </tbody>
		                </table>
		            </div>
		            <div className="search-result-flooter">
		                <div className="search-result-flooterleft">
		                    <button className="btn" id="addDevice" data-target="#addDeviceModle" data-toggle="modal">新增</button>
		                    <label>设备:<span>台</span></label>
		                </div>
		                <div className="search-result-flooterright">
		                    <div className="M-box"></div>
		                </div>
		            </div>
		        </div>
		        <div id="dataexport">
		        	<a href="javascript:;" className="file btn" id="dataexportbtn">选择文件
					    <input type="file" name="" id="fileInput" />
					</a>
		        </div>
		    </div>
		    {editModel}
		</div>
	   
		)
	}
});
var SeachHead=React.createClass({
	render:function(){
		return(
		 	<div className="search-head clearfix">
                <div className="search-condition-title">
                    <i className="glyphicon glyphicon-th-list"></i>
                    <span>查询条件</span>
                </div>
                <div className="setArlarm">
                    <button className="btn"  id="setbtn">设备设置</button>
                </div>
            </div>
		)
	}
});
var SearchContent=React.createClass({
	getInitialState:function(){
		return {
			dw:[],
			dd:[],
			zd:[],
		}
	},
	componentDidMount:function(){
		var _data=[];
		var that=this;
		this.serverRequest=$.get('../../test/3.json',function(result){
			that.setState({'dw':result})
			result.map(function(obj){
				_data.push(obj.brigaName);
			})
			that.setState({'dd':_data});
		});
	},
	ddChange:function(e){
		var _data=this.state.dw;
		var _zd=[];
		var $doc=$(e.target);
		var _ddval=$doc.val();
		var $squadronDom=$(this.refs.squadronselect);
		var that=this;
		if(_ddval=='all'){
            $squadronDom.attr("disabled",true);
            $squadronDom.val('all');
            that.setState({'zd':[]})
		}else{
			$squadronDom.attr("disabled",false);
			_data.map(function(obj){
				if(obj.brigaName===_ddval){
					that.setState({'zd':obj.squadrons})
				}
			})
		}
	},
	render:function(){
		var _dd=this.state.dd;
		var _zd=this.state.zd;
		return(
			<div className="search-content">
	            <div className="form-group">
	                <div className="row">
	                    <div className="col-md-3">
	                        <label >设备编号:</label>
	                        <select className="form-control" id="deviceNameselect" onChange={this.props.x1}>
	                            <option value="all">全部</option>
	                            <option value="czsp">车载视频</option>  
	                        	<option value="jwt">警务通</option>
	                        </select>
	                    </div>
	                    <div className="col-md-3">
	                        <label >所属大队:</label>
	                        <select className="form-control" id="brigadeselect" onChange={this.ddChange}>
	                            <option value="all">全部</option>
	                            {
	                            	_dd.map(function(name,index){
	                            		return(<option value={name} key={index}>{name}</option>);
	                            	})
	                            }
	                            
	                        </select>
	                    </div>
	                    <div className="col-md-3">
	                        <label >所属中队:</label>
	                        <select className="form-control" id="squadronselect" disabled="disabled" ref='squadronselect'>
	                            <option value="all">全部</option>
	                            {
	                            	_zd.map(function(name,index){
	                            		return(<option value={name} key={index}>{name}</option>);
	                            	})
	                            }
	                        </select>
	                    </div>
	                </div>
	            </div>
	        </div>
		)
	}
});
//编辑设备窗口
var EditDeviceModle=React.createClass({
	render:function(){
		return(
			<div className="modal fade custom-modal" id="editDeviceModle"  role="dialog" aria-labelledby="myModalLabel" >
		        <div className="modal-dialog" role="document">
		            <div className="modal-content">
		                <div className="modal-header">
		                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		                    <h4 className="modal-title" id="myModalLabel">编辑设备</h4>
		                </div>
		                <div className="modal-body">
		                    <div className="form-content">
		                        <div className="form-infor">
		                            <form role="form">
		                                <div className="form-group">
		                                    <label htmlFor="editdeviceNo">设备编号:</label>
		                                    <input type="text" className="form-control" id="editdeviceNo" value={this.props.deviceNo} />
		                                </div>
		                                {
		                                	this.props.islicensePlate?(<div className="form-group">
			                                    <label htmlFor="editszCar">车牌号码:</label>
			                                    <input type="text" className="form-control" id="editszCar" value={this.props.licensePlate} />
			                                </div>):null
		                                }
		                                <div className="form-group">
		                                    <label htmlFor="editszBrigade">所属大队:</label>
		                                    <input type="text" className="form-control" id="editszBrigade" value={this.props.brigade} />
		                                </div>
		                                <div className="form-group">
		                                    <label htmlFor="editszSquadron">所属中队:</label>
		                                    <input type="text" className="form-control" id="editszSquadron" value={this.props.squadron} />
		                                </div>
		                                <div className="form-group">
		                                    <label htmlFor="editcontacts">联系人:</label>
		                                    <input type="text" className="form-control" id="editcontacts" value={this.props.contacts} />
		                                </div>
		                                <div className="form-group">
		                                    <label htmlFor="edittelephone">联系电话:</label>
		                                    <input type="text" className="form-control" id="edittelephone" value={this.props.telephone} />
		                                </div>
		                            </form>
		                        </div>
		                    </div>
		                </div>
		                <div className="modal-footer">
		                    <button type="button" className="btn btn-default btn-qr" >保存</button>
		                    <button type="button" className="btn btn-primary btn-reset">重置</button>
		                </div>
		            </div>
		        </div>
		    </div>
		)
	}
});
ReactDOM.render(
	<Box1 />,
	document.getElementById("box")
);
