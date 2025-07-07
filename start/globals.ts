import edge from 'edge.js'
import { edgeIconify, addCollection } from 'edge-iconify'
import { icons as phIcons } from '@iconify-json/ph'

addCollection(phIcons)
edge.use(edgeIconify)
edge.global('Movie', 'This is a global example variable')
