export enum REPORT_CODE {
  WCP_UIL_DISCHARGE_NOTE = 'uil',
  WCP_PROVIDER_DOCUMENTATION = 'providerdoc',
}

type GenerateVisitReportProps = {
  reportCode: REPORT_CODE
  jwtToken: string
  visitId: string | number
  patientId: string | number
  fileName?: string
  setIsDownloading?: (value: boolean) => void
}

export const generateVisitReport = ({
  reportCode,
  jwtToken,
  visitId,
  patientId,
  fileName = 'report',
  setIsDownloading,
}: GenerateVisitReportProps) => {
  const pdfGenerationURL = `${process.env.NEXT_PUBLIC_PDF_REPORT_GENERATOR_URL}/report/${reportCode}`
  const queryString = `?visitId=${visitId}&patientId=${patientId}`
  const url = `${pdfGenerationURL}${queryString}`
  generateReportByUrl({ url, jwtToken, fileName, setIsDownloading })
}

type GenerateBulkVisitReportsProps = {
  reportCode: REPORT_CODE
  jwtToken: string
  stationId: number
  setIsDownloading: (value: boolean) => void
}

export const generateBulkVisitReports = ({
  reportCode,
  jwtToken,
  stationId,
  setIsDownloading,
}: GenerateBulkVisitReportsProps) => {
  const wcpDischargeNotesDownloadUrl = `${process.env.NEXT_PUBLIC_PDF_REPORT_GENERATOR_URL}/report/${reportCode}/bulk`
  const queryString = `?station_id=${stationId}`
  const url = `${wcpDischargeNotesDownloadUrl}${queryString}`
  downloadByUrl({ url, jwtToken, setIsDownloading })
}

type GenerateReportByUrlProps = {
  url: string
  jwtToken: string
  fileName?: string
  setIsDownloading?: (value: boolean) => void
}

const generateReportByUrl = ({
  url,
  jwtToken,
  fileName = 'report',
  setIsDownloading,
}: GenerateReportByUrlProps) => {
  fetch(`${url}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  })
    .then((response) => {
      return response.blob()
    })
    .then((blob) => {
      const url = window.URL.createObjectURL(blob)
      // window.open(url, '_blank').focus()

      let fileDownloadLink = document.createElement('a')
      fileDownloadLink.href = url
      fileDownloadLink.download = fileName
      fileDownloadLink.click()
      setIsDownloading(false)
    })
    .catch((err) => {
      console.log(err)
      setIsDownloading(false)
    })
}

const pollDownloadUrl = async ({ pollUrl, jwtToken, setIsDownloading }) => {
  await fetch(pollUrl, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  })
    .then(async (response) => {
      if (response.status === 200) {
        setIsDownloading(false)
        const { url } = await response.json()
        window.open(url, '_blank')
      } else {
        setTimeout(
          () => pollDownloadUrl({ pollUrl, jwtToken, setIsDownloading }),
          2000
        )
      }
    })
    .catch(() => setTimeout(() => pollDownloadUrl(pollUrl), 2000))
}

const buildDownloadUrl = (url: string) => {
  const parts = url.split('?')
  return `${parts[0]}/download?${parts[1]}`
}

type DownloadByUrlProps = {
  url: string
  jwtToken: string
  setIsDownloading: (value: boolean) => void
}

const downloadByUrl = ({
  url,
  jwtToken,
  setIsDownloading,
}: DownloadByUrlProps) => {
  fetch(`${url}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  }).then(() => {
    setTimeout(
      () =>
        pollDownloadUrl({
          pollUrl: buildDownloadUrl(url),
          jwtToken,
          setIsDownloading,
        }),
      2000
    )
  })
}
