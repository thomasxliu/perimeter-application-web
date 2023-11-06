import React, { useState } from "react";
import { Card, Typography, Upload, Button, Image, Radio } from "antd";
import type { RadioChangeEvent } from "antd";
import ImgCrop from "antd-img-crop";
import axios from "axios";

import example1 from "../assets/example1.png";
import example2 from "../assets/example2.png";
import example3 from "../assets/example3.png";

const { Title } = Typography;

const ImageUpload: React.FC = () => {
  const [imageData, setImageData] = useState<string | null>();
  const [uploading, setUploading] = useState<boolean>(false);
  const [value, setValue] = useState<number>(1);
  const [frame, setFrame] = useState<string>("frame1");

  const uploadImage = async (options: any) => {
    const { onSuccess, onError, file } = options;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("frame", frame);

    try {
      const res = await axios.post("http://localhost:8080/picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      });

      onSuccess("Ok");

      const imageUrl = URL.createObjectURL(res.data);
      setImageData(imageUrl);
    } catch (err) {
      onError({ err });
    }
  };

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    setFrame(`frame${e.target.value}`);
  };

  return (
    <div style={{ marginLeft: "25%", marginRight: "25%", marginTop: 25 }}>
      <Card style={{ width: "100%", alignItems: "center" }}>
        <Title level={4}>
          Select a Frame and Upload a Picture to Get Started
        </Title>
        <br />
        <Radio.Group onChange={onChange} value={value} defaultValue={1}>
          <Radio value={1}>
            <Image src={example1} style={{ height: 100 }} />
          </Radio>
          <Radio value={2}>
            <Image src={example2} style={{ height: 100 }} />
          </Radio>
          <Radio value={3}>
            <Image src={example3} style={{ height: 100 }} />
          </Radio>
        </Radio.Group>
        <br />
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
            showUploadList={false}
            customRequest={uploadImage}
            onChange={(f) => {
              if (f.file.status === "uploading") {
                setUploading(true);
              }
              if (f.file.status === "done") {
                setUploading(false);
              }
            }}
          >
            <Button type="primary" disabled={uploading}>
              Upload Picture Here
            </Button>
          </Upload>
        </ImgCrop>

        {imageData && (
          <>
            <br />
            <br />
            <br />
            <br />
            <Title level={5}>Here is Your Framed Picture!</Title>
            <Image src={imageData} style={{ height: 200 }} />
            <br />
            <br />
            <Button type="default" onClick={() => setImageData(null)}>
              Clear
            </Button>
          </>
        )}
      </Card>
    </div>
  );
};

export default ImageUpload;
