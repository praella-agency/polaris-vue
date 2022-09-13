import PVuePlyr from './PVuePlyr'

PVuePlyr.install = (app, options = {}) => {
    if (options.plyr) {
        PVuePlyr.props.options.default = () => {
            return { ...options.plyr }
        }
    }

    app.component(PVuePlyr.name, PVuePlyr)
}

export default PVuePlyr
