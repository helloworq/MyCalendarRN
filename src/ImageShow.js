import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

//弹出图片demo
const images = [{
    // Simplest usage.
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',

    props: {
        // headers: ...
    }
}, {
    url: '',
    props: {
        source: require('../img/1.png')
    }
}]

const ImageShow = () => {
    return (
        <Modal visible={true} transparent={true}>
            <ImageViewer imageUrls={images} />
        </Modal>
    )
}

export default ImageShow