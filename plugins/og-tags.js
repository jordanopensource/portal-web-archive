import Vue from 'vue'

function ogData(type, content, path, lang) {
  let title = ''
  let category = ''
  let imageUrl = ''
  let description = ''
  // Set image url
  if (content.ogData && content.ogData['image_' + lang]) {
    imageUrl = content.ogData['image_' + lang].url
  } else if (content.thumbnail) {
    imageUrl = content.thumbnail.url
  } else if (content.image) {
    imageUrl = content.image.url
  } else if (content.picture) {
    imageUrl = content.picture.url
  } else {
    imageUrl = ''
  }
  // Set title
  if (type === 'article') {
    title = content.title
  } else {
    title = content['title_' + lang]
  }
  // Set category
  if (type === 'career') {
    category = content.careerType['title_' + lang]
  } else if (content.category) {
    category = content.category['title_' + lang]
  } else {
    category = ''
  }
  // Set description
  if (content.excerpt) {
    description = content.excerpt
  } else if (content['tagline_' + lang]) {
    description = content['tagline_' + lang]
  } else if (content['metaDescription_' + lang]) {
    description = content['metaDescription_' + lang]
  } else if (content['excerpt_' + lang]) {
    description = content['excerpt_' + lang]
  } else if (content['description_' + lang]) {
    const originalString = content['description_' + lang]
    const strippedString = originalString.replace(/(<([^>]+)>)/gi, '')
    description = strippedString
  } else {
    description = ''
  }
  // Set data
  const data = {
    title,
    url: 'https://josa.ngo' + path,
    type,
    publishedTime: content.publishDate
      ? content.publishDate
      : content.created_at,
    modifiedTime: content.created_at,
    updatedTime: content.updated_at,
    category,
    image: imageUrl,
    description,
  }
  return data
}

const ogTags = (type, content, path, lang) => {
  const data = ogData(type, content, path, lang)
  const tags = [
    // Facebook Open Graph
    {
      property: 'og:site_name',
      content: 'Jordan Open Source Association',
    },
    {
      property: 'og:title',
      content: data.title,
    },
    {
      property: 'og:url',
      content: data.url,
    },
    {
      property: 'og:type',
      content: data.type,
    },
    {
      property: 'og:description',
      content: data.description,
    },
    {
      property: 'og:updated_time',
      content: data.updatedTime,
    },
    {
      property: 'article:published_time',
      content: data.publishedTime,
    },
    {
      property: 'article:modified_time',
      content: data.modifiedTime,
    },
    {
      property: 'article:section',
      content: data.category,
    },
    {
      property: 'article:publisher',
      content: 'https://facebook.com/jordanopensource',
    },
    {
      property: 'og:image',
      content: data.image,
    },
    // Twitter Cards
    {
      name: 'twitter:title',
      content: data.title,
    },
    {
      name: 'twitter:url',
      content: data.url,
    },
    {
      name: 'twitter:description',
      content: data.description,
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:image',
      content: data.image,
    },
  ]
  return tags
}

Vue.filter('ogTags', ogTags)
