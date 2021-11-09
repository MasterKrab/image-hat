import title from '../../components/title'
import inputFile from '../../components/input-file'
import dropZone from '../../components/drop-zone'
import spinner from '../../components/spinner'
import cancelButton from '../../components/cancel-button'
import backLink from '../../components/back-link'

export default () => `
  ${title('read-metadata')}
  ${inputFile()}
  ${dropZone()}
  ${spinner('read-metadata')}
  <ul class="metadata hidden" id="result" lang="en"></ul>
  ${cancelButton()}
  ${backLink()}
`
