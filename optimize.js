'use strict';

const AWS = require('aws-sdk');
const sharp = require('sharp');
const { basename, extname } = require('path');

const s3 = new AWS.S3();

module.exports.handle = async ({ Records: records }, context) => {
  try {
    await Promise.all(records.map(async record => {
      const { key } = record.s3.object;
      
      const image = await s3.getObject({
        Bucket: process.env.bucket,
        Key: key,
      }).promise();
      
      const optimazed = await sharp(image.Body)
        .resize(1280, 720, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .toFormat('jpeg', { progressive: true, quality: 50 })
        .toBuffer();

      await s3.putObject({
        Body: optimazed,
        Bucket: process.env.bucket,
        ContentType: 'image/jpeg',
        Key: `compressed/${basename(key, extname(key))}.jpg`,
      }).promise();
    }));

    return { 
      statusCode: 201, 
      body: {}
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.message)
    };
  }
};