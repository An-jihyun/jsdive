// ImageGalleryComponent.js

class ImageGalleryComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.images = [];
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                /* 스타일링을 여기에 추가 */
                .image-gallery {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                    gap: 10px;
                }
                img {
                    width: 100%;
                    height: auto;
                }
                input[type="file"] {
                    margin: 10px 0;
                }
            </style>
            <div>
                <input type="file" accept="image/*" id="image-input">
                <div class="image-gallery" id="gallery"></div>
            </div>
        `;

        // 파일 입력 이벤트 핸들러 등록
        const imageInput = this.shadowRoot.getElementById('image-input');
        imageInput.addEventListener('change', () => this.handleImageUpload());

        this.renderImageGallery();
    }

    renderImageGallery() {
        const galleryContainer = this.shadowRoot.getElementById('gallery');
        galleryContainer.innerHTML = '';

        this.images.forEach((imageUrl, index) => {
            const imageElement = document.createElement('img');
            imageElement.src = imageUrl;
            imageElement.alt = `Image ${index + 1}`;
            galleryContainer.appendChild(imageElement);
        });
    }

    handleImageUpload() {
        const imageInput = this.shadowRoot.getElementById('image-input');
        const files = imageInput.files;

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageUrl = event.target.result;
                this.images.push(imageUrl);
                this.renderImageGallery();
            };
            reader.readAsDataURL(files[i]);
        }

        // 입력 필드 초기화
        imageInput.value = '';
    }
}

customElements.define('image-gallery-component', ImageGalleryComponent);
