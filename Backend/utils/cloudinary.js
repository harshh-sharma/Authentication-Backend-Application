import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";

cloudinary.config({ 
    cloud_name: "dnhcvnwws", 
    api_key: 968787644842132, 
    api_secret: "oFi2ldsVYxQzftxggy5wlRAIEKI"
  });

const uploadFileOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        const response = await cloudinary.uploader.upload(
            localFilePath.path,{
                resource_type:"auto"
            }
        )
        console.log("file is uploaded on cloudinary",response.url);
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {  
        console.log("erro while uploading file on cloudinary",error.message);
        fs.unlinkSync(localFilePath);
        return null;  
    }

}

export default uploadFileOnCloudinary;