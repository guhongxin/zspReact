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
		                                <div className="form-group">
		                                    <label htmlFor="editszCar">车牌号码:</label>
		                                    <input type="text" className="form-control" id="editszCar" value={this.props.licensePlate} />
		                                </div>
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