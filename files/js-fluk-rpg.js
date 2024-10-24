const data = {
    en: {
        btnText: "TH",
        text_all: "𝙃𝘼𝙇𝙇𝙊 𝙂𝙐𝙔𝙎 💥",
        text_1: "Subscribe Youtube",
        text_2: "Follow Facebook",
        text_3: "Follow Tiktok",
        text_4: "Copy TrueMoney number",
        text_5: "Join Discord",
        text_6: "Contact channels",
        text_7: "Follow Instagram",
        success: "Succeed",
        error: "Copying is not supported"
    },
    th: {
        btnText: "EN",
        text_all: "สวัสดีทุกคน💥",
        text_1: "ติดตามในยูทูป",
        text_2: "ติดตามในเฟสบุค",
        text_3: "ติดตามในติ๊กต๊อก",
        text_4: "คัดลอกเบอร์ทรูมันนี่",
        text_5: "เข้าร่วมห้องในดิสคอส",
        text_6: "ช่องทางติดต่อ",
        text_7: "ติดตามในไอจี",
        success: "สำเร็จ",
        error: "ไม่รองรับการคัดลอก"
    },
    links: [{
        href: "https://youtube.com/@fluk_tanyatorn?sub_confirmation=1",
        icon: "Youtube",
        textKey: "text_1"
    }, {
        href: "https://www.facebook.com/FlukTanyatorn",
        icon: "Facebook",
        textKey: "text_2"
    }, {
        href: "https://www.tiktok.com/@fluk_mci4",
        icon: "Tiktok",
        textKey: "text_3"
    }, {
        href: "https://www.instagram.com/fluktanyatorn",
        icon: "Instagram",
        textKey: "text_7"
    }, {
        copy: "0610605912",
        icon: "TrueMoney",
        textKey: "text_4"
    }, {
        href: "https://discord.gg/2j2gB8gU2N",
        icon: "Discord",
        textKey: "text_5"
    }, {
        href: "mailto:thanyathon0202@gmail.com",
        icon: "Gmail",
        textKey: "text_6"
    }, ]
};
document.head.appendChild(Object.assign(document.createElement("style"), {
    type: "text/css",
    innerText: `.cta{position:fixed;width:100%;height:100%;top:0;display:flex;justify-content:center;padding-top:40px;overflow:auto}a,a:hover{text-decoration:none;color:#000}.back{min-width:calc(100vw - 20px);min-height:100vh;background:url(https://yuroweb55.github.io/files/icon-fluk-rpg5.webp) no-repeat;background-position:center;background-size:cover;opacity:.125}main{text-align:center}.icon{width:150px;height:150px;border-radius:50%;margin-bottom:20px}.hhgs{max-width:500px;height:75px;background-color:#fff;box-shadow:10px 12px 20px rgba(0,0,0,.7);transition:all .1s ease 0s;border-radius:20px;display:flex;justify-content:space-between;align-items:center;padding:2.5px 20px;margin-bottom:25px}.hhgs:hover,#corner-button:hover{transform:scale(1.1)}.iconvb{background-size:cover;background-position:center;width:70px;height:70px}#corner-button{position:fixed;top:10px;right:10px;background-color:#007bff;color:#fff;padding:10px 10px;border-radius:50px;text-align:center;text-decoration:none;font-weight:700;font-size:14px;box-shadow:5px 6px 8px rgba(0,0,0,.7);transition:all .1s ease 0s}.pd0_5{padding:0 15px}`
}));
let lg = 'en';
const content = document.getElementById('content')
  , cornerButton = document.getElementById('corner-button');
function renderContent() {
    content.innerHTML = `<div><img loading="lazy" class="icon" src="https://yuroweb55.github.io/files/icon-fluk-rpg5.webp" alt></div><div><h3>fluk_rpg5</h3></div><div style="padding-top:50px"></div><div><h5 id="text-all">${data[lg].text_all}</h5></div>${data.links.map(l => `<div><a class="hhgs" ${l.href ? 'href="' + l.href + '"' : "onclick=\"copy('" + l.copy + "')\""}target="_blank"><div class="pd0_5"><div class="iconvb" style="background-image: url('https://fkwapp.com/09472/icon/${l.icon}.webp')"></div></div><div class="pd0_5"><b id="${l.textKey}">${data[lg][l.textKey]}</b></div><div class="pd0_5"></div></a></div>`).join('')}<div style="padding-top:60px"></div>`
}
;cornerButton.addEventListener('click', () => {
    lg = lg === 'en' ? 'th' : 'en';
    renderContent();
    cornerButton.innerHTML = data[lg].btnText
}
);
function copy(t) {
    const textarea = document.createElement('textarea');
    textarea.value = t;
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        swal(data[lg].success, "", "success")
    } catch (err) {
        swal(data[lg].error, "", "error")
    }
    document.body.removeChild(textarea)
}
renderContent();
cornerButton.innerHTML = data[lg].btnText
