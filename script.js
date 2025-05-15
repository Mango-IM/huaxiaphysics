// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const header = document.querySelector('.header');
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 滚动动画效果
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-box, .timeline-item, .ar-vr-feature, .gallery-item, .team-member');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // 初始化元素样式
    const initAnimationElements = function() {
        const elements = document.querySelectorAll('.feature-box, .timeline-item, .ar-vr-feature, .gallery-item, .team-member');
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
    };
    
    initAnimationElements();
    animateOnScroll(); // 初始检查
    
    window.addEventListener('scroll', animateOnScroll);
    
    // 创建占位图片
    const placeholderImages = document.querySelectorAll('.placeholder-image');
    placeholderImages.forEach(img => {
        if (!img.src || img.src.endsWith('.jpg')) {
            // 创建SVG占位图
            const svgContent = `
            <svg xmlns="http://www.w3.org/2000/svg" width="${img.width || 300}" height="${img.height || 200}" viewBox="0 0 300 200">
                <rect width="100%" height="100%" fill="#e0e0e0"/>
                <text x="50%" y="50%" font-family="Arial" font-size="14" fill="#999" text-anchor="middle" dominant-baseline="middle">图片占位符</text>
                <path d="M100,70 L200,70 L150,130 Z" fill="#ccc"/>
                <circle cx="120" cy="50" r="10" fill="#ccc"/>
            </svg>
            `;
            const blob = new Blob([svgContent], {type: 'image/svg+xml'});
            const url = URL.createObjectURL(blob);
            img.src = url;
        }
    });
    
    // 创建二维码占位符
    const qrPlaceholder = document.querySelector('.qr-placeholder');
    if (qrPlaceholder) {
        const svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150">
            <rect width="100%" height="100%" fill="#e0e0e0"/>
            <text x="50%" y="50%" font-family="Arial" font-size="12" fill="#999" text-anchor="middle" dominant-baseline="middle">AR应用二维码</text>
            <rect x="30" y="30" width="90" height="90" fill="#ccc"/>
            <rect x="40" y="40" width="70" height="70" fill="#e0e0e0"/>
            <rect x="50" y="50" width="50" height="50" fill="#ccc"/>
            <rect x="60" y="60" width="30" height="30" fill="#e0e0e0"/>
        </svg>
        `;
        const blob = new Blob([svgContent], {type: 'image/svg+xml'});
        const url = URL.createObjectURL(blob);
        const img = document.createElement('img');
        img.src = url;
        img.alt = "AR应用二维码";
        qrPlaceholder.appendChild(img);
    }
});