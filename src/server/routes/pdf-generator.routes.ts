import * as express from 'express';
import { IProfile } from 'passport-azure-ad';
import { getAppInsightsClient } from '../../globals';
import { ENVIRONMENT } from '../config/constants.config';
import { generatePDF } from '../utils/pdf/parser';
import { getAccessTokenByOid } from './authentication.routes';

const pdfRouter = express.Router();

// Generate PDF endpoint
pdfRouter.get(`${ENVIRONMENT.BASE_PATH}/exports/:innovationId/pdf`, (req, res) => {

  try {

    const innovationId = req.params.innovationId;
    const user: IProfile = req.user || {};
    const oid: string = user.oid || '';
    const accessToken = getAccessTokenByOid(oid);
    const config = { headers: { 
      Authorization: `Bearer ${accessToken}`,
      ...req.query.role && { 'x-is-role': req.query.role }
    } };

    generatePDF(req.params.innovationId, config)
      .then((response: any) => {

        const client = getAppInsightsClient(req);

        client.trackTrace({
          message: 'PDFGenerator Success',
          severity: 0,
          properties: {
            params: req.params,
            query: req.query,
            path: req.path,
            route: req.route,
            authenticatedUser: (req.user as any)?.oid,
          }
        });

        res
          .writeHead(200, {
            'Content-Length': Buffer.byteLength(response),
            'Content-Type': 'application/pdf',
            'Content-disposition': `attachment;filename=innovation_record_${innovationId}.pdf`
          })
          .end(response);

      })
      .catch((error: any) => {
        const client = getAppInsightsClient(req);
        client.trackException({
          exception: error,
          severity: 3,
          properties: {
            params: req.params,
            query: req.query,
            path: req.path,
            route: req.route,
            authenticatedUser: (req.user as any)?.oid,
            stack: error.stack,
          }
        })
        // console.log(error);
        // console.log(`Error when attempting to generate the PDF from innovation ${innovationId}`);
        res.status(500).send();
      });

  } catch (error: any) {

    const client = getAppInsightsClient(req);
    client.trackException({
      exception: error,
      severity: 3,
      properties: {
        params: req.params,
        query: req.query,
        path: req.path,
        route: req.route,
        authenticatedUser: (req.user as any)?.oid,
        stack: error.stack,
      }
    });

  }

});

export default pdfRouter;
