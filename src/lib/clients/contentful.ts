import contentful from 'contentful'

const preview = true
export const content = contentful.createClient({
  space: '9go3hfinbv0n',
  host: preview ? 'preview.contentful.com' : 'cdn.contentful.com',
  accessToken: preview ? 'G5T2ShBFZ-yiP9a5Twwdh1ngDBUs5J_VDkyPuYtoxNo' : 'TBiHUDIE_yT5d-we_F0LdbqhbYaQP216caKTnV9GaQE',
}).withoutUnresolvableLinks