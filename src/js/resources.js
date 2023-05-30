import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import fishImage from '../images/fish.png'
import spriteSheet from '../images/Mike-sheet.png'
import reticle from '../images/Reticle.png'

const Resources = {
    Fish: new ImageSource(fishImage),
    Npc: new ImageSource(spriteSheet),
    Reticle: new ImageSource(reticle),
}
const ResourceLoader = new Loader([Resources.Fish, Resources.Npc, Resources.Reticle])

export { Resources, ResourceLoader }