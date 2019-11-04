class panoramicImage{
    constructor(imageSource) {
        this.imageSource = imageSource
        sceneImage = this.panoramicImage
    }

    createImage() {
        sceneImage = new Image()

        sceneImage.onload = function() {
            ctx.drawImage(sceneImage, 0, 0, this.width, this.height)
        }

        sceneImage.src = this.imageSource
    }

    init() {
        this.createImage()
    }
}

export default panoramicImage