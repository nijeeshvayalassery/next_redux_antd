import { Input, InputNumber, Form } from 'antd';
import EditableContext from '../table/editable-context';
class EditableCell extends React.Component {
    
    getInput = () => {
      return <Input />;
    };
  
    renderCell = ({ getFieldDecorator }) => {
      const {
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
      } = this.props;
      
      return (
        <td {...restProps}>
          {editing ? (
            <Form.Item style={{ margin: 0 }}>
              {getFieldDecorator(dataIndex, {
                rules: [
                  inputType === 'text' && {
                    required: true,
                    message: `Required Field.`,
                  },
                  inputType === 'email' && {
                    required: true,
                    type: "email",
                    message: "Invalid Email."
                  }
                ],
                initialValue: record[dataIndex],
              })(this.getInput())}
            </Form.Item>
          ) : (
            children
          )}
        </td>
      );
    };
  
    render() {
      return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
  }

  export default EditableCell;