document.addEventListener('DOMContentLoaded', function() {
    // 模态框控制
    window.openModal = function(modalId) {
        document.getElementById(modalId).classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    window.closeModal = function(modalId) {
        document.getElementById(modalId).classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // 点击模态框外部或关闭按钮关闭
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // 为关闭按钮添加点击事件
        const closeButton = modal.querySelector('.modal-close');
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
    });
    
    // 为模态框中的关闭按钮添加data-modal-id属性
    document.querySelectorAll('.modal-close').forEach(button => {
        if (!button.hasAttribute('data-modal-id')) {
            const modal = button.closest('.modal');
            if (modal && modal.id) {
                button.setAttribute('data-modal-id', modal.id);
            }
        }
    });

    const tabButtons = document.querySelectorAll('.tab-btn');
    const projectGrids = document.querySelectorAll('.project-grid');

    // 初始化：隐藏所有项目网格，只显示精选项目
    projectGrids.forEach(grid => {
        grid.classList.remove('active');
        if (grid.dataset.category === 'featured') {
            grid.classList.add('active');
        }
    });

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有标签的active类
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // 给当前点击的标签添加active类
            button.classList.add('active');

            // 获取当前标签对应的分类
            const category = button.dataset.category;

            // 隐藏所有项目网格，显示当前分类的项目
            projectGrids.forEach(grid => {
                if (grid.dataset.category === category) {
                    grid.classList.add('active');
                } else {
                    grid.classList.remove('active');
                }
            });
        });
    });

    // 为项目卡片添加动画效果和点击事件
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('animate-on-scroll');
        
        // 为整个项目卡片添加点击事件
        if (card.dataset.modalId) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                const modalId = card.dataset.modalId;
                if (modalId === 'research-modal') {
                    window.location.href = 'research.html';
                } else if (modalId === 'advisor-modal') {
                    window.location.href = 'advisor.html';
                }
            });
        }
        
        // 检测卡片是否在视口中
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    card.classList.add('visible');
                    observer.unobserve(card);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(card);
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 滚动时改变导航栏样式
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.boxShadow = 'none';
            header.style.background = '#fff';
        }
    });

    // 表单提交
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const message = this.querySelector('#message').value;
            
            alert(`感谢您的留言！\n姓名: ${name}\n邮箱: ${email}\n留言: ${message}`);
            this.reset();
        });
    }