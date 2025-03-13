document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    // 汉堡菜单点击事件
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            console.log('汉堡菜单点击'); // 添加调试信息
        });
    }

    // 导航链接点击后关闭菜单
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // 点击页面其他区域关闭菜单
    document.addEventListener('click', function(event) {
        const isClickInsideNavbar = navbar.contains(event.target);
        
        if (!isClickInsideNavbar && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // 滾動事件處理
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 添加視頻延遲加載
    const video = document.querySelector('video');
    if (video) {
        video.setAttribute('loading', 'lazy');
    }

    // 添加圖片延遲加載
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });

    // 查找并删除任何类似这样的打字机效果代码
    const aboutText = document.querySelector('.team-info p');
    if (aboutText) {
        // 移除可能被添加的任何打字机相关的类
        aboutText.classList.remove('typing', 'typing-animation', 'typewriter');
        
        // 确保文本直接显示而不是逐字出现
        aboutText.style.opacity = '1';
        aboutText.style.visibility = 'visible';
        
        // 阻止任何可能正在运行的打字机动画
        if (window.typewriter) {
            window.typewriter.stop();
            delete window.typewriter;
        }
    }

    // 如果使用了任何打字机库（如Typed.js或TypewriterJS），
    // 请移除或禁用这些相关的初始化代码
});

// 添加滚动动画
function handleScroll() {
    const elements = document.querySelectorAll('.fade-in, .parallax');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.8) {
            element.classList.add('visible');
        }
    });
}

// 数字计数动画
function animateCounter(element, target) {
    let current = 0;
    const duration = 2000; // 2秒
    const step = target / (duration / 16);
    
    function update() {
        current += step;
        if (current < target) {
            element.textContent = current.toFixed(1);
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }
    
    update();
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    // 当规格部分可见时启动计数器
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.counter').forEach(counter => {
                    animateCounter(counter, parseFloat(counter.textContent));
                });
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(document.querySelector('.specifications'));
});

// 添加团队成员弹窗功能
document.addEventListener('DOMContentLoaded', function() {
    // 团队成员数据
    const teamMembers = {
        jack: {
            name: "Jack Liu",
            role: "role_manager",
            photo: "IMG_0511.jpg",
            bio: "member_bio_jack",
            interests: ["member_interest_jack_1", "member_interest_jack_2", "member_interest_jack_3"],
            social: [
                {platform: "instagram", url: "https://instagram.com/username1", icon: "fab fa-instagram"},
                {platform: "linkedin", url: "https://linkedin.com/in/username1", icon: "fab fa-linkedin-in"},
                {platform: "email", url: "mailto:jack@example.com", icon: "far fa-envelope"}
            ]
        },
        roy: {
            name: "Roy Fong",
            role: "role_design",
            photo: "0AF50169-D808-4992-B3E8-B109DB97DFAA_1_102_o.jpg",
            bio: "member_bio_roy",
            interests: ["member_interest_roy_1", "member_interest_roy_2", "member_interest_roy_3"],
            social: [
                {platform: "instagram", url: "https://instagram.com/username2", icon: "fab fa-instagram"},
                {platform: "github", url: "https://github.com/username2", icon: "fab fa-github"},
                {platform: "email", url: "mailto:roy@example.com", icon: "far fa-envelope"}
            ]
        },
        mark: {
            name: "Mark Kuok",
            role: "role_manufacturing",
            photo: "IMG_0514.jpg",
            bio: "member_bio_mark",
            interests: ["member_interest_mark_1", "member_interest_mark_2", "member_interest_mark_3"],
            social: [
                {platform: "instagram", url: "https://instagram.com/username3", icon: "fab fa-instagram"},
                {platform: "twitter", url: "https://twitter.com/username3", icon: "fab fa-twitter"},
                {platform: "email", url: "mailto:mark@example.com", icon: "far fa-envelope"}
            ]
        }
    };
    
    // 获取弹窗和关闭按钮
    const modal = document.getElementById('memberModal');
    const closeBtn = document.getElementsByClassName('close-modal')[0];
    
    // 为所有成员添加点击事件
    document.querySelectorAll('.team-member, .view-profile-btn').forEach(item => {
        item.addEventListener('click', function() {
            const memberId = this.closest('.team-member').getAttribute('data-member');
            openMemberModal(memberId);
        });
    });
    
    // 关闭弹窗
    closeBtn.addEventListener('click', function() {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    });
    
    // 点击弹窗外部关闭
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });
    
    // 打开成员弹窗
    function openMemberModal(memberId) {
        const member = teamMembers[memberId];
        if (!member) return;
        
        // 获取当前语言
        const currentLang = localStorage.getItem('preferredLanguage') || 'en';
        
        // 设置弹窗内容
        document.getElementById('modalPhoto').src = member.photo;
        document.getElementById('modalName').textContent = member.name;
        
        // 设置角色
        const roleText = translations[currentLang][member.role] || translations['en'][member.role];
        document.getElementById('modalRole').textContent = roleText;
        
        // 设置简介
        const bioText = translations[currentLang][member.bio] || translations['en'][member.bio];
        document.getElementById('modalBio').innerHTML = bioText;
        
        // 设置兴趣爱好
        const interestsList = document.getElementById('modalInterests');
        interestsList.innerHTML = '';
        member.interests.forEach(interest => {
            const interestText = translations[currentLang][interest] || translations['en'][interest];
            const li = document.createElement('li');
            li.textContent = interestText;
            interestsList.appendChild(li);
        });
        
        // 设置社交媒体链接，替换原来的技能部分
        const socialContainer = document.getElementById('modalSocial');
        socialContainer.innerHTML = '';
        member.social.forEach(social => {
            const socialLink = document.createElement('a');
            socialLink.className = 'social-link-member';
            socialLink.href = social.url;
            socialLink.target = '_blank';
            socialLink.rel = 'noopener noreferrer';
            socialLink.innerHTML = `<i class="${social.icon}"></i>`;
            socialLink.setAttribute('title', social.platform);
            socialContainer.appendChild(socialLink);
        });
        
        // 显示弹窗
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // 防止背景滚动
    }
});