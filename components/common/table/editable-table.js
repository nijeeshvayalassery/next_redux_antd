import { Table,Popconfirm,Form, Icon } from 'antd';
import EditableCell from '../table/editable-cell';
import EditableContext from '../table/editable-context';
class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data:props.data, editingKey: '' };
    this.columns = [
      ...props.coloums,
      {
        title: 'Edit',
        dataIndex: 'edit',
        width: '10%',
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => this.save(form, record.key)}
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
            <Icon type="edit" theme="filled" style={{color:'black'}}/>
            </a>
          );
        },
      },
      {
        title: 'Delete',
        dataIndex: 'delete',
        width: '10%',
        render: (text, record) => {
          return (
              <Popconfirm title="Sure to delete?" onConfirm={() => this.delete(record.key)}>
                <a><Icon type="delete" theme="filled" style={{color:'black'}}/></a>
              </Popconfirm>
          ) 
        },
      },
    ];
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  delete(key){
      
  }

  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel,
          }}
        />
      </EditableContext.Provider>
    );
  }
}
const EditableFormTable = Form.create()(EditableTable);
export default EditableFormTable;