import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2023-01-01',
    useCdn: false,
    token:'skAfN76TeP2PmAYqaIzrdaPjzxEeaVDdJ1SzhFqw8CHmXKTuT4ugr2akYHruUslhjyMbWUJWhDNhjliAygov8yCtxyZQcEKS2y98Y0E1brV5KFdx166ns7mx4lESWNSE74amUEhn7aK3S7OJ7jigKDffWAzRgCBtpAXvAfViCQ5mreZolwQ1'
})

const builder = imageUrlBuilder(client)


export const urlFor = (source) => builder.image(source);