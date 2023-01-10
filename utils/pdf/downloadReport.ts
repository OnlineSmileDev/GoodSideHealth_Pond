import {
  generateBulkVisitReports,
  generateVisitReport,
  REPORT_CODE,
} from './generateReport'

type DownloadVisitReportProps = {
  patientId: string | number
  visitId: string | number
  jwtToken: string
  fileName?: string
  setIsDownloading?: (value: boolean) => void
}

type DownloadBulkVisitReportsProps = {
  stationId: number
  jwtToken: string
  setIsDownloading?: (value: boolean) => void
}

export const downloadWcpUilDischargeNote = ({
  patientId,
  visitId,
  jwtToken,
  fileName,
  setIsDownloading,
}: DownloadVisitReportProps) => {
  const reportCode = REPORT_CODE.WCP_UIL_DISCHARGE_NOTE
  generateVisitReport({
    reportCode,
    jwtToken,
    visitId,
    patientId,
    fileName,
    setIsDownloading,
  })
}

export const downloadWcpProviderDocumentation = ({
  patientId,
  visitId,
  jwtToken,
  fileName,
  setIsDownloading,
}: DownloadVisitReportProps) => {
  const reportCode = REPORT_CODE.WCP_PROVIDER_DOCUMENTATION
  generateVisitReport({
    reportCode,
    jwtToken,
    visitId,
    patientId,
    fileName,
    setIsDownloading,
  })
}

export const downloadBulkWcpUilDischargeNotes = ({
  jwtToken,
  stationId,
  setIsDownloading,
}: DownloadBulkVisitReportsProps) => {
  const reportCode = REPORT_CODE.WCP_UIL_DISCHARGE_NOTE
  generateBulkVisitReports({
    reportCode,
    jwtToken,
    stationId,
    setIsDownloading,
  })
}

export const downloadBulkWcpProviderDocumentation = ({
  jwtToken,
  stationId,
  setIsDownloading,
}: DownloadBulkVisitReportsProps) => {
  const reportCode = REPORT_CODE.WCP_PROVIDER_DOCUMENTATION
  generateBulkVisitReports({
    reportCode,
    jwtToken,
    stationId,
    setIsDownloading,
  })
}
