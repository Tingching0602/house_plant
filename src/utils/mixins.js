import moment from 'moment'

export const fromNowFilter = {
  filters: {
    fromNow (value) {
      if (!value) {
        return '-'
      }

      return moment(value).fromNow()
    }
  }
}

export const emptyImageFilter = {
  filters: {
    emptyImage (src) {
      return src || 'https://via.placeholder.com/350x220/DFDFDF?text=No+Image'
    }
  }
}
