var XzsbModle=React.createClass({
	render:function(){
		return(
			<div className="modal fade custom-modal" id="addDeviceModle"  role="dialog" aria-labelledby="myModalLabel">
		        <div className="modal-dialog" role="document">
		            <div className="modal-content">
		                <div className="modal-header">
		                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		                    <h4 className="modal-title" id="myModalLabel">新增设备</h4>
		                </div>
		                <div className="modal-body">
		                    <div className="form-content">
		                        <div className="form-infor">
		                            <form role="form">
		                                <div className="form-group">
		                                    <label htmlFor="adddeviceNo">设备编号:</label>
		                                    <input type="text" className="form-control" id="adddeviceNo" placeholder="请输入设备编号" />
		                                </div>
		                                <div className="form-group">
		                                    <label htmlFor="adddeviceType">设备类型:</label>
		                                    <input type="text" className="form-control" id="adddeviceType" placeholder="请输入设备类型" />
		                                </div>
		                                <div className="form-group">
		                                    <label htmlFor="addszCar">车牌号码:</label>
		                                    <input type="text" className="form-control" id="addszCar" placeholder="请输入车牌号" />
		                                </div>
		                                <div className="form-group">
		                                    <label htmlFor="addszBrigade">所属大队:</label>
		                                    <input type="text" className="form-control" id="addszBrigade" placeholder="请输入所属大队" />
		                                </div>
		                                <div className="form-group">
		                                    <label htmlFor="addszSquadron">所属中队:</label>
		                                    <input type="text" className="form-control" id="addszSquadron"  placeholder="请输入所属中队" />
		                                </div>
		                                <div className="form-group">
		                                    <label htmlFor="addcontacts">联系人:</label>
		                                    <input type="text" className="form-control" id="addcontacts" placeholder="请输入联系人" />
		                                </div>
		                                <div className="form-group">
		                                    <label htmlFor="addtelephone">联系电话:</label>
		                                    <input type="text" className="form-control" id="addtelephone" placeholder="请输入联系电话" />
		                                </div>
		                            </form>
		                        </div>
		                    </div>
		                </div>
		                <div className="modal-footer">
		                    <button type="button" className="btn btn-default btn-qr" >保存</button>
		                    <button type="button" className="btn btn-primary btn-reset">取消</button>
		                </div>
		            </div>
		        </div>
		    </div>
		)
	}
});
ReactDOM.render(
	<XzsbModle />,
	document.getElementById("xzsbModle")
);