export interface requestData {
  dataRequestorId: string
  sideStreamId: string
  requestAccessMessage: string
}

export interface sentRequest {
  dataRequestorId: string
  requestAccessDatetime: string
  requestAccessStatus: string
  sidestreamId: string
  sidestreamName: string
  sidestreamDescription: string
}
