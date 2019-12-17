import { Table, Popconfirm, Form, Icon } from 'antd';
import EditableCell from '../table/editable-cell';
import EditableContext from '../table/editable-context';
class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: props.data, editingKey: '' };
    this.columns = this.getColomns(props);
  }

  isEditing = record => record.id === this.props.editingKey;

  cancel = (id) => {
    this.props.onEditCancel(id);
  };

  save = (form, data) => {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      this.props.onSave({ ...data, ...row });
    });
  }

  edit(id) {
    if(!this.props.editingKey)
    this.props.onEditStart(id);
  }

  delete(id) {
    this.props.onDelete(id);
  }

  getColomns(props) {
    let editActionRender = (text, record)=> {
      const editable = this.isEditing(record);
      return editable ? (
        <span>
          <EditableContext.Consumer>
            {form => (
              <a
                onClick={() => this.save(form, record)}
                style={{ marginRight: 8 }}
              >
                Save
              </a>
            )}
          </EditableContext.Consumer>
          <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record)}>
            <a>Cancel</a>
          </Popconfirm>
        </span>
      ) :  (
          <a onClick={() => this.edit(record.id)}>
            <Icon type="edit" theme="filled" style={{ color: 'black' }} />
          </a>
        );
    }

    let deleteActionRender = (text, record) => {
      const editable = this.isEditing(record);
      return (!editable &&
        <Popconfirm title="Sure to delete?" onConfirm={() => this.delete(record.id)}>
          <a><Icon type="delete" theme="filled" style={{ color: 'black' }} /></a>
        </Popconfirm>
      )
    }

    return  [
      ...props.coloums,
      {
        title: 'Edit',
        dataIndex: 'edit',
        width: '10%',
        render: editActionRender
      },
      {
        title: 'Delete',
        dataIndex: 'delete',
        width: '10%',
        render: deleteActionRender
      }
    ];
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
          inputType: col.dataIndex === 'email' ? 'email' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          rowKey="id"
          components={components}
          bordered
          dataSource={this.props.data}
          columns={columns}
          rowClassName="editable-row"
          pagination={false}
        />
      </EditableContext.Provider>
    );
  }
}
const EditableFormTable = Form.create()(EditableTable);
export default EditableFormTable;