import {
  Button,
  Card, Layout
} from "antd";
import React from "react";

const { Footer, Content } = Layout;

function ISBN() {

  return (
    <>
      <div className="layout-default ant-layout layout-sign-up">
        <Content className="p-0">
          <div style={{ marginTop: 220 }}>
          </div>
          <Card
            className="card-signup header-solid h-full"
            title={<h5>Welcome! Book Toure Tutorial point</h5>}
            bordered="false"
          >
            <Button onClick={() => window.history.back()}>Back</Button>
            <a href="http://localhost:3001/pdf/6271fe69774dc.pdf">download</a>


          </Card>
        </Content>
        <Footer>
          <p className="copyright">
            {" "}
            © 2021. Copyright : Book Tour
          </p>
        </Footer>
      </div >
    </>
  );
}


export default ISBN;
