import React, { useState } from "react";
import { Card, Typography, Upload, Button, Image } from "antd";
import ImgCrop from "antd-img-crop";
import axios from "axios";

const { Title } = Typography;

const ImageUpload: React.FC = () => {
  const [imageData, setImageData] = useState<string | null>();
  const [uploading, setUploading] = useState<boolean>(false);

  const uploadImage = async (options: any) => {
    const { onSuccess, onError, file } = options;

    const formData = new FormData();
    formData.append("file", file);

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

  return (
    <div style={{ marginLeft: "25%", marginRight: "25%", marginTop: 25 }}>
      <Card style={{ width: "100%", alignItems: "center" }}>
        <Title level={4}>Upload your picture to get started!</Title>
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
            <Title level={5}>Here is your framed picture!</Title>
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
