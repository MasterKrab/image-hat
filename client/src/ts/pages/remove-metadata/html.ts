import title from '../../components/title'
import inputFile from '../../components/input-file'
import dropZone from '../../components/drop-zone'
import spinner from '../../components/spinner'
import result from '../../components/result'
import cancelButton from '../../components/cancel-button'
import backLink from '../../components/back-link'

export default () => `
  ${title('remove-metadata')}
  ${inputFile()}
  ${dropZone()}
  ${spinner('remove-metadata')}
  ${result()}
  ${cancelButton()}
  ${backLink()}
`
