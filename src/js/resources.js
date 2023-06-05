import { ImageSource, Sound, Resource, Loader } from 'excalibur';
import fishImage from '../images/fish.png';
import spriteSheet from '../images/Mike-sheet.png';
import reticle from '../images/Reticle.png';
import background from '../images/background.png';
import bird from '../images/Bird-Sheet.png';

const Resources = {
    Fish: new ImageSource(fishImage),
    Npc: new ImageSource(spriteSheet),
    Reticle: new ImageSource(reticle),
    Background: new ImageSource(background),
    Bird: new ImageSource(bird)
};

const ResourceLoader = {
    resources: [Resources.Fish, Resources.Npc, Resources.Reticle, Resources.Background, Resources.Bird],

    load() {
        const promises = this.resources.map(resource => resource.load());
        return Promise.all(promises);
    }
};

export { Resources, ResourceLoader };
