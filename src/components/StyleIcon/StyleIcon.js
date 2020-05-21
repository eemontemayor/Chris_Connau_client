import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const styleIconMap = {
  'Carousel': <FontAwesomeIcon className='blue' icon='list-ul' />,
  'Architecture': <FontAwesomeIcon className='red' icon='list-ol' />,
  'Nature': <FontAwesomeIcon className='orange' icon='globe-americas' />,
  'Masonry': <FontAwesomeIcon className='yellow' icon='pen-alt' />,
  'Miscellaneous': <FontAwesomeIcon className='green' icon='book-open' />,
  'default': null
}

export default function StyleIcon({ style='default' }) {
  return styleIconMap[style]
}
