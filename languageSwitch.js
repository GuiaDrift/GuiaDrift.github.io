console.log('Language switch script loaded');

// 添加测试函数
function testLanguageElements() {
    console.log('测试语言元素...');
    const elementsWithI18n = document.querySelectorAll('[data-i18n]');
    console.log(`找到 ${elementsWithI18n.length} 个具有data-i18n属性的元素`);
    
    elementsWithI18n.forEach(el => {
        const key = el.getAttribute('data-i18n');
        console.log(`元素: ${el.tagName}, 键: ${key}, 当前文本: ${el.textContent}`);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // 获取保存的语言偏好，如果没有则默认为英文
    let currentLang = localStorage.getItem('preferredLanguage') || 'en';
    
    // 设置初始语言
    switchLanguage(currentLang);
    
    // 为语言按钮添加点击事件
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            switchLanguage(lang);
            localStorage.setItem('preferredLanguage', lang);
        });
    });
    
    // 更新当前活动语言按钮
    updateActiveLanguageButton(currentLang);

    console.log('Current language:', currentLang);

    // 调用测试函数
    testLanguageElements();
});

// 切换语言函数
function switchLanguage(lang) {
    if (!translations[lang]) return;
    
    // 更新所有具有data-i18n属性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            // 对于HTML内容的元素
            if (element.tagName !== 'INPUT' && element.tagName !== 'TEXTAREA') {
                element.innerHTML = translations[lang][key];
            } 
            // 对于表单元素
            else {
                element.placeholder = translations[lang][key];
            }
        }
    });
    
    // 更新页面标题
    document.title = lang === 'en' ? 'GuiaDrift' : 'GuiaDrift';
    
    // 更新活动语言按钮
    updateActiveLanguageButton(lang);
}

// 更新当前活动语言按钮
function updateActiveLanguageButton(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
} 