import { Layout,Table, Divider, Tag} from 'antd';
const {Header,Content,Footer} =  Layout;
import 'antd/dist/antd.min.css';
import User from '../components/user/user';
const Index = props => {
  return (
    <div>
      <link href="css/user.css" rel="stylesheet" />
      <Layout>
        <Header>Users</Header>
        <Content>
          <User></User>
        </Content>
        <Footer></Footer>
      </Layout>
    </div>
)
      };

      

export default Index;