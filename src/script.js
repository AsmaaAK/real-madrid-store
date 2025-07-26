document.addEventListener('DOMContentLoaded', function() {
    // Product data
    const products = [
        {
            id: 1,
            name: "2026/25 Min's Soccer Jersey",
            brand: "Real Madrid Official",
            price: 89.99,
            originalPrice: 109.99,
            rating: 4,
            image: "./images/white_shirt.png",
            description: "The official 2025/26 Min's Soccer jersey of Real Madrid CF. Made with high-quality materials for maximum comfort during play. Features the club crest and sponsor logos."
        },
        {
            id: 2,
            name: "2025/26 Away Jersey",
            brand: "Real Madrid Official",
            price: 89.99,
            originalPrice: 109.99,
            rating: 5,
            image: "./images/white_shirt2.PNG",
            description: "The striking purple away jersey for the 2023/24 season. Designed with performance in mind and featuring the iconic Real Madrid crest."
        },
        {
            id: 3,
            name: "Third Jersey 2025/26",
            brand: "Real Madrid Official",
            price: 84.99,
            originalPrice: 109.99,
            rating: 3,
            image: "./images/black_shirt.png",
            description: "The unique third jersey featuring a bold graphic design inspired by the club's heritage. Limited edition for the 2023/24 season."
        },
        {
            id: 4,
            name: "Training Jacket",
            brand: "Real Madrid Official",
            price: 69.99,
            originalPrice: 89.99,
            rating: 4,
            image: "./images/plover2.PNG",
            description: "Premium training jacket worn by the players during practice sessions. Lightweight and water-resistant for all weather conditions."
        },
        {
            id: 5,
            name: "Youth Sportswear 2025/26",
            brand: "Real Madrid Official",
            price: 49.99,
            originalPrice: 59.99,
            rating: 4,
            image: "./images/boat.png",
            description: "Barreda Decode Real Madrid Shoes Kids, Youth Sportswear, 3 colors. Made with breathable fabric to keep you cool during play."
        },
        {
            id: 6,
            name: "Official Match Ball",
            brand: "Real Madrid Official",
            price: 129.99,
            originalPrice: 149.99,
            rating: 5,
            image: "./images/ball.png",
            description: "The official match ball used in Real Madrid games. FIFA approved for professional play with advanced aerodynamics."
        },
        {
            id: 7,
            name: "Children Soccer",
            brand: "Real Madrid Official",
            price: 79.99,
            originalPrice: 99.99,
            rating: 5,
            image: "./images/kids.png",
            description: "Classic Children Soccerfrom the 2001/02 season when Real Madrid won the Champions League. 100% authentic design."
        },
        {
            id: 8,
            name: "Real Madrid 99/00 Track Pants",
            brand: "Real Madrid Official",
            price: 64.99,
            originalPrice: 79.99,
            rating: 4,
            image: "./images/pants.png",
            description: "Comfortable hoodie perfect for travel or casual wear. Features the club crest and subtle Real Madrid branding."
        }
    ];
    // عناصر DOM
    const elements = {
        slider: document.getElementById('slider'),
        sliderInner: document.getElementById('sliderInner'),
        prevBtn: document.getElementById('prevBtn'),
        nextBtn: document.getElementById('nextBtn'),
        productModal: document.getElementById('productModal'),
        closeModal: document.getElementById('closeModal'),
        modalTitle: document.getElementById('modalTitle'),
        modalImage: document.getElementById('modalImage'),
        modalBrand: document.getElementById('modalBrand'),
        modalRating: document.getElementById('modalRating'),
        modalDescription: document.getElementById('modalDescription'),
        modalPrice: document.getElementById('modalPrice'),
        modalOriginalPrice: document.createElement('span'), // سيتم إضافتها ديناميكياً
        modalDiscount: document.createElement('span'), // سيتم إضافتها ديناميكياً
        mobileMenuButton: document.getElementById('mobile-menu-button'),
        mobileMenu: document.getElementById('mobile-menu')
    };

    // حالة السلايدر
    let currentSlide = 0;
    const slidesToShow = 4;
    let slideWidth = 0;
    let autoSlideInterval;

    function renderStars(rating, interactive = false, productId = null) {
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
            const starClass = i <= rating ? 'text-yellow-400' : 'text-gray-300';
            starsHTML += `
                <span class="star ${starClass} ${interactive ? 'cursor-pointer hover:scale-110' : ''}"
                      data-rating="${i}"
                      ${interactive ? `onclick="updateRating(${i}, ${productId})"` : ''}>
                    ★
                </span>
            `;
        }
        return starsHTML;
    }

    window.updateRating = function(newRating, productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        product.rating = newRating;

        const stars = elements.modalRating.querySelectorAll('.star');
        stars.forEach((star, index) => {
            star.classList.toggle('text-yellow-400', index < newRating);
            star.classList.toggle('text-gray-300', index >= newRating);
        });

        const productCard = document.querySelector(`[data-id="${productId}"]`);
        if (productCard) {
            const stars = productCard.querySelectorAll('.star');
            stars.forEach((star, index) => {
                star.classList.toggle('text-yellow-400', index < newRating);
                star.classList.toggle('text-gray-300', index >= newRating);
            });
        }
    };


    function updateSliderPosition() {
        elements.sliderInner.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }

    function nextSlide() {
        if (currentSlide < products.length - slidesToShow) {
            currentSlide++;
        } else {
            currentSlide = 0;
        }
        updateSliderPosition();
    }

    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
        } else {
            currentSlide = products.length - slidesToShow;
        }
        updateSliderPosition();
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    function openProductModal(product) {
        elements.modalTitle.textContent = product.name;
        elements.modalImage.src = product.image;
        elements.modalBrand.textContent = product.brand;
        elements.modalDescription.textContent = product.description;

        const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
        elements.modalPrice.innerHTML = `
            <span class="text-2xl font-bold">€${product.price.toFixed(2)}</span>
            ${product.price < product.originalPrice ? `
                <span class="ml-2 text-sm text-gray-500 line-through">€${product.originalPrice.toFixed(2)}</span>
                <span class="ml-2 bg-red-100 text-red-800 text-xs font-semibold px-2 py-0.5 rounded">${discount}% OFF</span>
            ` : ''}
        `;

        
        elements.modalRating.innerHTML = renderStars(product.rating, true, product.id);

    
     elements.productModal.classList.remove('hidden');

    const modalContainer = elements.productModal.querySelector('.modal-container');
   
    setTimeout(() => {
        modalContainer.classList.remove('opacity-0', 'scale-95');
        modalContainer.classList.add('opacity-100', 'scale-100');
    }, 10);

    document.body.style.overflow = 'hidden';
}
function closeModalHandler() {
    const modalContainer = elements.productModal.querySelector('.modal-container');
    modalContainer.classList.add('opacity-0', 'scale-95');
    modalContainer.classList.remove('opacity-100', 'scale-100');

    setTimeout(() => {
        elements.productModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 300); 
}


    function toggleMobileMenu() {
        elements.mobileMenu.classList.toggle('hidden');
        const icon = elements.mobileMenuButton.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    }



    function initSlider() {
        
        slideWidth = elements.slider.offsetWidth / slidesToShow;

        // إنشاء كروت المنتجات
        products.forEach(product => {
            const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
            
            const productCard = document.createElement('div');
            productCard.className = 'min-w-[250px] md:min-w-[300px] px-4 py-2 flex-shrink-0';
            productCard.style.width = `${slideWidth}px`;
            productCard.dataset.id = product.id;
            
            productCard.innerHTML = `
                <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                    <div class="relative h-64 overflow-hidden">
                        <img src="${product.image}" alt="${product.name}" 
                             class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                             onerror="this.src='https://via.placeholder.com/300x400?text=Product+Image'">
                        ${discount > 0 ? `
                            <span class="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                ${discount}% OFF
                            </span>` : ''}
                    </div>
                    <div class="p-4 flex-grow flex flex-col">
                        <h3 class="text-lg font-semibold text-gray-800 mb-1">${product.name}</h3>
                        <p class="text-sm text-gray-500 mb-2">${product.brand}</p>
                        <div class="flex items-center mb-3">
                            ${renderStars(product.rating)}
                        </div>
                        <div class="mt-auto">
                            <div class="flex items-center">
                                <span class="text-xl font-bold text-gray-900">€${product.price.toFixed(2)}</span>
                                ${product.price < product.originalPrice ? `
                                    <span class="ml-2 text-sm text-gray-500 line-through">€${product.originalPrice.toFixed(2)}</span>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            `;

            productCard.addEventListener('click', () => openProductModal(product));
            elements.sliderInner.appendChild(productCard);
        });

        startAutoSlide();
    }
    elements.prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });

    elements.nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    
    elements.closeModal.addEventListener('click', closeModalHandler);
    elements.productModal.addEventListener('click', (e) => {
        if (e.target === elements.productModal) {
            closeModalHandler();
        }
    });

    // أحداث القائمة المتنقلة
    elements.mobileMenuButton.addEventListener('click', toggleMobileMenu);
    document.addEventListener('click', (e) => {
        if (!elements.mobileMenu.contains(e.target) && 
            !elements.mobileMenuButton.contains(e.target) &&
            !elements.mobileMenu.classList.contains('hidden')) {
            toggleMobileMenu();
        }
    });

    
    window.addEventListener('resize', () => {
        slideWidth = elements.slider.offsetWidth / slidesToShow;
        document.querySelectorAll('#sliderInner > div').forEach(card => {
            card.style.width = `${slideWidth}px`;
        });
        updateSliderPosition();
    });

    // بدء التشغيل
    initSlider();
});