import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'eu-north-1',
});

export const generateUploadURL = async (userId: number) => {
  const params = {
    Bucket: 'plated-profile-images',
    Key: `profile_image/${userId}.jpeg`,
    Expires: 3600,
    ContentType: 'image/jpeg',
  };

  return s3.getSignedUrlPromise('putObject', params);
};
