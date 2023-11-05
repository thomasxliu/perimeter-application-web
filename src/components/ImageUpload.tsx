import React from "react";
import { Card, Typography, Upload, Button } from "antd";
import ImgCrop from "antd-img-crop";

const { Title } = Typography;

const ImageUpload: React.FC = () => (
  <div style={{ marginLeft: "25%", marginRight: "25%", marginTop: 25 }}>
    <Card style={{ width: "100%", alignItems: "center" }}>
      <Title level={4}>Upload your image to get started!</Title>
      <br />
      <ImgCrop
        rotationSlider
        aspect={3 / 4}
        showReset
        resetText="Reset Changes"
        modalOk="Publish"
      >
        <Upload
          maxCount={1}
          action={"http://localhost:8080/picture"}
          showUploadList={false}
          onChange={(f) => {
            console.log(f);
          }}
        >
          <Button type="primary">Upload Picture Here</Button>
        </Upload>
      </ImgCrop>
    </Card>
  </div>
);

export default ImageUpload;
