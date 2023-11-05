import React from "react";

import CommonLayout from "../layouts/CommonLayout";
import ImageUpload from "../components/ImageUpload";

const Home: React.FC = () => <CommonLayout children={<ImageUpload />} />;

export default Home;
