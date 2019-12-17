
import EditableFormTable from '../common/table/editable-table';
import { PageHeader , Button} from 'antd';
import {connect} from "react-redux";
import * as actions from '../../redux/actions';

class User extends React.Component{

  constructor(props) {
    super(props);
    this.state = { editingKey: '' };
    this.coloums = this.getColoumnConfig();
  }

  addUser(){
    if(this.props.users.find(item=>item.newLine)) return;

    let user = {
      id:this.props.users.length + 1,
      name:'',
      email:'',
      newLine:true
    }

    this.props.dispatch({type: actions.ADD_USER,user});
    this.setState({'editingKey':user.id});
  }

  deleteUser(id){
    this.props.dispatch({type: actions.DELETE_USER,id});
  }

  onEditCancel (user){
    if(user.newLine){
      this.props.dispatch({type: actions.DELETE_USER,id:user.id});
    }
    this.setState({'editingKey':''});
  }

  onEditStart(id){
    this.setState({'editingKey':id});
  }

  onSave (user) {
    this.props.dispatch({type: actions.SAVE_USER,user});
    this.setState({'editingKey':''});
  }

  getColoumnConfig (){
    return [{
      title: 'Name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      editable: true,
    }];
  }

  render(){
    const userCount = this.props.users.filter(user=>!user.newLine).length;
    return (
      <div>
          <PageHeader
              title={`${userCount} Users`}
              extra={[
              <Button 
              className="add-user"
              key="1"
              onClick = {()=>this.addUser()}
              type="primary">
                  Add User
              </Button>,
          ]}
          >
          </PageHeader>
          <EditableFormTable
              onDelete = {(data)=>this.deleteUser(data)}
              coloums={this.coloums}
              data={this.props.users}
              onEditCancel={(data)=>this.onEditCancel(data)}
              onEditStart = {(data)=>this.onEditStart(data)}
              onSave = {(data)=>this.onSave(data)}
              editingKey={this.state.editingKey}>
          </EditableFormTable>
      </div>
    )
  }
  
}

export default connect((state)=>{
  return {
    users:state.users
  }
})(User);