import axios, { Method } from 'axios';
import * as express from 'express';
import * as multer from 'multer';
import { extname } from 'path';
import { Router } from 'express';

import { UrlModel } from '@app/base/models';
import { SeverityLevel } from 'applicationinsights/out/Declarations/Contracts';
import { getAppInsightsClient } from 'src/globals';
import { ENVIRONMENT } from '../config/constants.config';
import { getAccessTokenBySessionId } from './authentication.routes';


const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => { checkFileType(file, cb); }
});
const fileUploadRouter: Router = express.Router();

const filetypes = /docx|pdf|csv|xlsx/; // Allowed extensions.

// Allowed mimetypes.
const whitelist = [
  'application/pdf',
  'text/csv',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];


const checkFileType = (file: any, cb: ((...args: any[]) => void)) => {

  const allowedExtension = filetypes.test(extname(file.originalname).toLowerCase());
  const mimetype = whitelist.includes(file.mimetype);

  if (mimetype && allowedExtension) {
    return cb(null, true);
  } else {
    cb('Error: Invalid Format!');
  }
};


async function getUploadUrlDeprecated(accessToken: string, innovationId: string, body: { fileName: string, context: null | string }): Promise<{ id: string; displayFileName: string; url: string }> {

  const url = new UrlModel(ENVIRONMENT.API_INNOVATIONS_URL).addPath('v1/:innovationId/upload').setPathParams({ innovationId }).buildUrl();

  try {
    const result = await axios.post<{ id: string; displayFileName: string; url: string }>(url, body, { headers: { Authorization: `Bearer ${accessToken}` } });
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }

}

async function getUploadUrl(accessToken: string, innovationId: string, body: { filename: string }): Promise<{ id: string; name: string; url: string }> {

  const url = new UrlModel(ENVIRONMENT.API_INNOVATIONS_URL).addPath('v1/:innovationId/files/upload-url').setPathParams({ innovationId }).buildUrl();

  try {
    const result = await axios.post<{ id: string; name: string; url: string }>(url, body, { headers: { Authorization: `Bearer ${accessToken}` } });
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }

}

async function uploadFile(url: string, file: any): Promise<void> {

  try {
    const config = {
      method: 'PUT' as Method,
      params: { fileName: file.originalname },
      headers: {
        'x-ms-blob-type': 'BlockBlob',
        'content-length': file.size
      },
      maxBodyLength: 20000000,
      maxContentLength: 20000000,
      data: file.buffer
    };
    await axios(url, config);
  } catch (error) {
    console.error('uploadFile', error);
    throw error;
  }

}

// TODO: DEPRECATE this when documents are final!
fileUploadRouter.post(`${ENVIRONMENT.BASE_PATH}/upload`, upload.single('file'), async (req, res) => {

  const accessToken = await getAccessTokenBySessionId(req.session.id);
  const requestFile = req.file;
  const requestBody = {
    innovationId: req.body.innovationId,
    context: req.body.context
  };

  if (!accessToken) {
    res.status(401).send();
    return;
  }

  if (!requestFile) {
    res.status(400).send();
    return;
  }

  try {

    const fileInfo = await getUploadUrlDeprecated(accessToken, req.body.innovationId, { context: requestBody.context, fileName: requestFile.originalname });
    await uploadFile(fileInfo.url, requestFile);

    res.status(201).send({
      id: fileInfo.id,
      name: fileInfo.displayFileName,
      size: req.file?.size,
      extension: req.file ? extname(req.file?.originalname).toLowerCase() : '',
      url: fileInfo.url
    });

  } catch (error) {
    console.error(`Error when attempting to upload data. Error: ${error}`);
    res.status(500).send();
  }

});


fileUploadRouter.post(`${ENVIRONMENT.BASE_PATH}/upload-file`, upload.single('file'), async (req, res) => {

  const accessToken = await getAccessTokenBySessionId(req.session.id);
  const requestFile = req.file;

  if (!accessToken) {
    res.status(401).send();
    return;
  }

  if (!requestFile) {
    res.status(400).send();
    return;
  }

  try {

    // TODO: Remove this context parameter when BE endpoint is changed!
    const fileInfo = await getUploadUrl(accessToken, req.body.innovationId, { filename: requestFile.originalname });
    await uploadFile(fileInfo.url, requestFile);

    res.status(201).send({
      id: fileInfo.id,
      name: fileInfo.name,
      size: req.file?.size,
      extension: req.file ? extname(req.file?.originalname).toLowerCase().substring(1) : '',
      url: fileInfo.url
    });

  } catch (error: any) {
    getAppInsightsClient().trackException({
      exception: error,
      severity: SeverityLevel.Warning,
      properties: {
        params: req.params,
        query: req.query,
        path: req.path,
        route: req.route,
        authenticatedUser: (req.session as any).oid,
      }
    })
    res.status(500).send();
  }

});

export default fileUploadRouter;
