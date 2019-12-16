
import EditableFormTable from '../common/table/editable-table';
import { PageHeader , Button} from 'antd';

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    email: `Edrward${i}@gmail.com`,
  });
}

const addUser = () =>{
    console.log("Okay");
    
  }

const coloums = [{
        title: 'Name',
        dataIndex: 'name',
        width: '25%',
        editable: true,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        editable: true,
      }]

export default function User() {
  return (
    <div>
        <PageHeader
            title="100 Users"
            extra={[
            <Button 
            className="add-user"
            key="1"
            onClick = {addUser()}
            type="primary">
                Add User
            </Button>,
        ]}
        >
        </PageHeader>
        <EditableFormTable
            coloums={coloums}
            data={data}>
        </EditableFormTable>
    </div>
    
    
  )
}