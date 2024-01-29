import axios from 'axios';

import { MappedObjectType } from '@modules/core/interfaces/base.interfaces';
import {
  AllSectionsOutboundPayloadType,
  getAllSectionsSummary
} from '@modules/stores/innovation/innovation-record/ir-versions.config';
import { sectionType } from '@modules/stores/innovation/innovation.models';

import { ENVIRONMENT } from '../../config/constants.config';

import {
  DocumentGeneratorInnovationInfoError,
  PDFGeneratorParserError,
  PDFGeneratorSectionsNotFoundError
} from '../errors';
import { InnovationInfoDTO } from '@modules/shared/services/innovations.dtos';

export const getSections = async (
  innovationId: string,
  config: any,
  version?: string
): Promise<{ section: sectionType; data: MappedObjectType }[]> => {
  const url = `${ENVIRONMENT.API_INNOVATIONS_URL}/v1/${innovationId}/all-sections`;
  const response = await axios.get<{ section: sectionType; data: MappedObjectType }[]>(url, {
    ...config,
    ...(version && { params: { version } })
  });
  return response.data;
};

export const getInnovationInfo = async (innovationId: string, config: any): Promise<InnovationInfoDTO> => {
  const url = `${ENVIRONMENT.API_INNOVATIONS_URL}/v1/${innovationId}`;
  const response = await axios.get<InnovationInfoDTO>(url, {
    ...config
  });
  return response.data;
};

export const generatePDFHandler = async (innovationId: string, body: any, config: any) => {
  const url = `${ENVIRONMENT.API_INNOVATIONS_URL}/v1/${innovationId}/pdf`;
  config.responseType = 'arraybuffer';
  config.responseEncoding = 'binary';
  config.headers['Content-Type'] = 'application/pdf';
  const response = await axios.post(url, body, config);
  return response.data;
};

export type InnovationRecordDocumentExportDataType = {
  sections: AllSectionsOutboundPayloadType;
  startSectionIndex: number;
};

export const getIRDocumentExportData = (
  documentType: 'CSV' | 'PDF',
  allSectionsData: AllSectionsOutboundPayloadType,
  companyInfo?: { name: string; size: null | string; registrationNumber: null | string }
): InnovationRecordDocumentExportDataType => {
  let sectionDataWithCompany: InnovationRecordDocumentExportDataType = {
    sections: allSectionsData,
    startSectionIndex: companyInfo ? 0 : 1
  };

  if ((documentType === 'PDF' && companyInfo) || documentType === 'CSV') {
    sectionDataWithCompany.sections = [
      {
        title: 'Company Details',
        sections: [
          {
            section: 'Company details',
            status: 'UNKNOWN',
            answers: [
              {
                label: 'What is the name of your company?',
                value: companyInfo?.name ?? ''
              },
              {
                label: 'Do you have a UK company registration number?',
                value: companyInfo?.registrationNumber ?? ''
              },
              {
                label: 'What is the size of your company or organisation?',
                value: companyInfo?.size ?? ''
              }
            ]
          }
        ]
      },
      ...allSectionsData
    ];
  }

  return sectionDataWithCompany;
};

export const generatePDF = async (innovationId: string, config: any, version?: string) => {
  let content: AllSectionsOutboundPayloadType;
  let sections: { section: sectionType; data: MappedObjectType }[];

  let innovationInfo: InnovationInfoDTO;

  try {
    innovationInfo = await getInnovationInfo(innovationId, config);
  } catch (error: any) {
    throw new DocumentGeneratorInnovationInfoError(error);
  }

  try {
    sections = await getSections(innovationId, config, version);
  } catch (error: any) {
    throw new PDFGeneratorSectionsNotFoundError(error);
  }

  try {
    content = getAllSectionsSummary(sections, version);
  } catch (error: any) {
    throw new PDFGeneratorParserError(error);
  }

  const response = await generatePDFHandler(
    innovationId,
    getIRDocumentExportData('PDF', content, innovationInfo.owner?.organisation),
    config
  );

  return response;
};
